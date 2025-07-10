import React, { useState, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
  Handle,
  Position,
  getBezierPath,
} from '@xyflow/react';
import type { Connection } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button, Card, Space, Tooltip, Modal, Input, Select, message } from 'antd';
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

const nodeTypes: any = {
  dataNode: DataNode,
  analysisNode: AnalysisNode,
  processNode: ProcessNode,
  filterNode: FilterNode,
  outputNode: OutputNode,
};

const Workflow: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isAddNodeModalVisible, setIsAddNodeModalVisible] = useState(false);
  const [newNodeData, setNewNodeData] = useState({
    type: 'dataNode',
    label: '',
    method: '',
    condition: '',
    format: '',
    path: '',
  });

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
    (setEdges as any)((eds: any) => eds.filter((edge: any) => !selectedEdgeIds.includes(edge.id)));
    message.success('连线删除成功');
  };

  // 删除所有连线
  const deleteAllEdges = () => {
    if (edges.length === 0) {
      message.warning('没有可删除的连线');
      return;
    }
    (setEdges as any)([]);
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

    (setNodes as any)((nds: any) => [...nds, newNode]);
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
    (setNodes as any)((nds: any) => nds.filter((node: any) => !selectedNodeIds.includes(node.id)));
    (setEdges as any)((eds: any) => eds.filter((edge: any) => !selectedNodeIds.includes(edge.source) && !selectedNodeIds.includes(edge.target)));
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
            (setNodes as any)(workflowData.nodes || []);
            (setEdges as any)(workflowData.edges || []);
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
    (setNodes as any)(initialNodes);
    (setEdges as any)(initialEdges);
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
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
            return '#eee';
          }}
          nodeColor={(n: any) => {
            if (n.type === 'dataNode') return '#e6f7ff';
            if (n.type === 'analysisNode') return '#f6ffed';
            if (n.type === 'processNode') return '#fff7e6';
            if (n.type === 'filterNode') return '#f9f0ff';
            if (n.type === 'outputNode') return '#fff0f6';
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