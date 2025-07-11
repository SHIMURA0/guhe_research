import React, { useState, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  addEdge,
  Panel,
  Handle,
  Position,
  getBezierPath,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react';
import type { Connection, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button, Card, Space, Tooltip, Modal, Input, Select, message, Drawer, List, Tag, Divider } from 'antd';
import {
  PlusOutlined,
  SaveOutlined,
  PlayCircleOutlined,
  SettingOutlined,
  DeleteOutlined,
  DownloadOutlined,
  UploadOutlined,
  DatabaseOutlined,
  BarChartOutlined,
  ExperimentOutlined,
  FilterOutlined,
  FileTextOutlined,
  ScissorOutlined,
  FolderOutlined,
  EyeOutlined,
  EditOutlined,
  CopyOutlined,
  GroupOutlined,
} from '@ant-design/icons';

const { Option } = Select;

// 自定义节点类型
const DataNode = ({ data }: { data: any }) => (
  <div style={{
    padding: '12px',
    borderRadius: '8px',
    border: '2px solid #1890ff',
    background: 'white',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    minWidth: '150px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    position: 'relative'
  }}>
    {/* 顶部连接点 */}
    <Handle
      type="source"
      position={Position.Top}
      id="top"
      style={{ 
        background: '#1890ff', 
        width: '10px', 
        height: '10px',
        border: '2px solid white',
        top: '-5px'
      }}
    />
    {/* 底部连接点 */}
    <Handle
      type="source"
      position={Position.Bottom}
      id="bottom"
      style={{ 
        background: '#1890ff', 
        width: '10px', 
        height: '10px',
        border: '2px solid white',
        top: 'auto',
        bottom: '-5px'
      }}
    />
    {/* 左侧连接点 */}
    <Handle
      type="source"
      position={Position.Left}
      id="left"
      style={{ 
        background: '#1890ff', 
        width: '10px', 
        height: '10px',
        border: '2px solid white',
        left: '-5px',
        top: '50%',
        transform: 'translateY(-50%)'
      }}
    />
    {/* 右侧连接点 */}
    <Handle
      type="source"
      position={Position.Right}
      id="right"
      style={{ 
        background: '#1890ff', 
        width: '10px', 
        height: '10px',
        border: '2px solid white',
        left: 'auto',
        right: '-5px',
        top: '50%',
        transform: 'translateY(-50%)'
      }}
    />
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, marginBottom: '8px', fontSize: '14px' }}>
      <DatabaseOutlined style={{ color: '#1890ff' }} />
      <span>{data.label}</span>
    </div>
    <div style={{ fontSize: '12px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ color: '#666' }}>类型: {data.type}</span>
        <span style={{ color: '#666' }}>大小: {data.size}</span>
      </div>
    </div>
  </div>
);

const AnalysisNode = ({ data }: { data: any }) => (
  <div style={{
    padding: '12px',
    borderRadius: '8px',
    border: '2px solid #52c41a',
    background: 'white',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    minWidth: '150px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    position: 'relative'
  }}>
    {/* 顶部连接点 - 输入 */}
    <Handle
      type="target"
      position={Position.Top}
      id="top"
      style={{ 
        background: '#52c41a', 
        width: '10px', 
        height: '10px',
        border: '2px solid white',
        top: '-5px'
      }}
    />
    {/* 底部连接点 - 输出 */}
    <Handle
      type="source"
      position={Position.Bottom}
      id="bottom"
      style={{ 
        background: '#52c41a', 
        width: '10px', 
        height: '10px',
        border: '2px solid white',
        top: 'auto',
        bottom: '-5px'
      }}
    />
    {/* 左侧连接点 - 输入 */}
    <Handle
      type="target"
      position={Position.Left}
      id="left"
      style={{ 
        background: '#52c41a', 
        width: '10px', 
        height: '10px',
        border: '2px solid white',
        left: '-5px',
        top: '50%',
        transform: 'translateY(-50%)'
      }}
    />
    {/* 右侧连接点 - 输出 */}
    <Handle
      type="source"
      position={Position.Right}
      id="right"
      style={{ 
        background: '#52c41a', 
        width: '10px', 
        height: '10px',
        border: '2px solid white',
        left: 'auto',
        right: '-5px',
        top: '50%',
        transform: 'translateY(-50%)'
      }}
    />
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, marginBottom: '8px', fontSize: '14px' }}>
      <BarChartOutlined style={{ color: '#52c41a' }} />
      <span>{data.label}</span>
    </div>
    <div style={{ fontSize: '12px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ color: '#666' }}>方法: {data.method}</span>
        <span style={{ color: '#666' }}>状态: {data.status}</span>
      </div>
    </div>
  </div>
);

const ProcessNode = ({ data }: { data: any }) => (
  <div style={{
    padding: '12px',
    borderRadius: '8px',
    border: '2px solid #fa8c16',
    background: 'white',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    minWidth: '150px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    position: 'relative'
  }}>
    {/* 顶部连接点 - 输入 */}
    <Handle
      type="target"
      position={Position.Top}
      id="top"
      style={{ 
        background: '#fa8c16', 
        width: '10px', 
        height: '10px',
        border: '2px solid white',
        top: '-5px'
      }}
    />
    {/* 底部连接点 - 输出 */}
    <Handle
      type="source"
      position={Position.Bottom}
      id="bottom"
      style={{ 
        background: '#fa8c16', 
        width: '10px', 
        height: '10px',
        border: '2px solid white',
        top: 'auto',
        bottom: '-5px'
      }}
    />
    {/* 左侧连接点 - 输入 */}
    <Handle
      type="target"
      position={Position.Left}
      id="left"
      style={{ 
        background: '#fa8c16', 
        width: '10px', 
        height: '10px',
        border: '2px solid white',
        left: '-5px',
        top: '50%',
        transform: 'translateY(-50%)'
      }}
    />
    {/* 右侧连接点 - 输出 */}
    <Handle
      type="source"
      position={Position.Right}
      id="right"
      style={{ 
        background: '#fa8c16', 
        width: '10px', 
        height: '10px',
        border: '2px solid white',
        left: 'auto',
        right: '-5px',
        top: '50%',
        transform: 'translateY(-50%)'
      }}
    />
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, marginBottom: '8px', fontSize: '14px' }}>
      <ExperimentOutlined style={{ color: '#fa8c16' }} />
      <span>{data.label}</span>
    </div>
    <div style={{ fontSize: '12px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ color: '#666' }}>步骤: {data.step}</span>
        <span style={{ color: '#666' }}>进度: {data.progress}%</span>
      </div>
    </div>
  </div>
);

const FilterNode = ({ data }: { data: any }) => (
  <div style={{
    padding: '12px',
    borderRadius: '8px',
    border: '2px solid #722ed1',
    background: 'white',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    minWidth: '150px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    position: 'relative'
  }}>
    {/* 顶部连接点 - 输入 */}
    <Handle
      type="target"
      position={Position.Top}
      id="top"
      style={{ 
        background: '#722ed1', 
        width: '10px', 
        height: '10px',
        border: '2px solid white',
        top: '-5px'
      }}
    />
    {/* 底部连接点 - 输出 */}
    <Handle
      type="source"
      position={Position.Bottom}
      id="bottom"
      style={{ 
        background: '#722ed1', 
        width: '10px', 
        height: '10px',
        border: '2px solid white',
        top: 'auto',
        bottom: '-5px'
      }}
    />
    {/* 左侧连接点 - 输入 */}
    <Handle
      type="target"
      position={Position.Left}
      id="left"
      style={{ 
        background: '#722ed1', 
        width: '10px', 
        height: '10px',
        border: '2px solid white',
        left: '-5px',
        top: '50%',
        transform: 'translateY(-50%)'
      }}
    />
    {/* 右侧连接点 - 输出 */}
    <Handle
      type="source"
      position={Position.Right}
      id="right"
      style={{ 
        background: '#722ed1', 
        width: '10px', 
        height: '10px',
        border: '2px solid white',
        left: 'auto',
        right: '-5px',
        top: '50%',
        transform: 'translateY(-50%)'
      }}
    />
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, marginBottom: '8px', fontSize: '14px' }}>
      <FilterOutlined style={{ color: '#722ed1' }} />
      <span>{data.label}</span>
    </div>
    <div style={{ fontSize: '12px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ color: '#666' }}>条件: {data.condition}</span>
        <span style={{ color: '#666' }}>过滤: {data.filterType}</span>
      </div>
    </div>
  </div>
);

const OutputNode = ({ data }: { data: any }) => (
  <div style={{
    padding: '12px',
    borderRadius: '8px',
    border: '2px solid #eb2f96',
    background: 'white',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    minWidth: '150px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    position: 'relative'
  }}>
    {/* 顶部连接点 - 输入 */}
    <Handle
      type="target"
      position={Position.Top}
      id="top"
      style={{ 
        background: '#eb2f96', 
        width: '10px', 
        height: '10px',
        border: '2px solid white',
        top: '-5px'
      }}
    />
    {/* 左侧连接点 - 输入 */}
    <Handle
      type="target"
      position={Position.Left}
      id="left"
      style={{ 
        background: '#eb2f96', 
        width: '10px', 
        height: '10px',
        border: '2px solid white',
        left: '-5px',
        top: '50%',
        transform: 'translateY(-50%)'
      }}
    />
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, marginBottom: '8px', fontSize: '14px' }}>
      <FileTextOutlined style={{ color: '#eb2f96' }} />
      <span>{data.label}</span>
    </div>
    <div style={{ fontSize: '12px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ color: '#666' }}>格式: {data.format}</span>
        <span style={{ color: '#666' }}>路径: {data.path}</span>
      </div>
    </div>
  </div>
);

// 新增：Group节点组件（父节点）
const GroupNode = ({ data }: { data: any }) => (
  <div style={{
    padding: '12px',
    borderRadius: '8px',
    border: '2px solid #722ed1',
    background: 'linear-gradient(135deg, #f9f0ff 0%, #e6d7ff 100%)',
    boxShadow: '0 4px 12px rgba(114, 46, 209, 0.2)',
    minWidth: '200px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    position: 'relative'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, marginBottom: '8px', fontSize: '14px' }}>
      <GroupOutlined style={{ color: '#722ed1' }} />
      <span>{data.label}</span>
    </div>
    <div style={{ fontSize: '12px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ color: '#666' }}>子流程组</span>
        <span style={{ color: '#666' }}>包含节点: {data.nodeCount || 0}</span>
        <span style={{ color: '#666' }}>状态: {data.status || '活跃'}</span>
      </div>
    </div>
  </div>
);

const nodeTypes: any = {
  dataNode: DataNode,
  analysisNode: AnalysisNode,
  processNode: ProcessNode,
  filterNode: FilterNode,
  outputNode: OutputNode,
  group: GroupNode,
};

// 新增：Subflow类型定义
interface Subflow {
  id: string;
  name: string;
  description: string;
  parentNodeId: string;
  childNodeIds: string[];
  createdAt: string;
  updatedAt: string;
}

const Workflow: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  
  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );
  const [isAddNodeModalVisible, setIsAddNodeModalVisible] = useState(false);
  const [isSubflowDrawerVisible, setIsSubflowDrawerVisible] = useState(false);
  const [isCreateSubflowModalVisible, setIsCreateSubflowModalVisible] = useState(false);
  const [selectedNodes, setSelectedNodes] = useState<Node[]>([]);
  const [subflows, setSubflows] = useState<Subflow[]>([]);
  const [newSubflowData, setNewSubflowData] = useState({
    name: '',
    description: '',
  });
  const [newNodeData, setNewNodeData] = useState({
    type: 'dataNode',
    label: '',
    method: '',
    condition: '',
    format: '',
    path: '',
  });

  // 新增：创建子流程（使用parentId方式）
  const createSubflow = () => {
    console.log('创建子流程，选中的节点:', selectedNodes);
    console.log('当前节点:', nodes);
    
    if (!newSubflowData.name) {
      message.error('请输入子流程名称');
      return;
    }

    if (selectedNodes.length === 0) {
      message.error('请先选择要组合的节点');
      return;
    }

    const parentNodeId = `group-${Date.now()}`;
    const childNodeIds = selectedNodes.map(node => node.id);

    // 创建父节点（group类型）
    const parentNode = {
      id: parentNodeId,
      type: 'group',
      position: { x: 250, y: 250 },
      style: {
        width: 300,
        height: 200,
      },
      data: {
        label: newSubflowData.name,
        nodeCount: selectedNodes.length,
        status: '活跃',
      },
    };

    // 更新子节点，添加parentId
    const updatedNodes = nodes.map((node: any) => {
      if (childNodeIds.includes(node.id)) {
        return {
          ...node,
          parentId: parentNodeId,
          extent: 'parent',
        };
      }
      return node;
    });

    // 添加父节点
    setNodes([...updatedNodes, parentNode]);

    // 保存子流程信息
    const newSubflow: Subflow = {
      id: parentNodeId,
      name: newSubflowData.name,
      description: newSubflowData.description,
      parentNodeId: parentNodeId,
      childNodeIds: childNodeIds,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setSubflows(prev => [...prev, newSubflow]);
    setNewSubflowData({ name: '', description: '' });
    setSelectedNodes([]);
    setIsCreateSubflowModalVisible(false);
    message.success('子流程创建成功');
  };

  // 新增：展开子流程
  const expandSubflow = (subflowId: string) => {
    const subflow = subflows.find(sf => sf.id === subflowId);
    if (!subflow) return;

    // 移除子节点的parentId
    const updatedNodes = nodes.map((node: any) => {
      if (subflow.childNodeIds.includes(node.id)) {
        const { parentId, extent, ...rest } = node;
        return rest;
      }
      return node;
    });

    // 删除父节点
    const filteredNodes = updatedNodes.filter((node: any) => node.id !== subflow.parentNodeId);

    setNodes(filteredNodes);
    message.success('子流程已展开');
  };

  // 新增：复制子流程
  const copySubflow = (subflow: Subflow) => {
    const newParentNodeId = `group-${Date.now()}`;
    const newChildNodeIds = subflow.childNodeIds.map(id => `${id}-copy-${Date.now()}`);

    // 复制子节点
    const childNodesToCopy = nodes.filter((node: any) => 
      subflow.childNodeIds.includes(node.id)
    );

    const copiedChildNodes = childNodesToCopy.map((node: any) => ({
      ...node,
      id: `${node.id}-copy-${Date.now()}`,
      parentId: newParentNodeId,
      extent: 'parent',
    }));

    // 创建新的父节点
    const newParentNode = {
      id: newParentNodeId,
      type: 'group',
      position: { x: 350, y: 350 },
      style: {
        width: 300,
        height: 200,
      },
      data: {
        label: `${subflow.name} (副本)`,
        nodeCount: subflow.childNodeIds.length,
        status: '活跃',
      },
    };

    // 添加复制的节点
    setNodes((nds: any) => [...nds, ...copiedChildNodes, newParentNode]);

    // 保存新的子流程信息
    const newSubflow: Subflow = {
      ...subflow,
      id: newParentNodeId,
      name: `${subflow.name} (副本)`,
      parentNodeId: newParentNodeId,
      childNodeIds: newChildNodeIds,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setSubflows(prev => [...prev, newSubflow]);
    message.success('子流程已复制');
  };

  // 新增：删除子流程
  const deleteSubflow = (subflowId: string) => {
    const subflow = subflows.find(sf => sf.id === subflowId);
    if (!subflow) return;

    // 删除父节点和所有子节点
    const nodesToKeep = nodes.filter((node: any) => 
      node.id !== subflow.parentNodeId && 
      !subflow.childNodeIds.includes(node.id)
    );

    setNodes(nodesToKeep);
    setSubflows(prev => prev.filter(sf => sf.id !== subflowId));
    message.success('子流程已删除');
  };

  // 新增：选择节点
  const onNodeClick = useCallback((event: any, node: Node) => {
    console.log('点击节点:', node);
    // 只允许选择非group节点
    if (node.type === 'group') return;
    
    setSelectedNodes(prev => {
      const isSelected = prev.some(n => n.id === node.id);
      if (isSelected) {
        console.log('取消选择节点:', node.id);
        return prev.filter(n => n.id !== node.id);
      } else {
        console.log('选择节点:', node.id);
        return [...prev, node];
      }
    });
  }, []);

  const onConnect = useCallback(
    (params: Connection) => {
      console.log('连接节点:', params);
      setEdges((eds) => addEdge(params, eds));
      message.success('节点连接成功');
    },
    [setEdges]
  );

  // 删除选中的连线
  const deleteSelectedEdges = () => {
    const selectedEdges = edges.filter((edge: any) => edge.selected);
    if (selectedEdges.length === 0) {
      message.warning('请先选择要删除的连线');
      return;
    }

    const selectedEdgeIds = selectedEdges.map((edge: any) => edge.id);
    setEdges((eds: any) => eds.filter((edge: any) => !selectedEdgeIds.includes(edge.id)));
    message.success('连线删除成功');
  };

  // 删除所有连线
  const deleteAllEdges = () => {
    if (edges.length === 0) {
      message.warning('没有可删除的连线');
      return;
    }
    setEdges([]);
    message.success('所有连线已删除');
  };

  const addNewNode = () => {
    if (!newNodeData.label) {
      message.error('请输入节点名称');
      return;
    }

    const newNode = {
      id: `node-${Date.now()}`,
      type: newNodeData.type,
      position: { x: 250, y: 250 },
      data: {
        label: newNodeData.label,
        type: newNodeData.type === 'dataNode' ? '原始数据' : '',
        size: newNodeData.type === 'dataNode' ? '1.2GB' : '',
        method: newNodeData.method || '统计分析',
        status: '待执行',
        step: '步骤1',
        progress: 0,
        condition: newNodeData.condition || '条件筛选',
        filterType: '数值过滤',
        format: newNodeData.format || 'CSV',
        path: newNodeData.path || '/output/',
      },
    };

    setNodes((nds: any) => [...nds, newNode]);
    setIsAddNodeModalVisible(false);
    setNewNodeData({
      type: 'dataNode',
      label: '',
      method: '',
      condition: '',
      format: '',
      path: '',
    });
    message.success('节点添加成功');
  };

  const deleteSelectedNodes = () => {
    const selectedNodes = nodes.filter((node: any) => node.selected);
    if (selectedNodes.length === 0) {
      message.warning('请先选择要删除的节点');
      return;
    }

    const selectedNodeIds = selectedNodes.map((node: any) => node.id);
    setNodes((nds: any) => nds.filter((node: any) => !selectedNodeIds.includes(node.id)));
    setEdges((eds: any) => eds.filter((edge: any) => !selectedNodeIds.includes(edge.source) && !selectedNodeIds.includes(edge.target)));
    message.success('删除成功');
  };

  const saveWorkflow = () => {
    const workflowData = {
      nodes,
      edges,
      timestamp: new Date().toISOString(),
    };
    
    const dataStr = JSON.stringify(workflowData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `workflow-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    message.success('工作流已保存');
  };

  const loadWorkflow = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const workflowData = JSON.parse(event.target?.result as string);
            setNodes(workflowData.nodes || []);
            setEdges(workflowData.edges || []);
            message.success('工作流加载成功');
          } catch (error) {
            message.error('文件格式错误');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const runWorkflow = () => {
    if (nodes.length === 0) {
      message.warning('请先添加节点');
      return;
    }
    message.info('工作流执行中...');
    // 这里可以添加实际的工作流执行逻辑
  };

  const initialNodes = useMemo(() => [
    {
      id: '1',
      type: 'dataNode',
      position: { x: 100, y: 100 },
      data: {
        label: '下机数据',
        type: '原始数据',
        size: '2.5GB',
      },
    },
    {
      id: '2',
      type: 'filterNode',
      position: { x: 350, y: 100 },
      data: {
        label: '数据清洗',
        condition: '质量过滤',
        filterType: '序列过滤',
      },
    },
    {
      id: '3',
      type: 'analysisNode',
      position: { x: 600, y: 100 },
      data: {
        label: '统计分析',
        method: '多样性分析',
        status: '待执行',
      },
    },
    {
      id: '4',
      type: 'processNode',
      position: { x: 850, y: 100 },
      data: {
        label: '数据预处理',
        step: '标准化',
        progress: 0,
      },
    },
    {
      id: '5',
      type: 'outputNode',
      position: { x: 1100, y: 100 },
      data: {
        label: '结果输出',
        format: 'PDF',
        path: '/results/',
      },
    },
    // 添加更多示例节点
    {
      id: '6',
      type: 'analysisNode',
      position: { x: 600, y: 300 },
      data: {
        label: '聚类分析',
        method: 'K-means聚类',
        status: '待执行',
      },
    },
    {
      id: '7',
      type: 'outputNode',
      position: { x: 1100, y: 300 },
      data: {
        label: '聚类结果',
        format: 'PNG',
        path: '/clustering/',
      },
    },
  ], []);

  const initialEdges = useMemo(() => [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3' },
    { id: 'e3-4', source: '3', target: '4' },
    { id: 'e4-5', source: '4', target: '5' },
    // 添加分支连接示例
    { id: 'e2-6', source: '2', target: '6' },
    { id: 'e6-7', source: '6', target: '7' },
  ], []);

  // 初始化节点和边
  React.useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        snapToGrid={true}
        snapGrid={[15, 15]}
        connectOnClick={true}
        deleteKeyCode="Delete"
        onEdgeClick={(event, edge) => {
          // 点击连线时选中
          console.log('点击连线:', edge);
        }}
      >
        <Controls />
        <MiniMap
          nodeStrokeColor={(n: any) => {
            if (n.type === 'dataNode') return '#1890ff';
            if (n.type === 'analysisNode') return '#52c41a';
            if (n.type === 'processNode') return '#fa8c16';
            if (n.type === 'filterNode') return '#722ed1';
            if (n.type === 'outputNode') return '#eb2f96';
            if (n.type === 'group') return '#722ed1';
            return '#eee';
          }}
          nodeColor={(n: any) => {
            if (n.type === 'dataNode') return '#e6f7ff';
            if (n.type === 'analysisNode') return '#f6ffed';
            if (n.type === 'processNode') return '#fff7e6';
            if (n.type === 'filterNode') return '#f9f0ff';
            if (n.type === 'outputNode') return '#fff0f6';
            if (n.type === 'group') return '#f9f0ff';
            return '#fff';
          }}
          nodeBorderRadius={2}
        />
        <Background gap={12} size={1} color="#aaa" />
        
        <Panel position="top-left">
          <Card size="small" style={{ width: 350 }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                💡 连接提示：拖拽节点边缘的小圆点来连接节点
              </div>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                🗑️ 删除提示：点击连线选中，按Delete键或使用删除按钮删除
              </div>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                📁 子流程提示：选择多个节点后可以创建子流程组
              </div>
              <Space>
                <Tooltip title="添加节点">
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsAddNodeModalVisible(true)}
                  >
                    添加节点
                  </Button>
                </Tooltip>
                <Tooltip title="删除选中节点">
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={deleteSelectedNodes}
                  >
                    删除节点
                  </Button>
                </Tooltip>
              </Space>
              <Space>
                <Tooltip title="创建子流程组">
                  <Button
                    type="primary"
                    icon={<GroupOutlined />}
                    onClick={() => setIsCreateSubflowModalVisible(true)}
                    disabled={selectedNodes.length < 2}
                  >
                    创建子流程组 ({selectedNodes.length})
                  </Button>
                </Tooltip>
                <Tooltip title="管理子流程">
                  <Button
                    icon={<FolderOutlined />}
                    onClick={() => setIsSubflowDrawerVisible(true)}
                  >
                    子流程管理
                  </Button>
                </Tooltip>
              </Space>
              <Space>
                <Tooltip title="删除选中连线">
                  <Button
                    danger
                    icon={<ScissorOutlined />}
                    onClick={deleteSelectedEdges}
                  >
                    删除连线
                  </Button>
                </Tooltip>
                <Tooltip title="删除所有连线">
                  <Button
                    danger
                    icon={<ScissorOutlined />}
                    onClick={deleteAllEdges}
                  >
                    清空连线
                  </Button>
                </Tooltip>
              </Space>
              <Space>
                <Tooltip title="保存工作流">
                  <Button icon={<SaveOutlined />} onClick={saveWorkflow}>
                    保存
                  </Button>
                </Tooltip>
                <Tooltip title="加载工作流">
                  <Button icon={<UploadOutlined />} onClick={loadWorkflow}>
                    加载
                  </Button>
                </Tooltip>
                <Tooltip title="导出工作流">
                  <Button icon={<DownloadOutlined />}>
                    导出
                  </Button>
                </Tooltip>
              </Space>
              <Space>
                <Tooltip title="运行工作流">
                  <Button
                    type="primary"
                    icon={<PlayCircleOutlined />}
                    onClick={runWorkflow}
                  >
                    运行
                  </Button>
                </Tooltip>
                <Tooltip title="工作流设置">
                  <Button icon={<SettingOutlined />}>
                    设置
                  </Button>
                </Tooltip>
              </Space>
            </Space>
          </Card>
        </Panel>
      </ReactFlow>

      {/* 新增：子流程管理抽屉 */}
      <Drawer
        title="子流程管理"
        placement="right"
        width={400}
        open={isSubflowDrawerVisible}
        onClose={() => setIsSubflowDrawerVisible(false)}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setIsSubflowDrawerVisible(false);
              setIsCreateSubflowModalVisible(true);
            }}
            style={{ width: '100%' }}
          >
            创建新子流程组
          </Button>
          <Divider />
          <List
            dataSource={subflows}
            renderItem={(subflow) => (
              <List.Item
                actions={[
                  <Tooltip key="expand" title="展开子流程">
                    <Button
                      type="text"
                      icon={<EyeOutlined />}
                      onClick={() => expandSubflow(subflow.id)}
                    />
                  </Tooltip>,
                  <Tooltip key="copy" title="复制子流程">
                    <Button
                      type="text"
                      icon={<CopyOutlined />}
                      onClick={() => copySubflow(subflow)}
                    />
                  </Tooltip>,
                  <Tooltip key="delete" title="删除子流程">
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => deleteSubflow(subflow.id)}
                    />
                  </Tooltip>,
                ]}
              >
                <List.Item.Meta
                  title={
                    <Space>
                      <span>{subflow.name}</span>
                      <Tag color="purple">{subflow.childNodeIds.length} 节点</Tag>
                    </Space>
                  }
                  description={
                    <div>
                      <div>{subflow.description}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        创建时间: {new Date(subflow.createdAt).toLocaleString()}
                      </div>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </Space>
      </Drawer>

      {/* 新增：创建子流程模态框 */}
      <Modal
        title="创建子流程组"
        open={isCreateSubflowModalVisible}
        onOk={createSubflow}
        onCancel={() => setIsCreateSubflowModalVisible(false)}
        okText="创建"
        cancelText="取消"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <label>子流程组名称:</label>
            <Input
              value={newSubflowData.name}
              onChange={(e) => setNewSubflowData({ ...newSubflowData, name: e.target.value })}
              placeholder="请输入子流程组名称"
            />
          </div>
          <div>
            <label>子流程组描述:</label>
            <Input.TextArea
              value={newSubflowData.description}
              onChange={(e) => setNewSubflowData({ ...newSubflowData, description: e.target.value })}
              placeholder="请输入子流程组描述"
              rows={3}
            />
          </div>
          <div>
            <label>已选择的节点:</label>
            <div style={{ 
              padding: '8px', 
              background: '#f5f5f5', 
              borderRadius: '4px',
              maxHeight: '100px',
              overflow: 'auto'
            }}>
              {selectedNodes.map(node => (
                <Tag key={node.id} style={{ margin: '2px' }}>
                  {(node as any).data.label}
                </Tag>
              ))}
            </div>
          </div>
        </Space>
      </Modal>

      {/* 原有的添加节点模态框 */}
      <Modal
        title="添加新节点"
        open={isAddNodeModalVisible}
        onOk={addNewNode}
        onCancel={() => setIsAddNodeModalVisible(false)}
        okText="添加"
        cancelText="取消"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <label>节点名称:</label>
            <Input
              value={newNodeData.label}
              onChange={(e) => setNewNodeData({ ...newNodeData, label: e.target.value })}
              placeholder="请输入节点名称"
            />
          </div>
          <div>
            <label>节点类型:</label>
            <Select
              value={newNodeData.type}
              onChange={(value) => setNewNodeData({ ...newNodeData, type: value })}
              style={{ width: '100%' }}
            >
              <Option value="dataNode">数据节点</Option>
              <Option value="filterNode">过滤节点</Option>
              <Option value="analysisNode">分析节点</Option>
              <Option value="processNode">处理节点</Option>
              <Option value="outputNode">输出节点</Option>
            </Select>
          </div>
          {newNodeData.type === 'analysisNode' && (
            <div>
              <label>分析方法:</label>
              <Input
                value={newNodeData.method}
                onChange={(e) => setNewNodeData({ ...newNodeData, method: e.target.value })}
                placeholder="请输入分析方法"
              />
            </div>
          )}
          {newNodeData.type === 'filterNode' && (
            <div>
              <label>过滤条件:</label>
              <Input
                value={newNodeData.condition}
                onChange={(e) => setNewNodeData({ ...newNodeData, condition: e.target.value })}
                placeholder="请输入过滤条件"
              />
            </div>
          )}
          {newNodeData.type === 'outputNode' && (
            <>
              <div>
                <label>输出格式:</label>
                <Input
                  value={newNodeData.format}
                  onChange={(e) => setNewNodeData({ ...newNodeData, format: e.target.value })}
                  placeholder="请输入输出格式"
                />
              </div>
              <div>
                <label>输出路径:</label>
                <Input
                  value={newNodeData.path}
                  onChange={(e) => setNewNodeData({ ...newNodeData, path: e.target.value })}
                  placeholder="请输入输出路径"
                />
              </div>
            </>
          )}
        </Space>
      </Modal>
    </div>
  );
};

export default Workflow; 