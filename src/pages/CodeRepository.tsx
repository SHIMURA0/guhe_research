import React, { useState } from 'react';
import { Card, Row, Col, Input, Button, Tag, Modal, Typography, Space, Tooltip, List, Select, Divider, Form, Upload, message } from 'antd';
import { SearchOutlined, PlusOutlined, FileTextOutlined, CodeOutlined, DownloadOutlined, CopyOutlined, EditOutlined, FileAddOutlined, FileImageOutlined, FileMarkdownOutlined } from '@ant-design/icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const codeCategories = [
  { key: 'all', label: '全部' },
  { key: 'snippet', label: '代码片段' },
  { key: 'script', label: '完整脚本' },
  { key: 'pipeline', label: 'Pipeline流程' }
];

const codeData = [
  {
    id: 1,
    name: '快速读取CSV文件',
    type: 'snippet',
    language: 'python',
    tags: ['数据读取', 'Python'],
    description: '使用pandas快速读取CSV文件。',
    author: '张三',
    createdAt: '2024-06-01',
    updatedAt: '2024-06-01',
    content: 'import pandas as pd\ndf = pd.read_csv(\'data.csv\')\nprint(df.head())',
  },
  {
    id: 2,
    name: '测序数据质控脚本',
    type: 'script',
    language: 'bash',
    tags: ['质控', 'Shell'],
    description: '使用fastp进行测序数据质控。',
    author: '李四',
    createdAt: '2024-06-02',
    updatedAt: '2024-06-02',
    content: '#!/bin/bash\nfastp -i input_R1.fq -I input_R2.fq -o clean_R1.fq -O clean_R2.fq -h report.html',
  },
  {
    id: 3,
    name: '序列比对Pipeline',
    type: 'pipeline',
    language: 'mermaid',
    tags: ['流程', '比对', 'Mermaid'],
    description: '典型的序列比对流程图。',
    author: '王五',
    createdAt: '2024-06-03',
    updatedAt: '2024-06-03',
    content: 'graph TD;A[原始数据]-->B[质控];B-->C[比对];C-->D[结果统计]',
  },
  {
    id: 4,
    name: 'R语言可视化示例',
    type: 'snippet',
    language: 'r',
    tags: ['可视化', 'R'],
    description: 'ggplot2绘制箱线图。',
    author: '赵六',
    createdAt: '2024-06-04',
    updatedAt: '2024-06-04',
    content: 'library(ggplot2)\nggplot(df, aes(x=group, y=value)) + geom_boxplot()',
  },
  {
    id: 5,
    name: '统计分析脚本',
    type: 'script',
    language: 'python',
    tags: ['统计分析', 'Python'],
    description: 't检验分析脚本。',
    author: '张三',
    createdAt: '2024-06-05',
    updatedAt: '2024-06-05',
    content: 'from scipy.stats import ttest_ind\nstat, p = ttest_ind(group1, group2)\nprint(f\'t={stat}, p={p}\')',
  },
];

const languageOptions = [
  { value: 'python', label: 'Python' },
  { value: 'r', label: 'R' },
  { value: 'bash', label: 'Bash/Shell' },
  { value: 'json', label: 'JSON' },
  { value: 'yaml', label: 'YAML' },
  { value: 'mermaid', label: 'Mermaid流程图' },
];

const CodeRepository: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCode, setSelectedCode] = useState<any>(codeData[0]);
  const [addModalVisible, setAddModalVisible] = useState(false);

  const filteredList = codeData.filter(item =>
    (selectedCategory === 'all' || item.type === selectedCategory) &&
    (item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.description.toLowerCase().includes(searchText.toLowerCase()) ||
      item.tags.join(',').toLowerCase().includes(searchText.toLowerCase()))
  );

  // 代码高亮语言映射
  const langMap: Record<string, string> = {
    python: 'python',
    r: 'r',
    bash: 'bash',
    json: 'json',
    yaml: 'yaml',
  };

  // pipeline流程图渲染
  const renderPipeline = (content: string) => (
    <div style={{ background: '#fff', borderRadius: 8, padding: 16, color: '#333', minHeight: 200, border: '1px solid #d9d9d9' }}>
      <pre style={{ color: '#333', fontFamily: 'monospace', fontSize: 16 }}>{content}</pre>
      <div style={{ color: '#666', fontSize: 12, marginTop: 8 }}>（可集成Mermaid或图片渲染）</div>
    </div>
  );

  // 代码预览区
  const renderPreview = () => {
    if (!selectedCode) return <div style={{ color: '#aaa', textAlign: 'center', marginTop: 80 }}>请选择左侧代码查看详情</div>;
    if (selectedCode.type === 'pipeline') {
      return renderPipeline(selectedCode.content);
    }
    return (
      <SyntaxHighlighter language={langMap[selectedCode.language] || 'text'} style={tomorrow} showLineNumbers wrapLongLines>
        {selectedCode.content}
      </SyntaxHighlighter>
    );
  };

  // 复制代码
  const handleCopy = () => {
    navigator.clipboard.writeText(selectedCode.content);
    message.success('代码已复制到剪贴板');
  };

  return (
    <div style={{ padding: 24, background: '#f5f7fa', minHeight: '100vh' }}>
      <Title level={2} style={{ marginBottom: 8 }}>
        <CodeOutlined style={{ marginRight: 8 }} />代码仓库
      </Title>
      <Paragraph style={{ color: '#666', marginBottom: 24 }}>
        存储和管理常用代码片段、完整脚本、分析流程（Pipeline）等，支持多语言高亮和流程图预览。
      </Paragraph>
      <Row gutter={24}>
        {/* 左侧列表区 */}
        <Col xs={24} sm={10} md={8} lg={7} xl={6}>
          <Card
            title={<span><FileTextOutlined /> 代码列表</span>}
            extra={
              <Button type="primary" icon={<PlusOutlined />} onClick={() => setAddModalVisible(true)}>
                新增
              </Button>
            }
            style={{ borderRadius: 12, marginBottom: 24 }}
            bodyStyle={{ padding: 0 }}
          >
            <div style={{ padding: 16 }}>
              <Search
                placeholder="搜索代码名称/标签/描述..."
                allowClear
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                style={{ marginBottom: 16 }}
              />
              <Space style={{ marginBottom: 16 }}>
                {codeCategories.map(cat => (
                  <Tag.CheckableTag
                    key={cat.key}
                    checked={selectedCategory === cat.key}
                    onChange={() => setSelectedCategory(cat.key)}
                  >
                    {cat.label}
                  </Tag.CheckableTag>
                ))}
              </Space>
              <Divider style={{ margin: '12px 0' }} />
              <List
                itemLayout="horizontal"
                dataSource={filteredList}
                renderItem={item => (
                  <List.Item
                    style={{ cursor: 'pointer', background: selectedCode?.id === item.id ? '#e6f7ff' : undefined }}
                    onClick={() => setSelectedCode(item)}
                  >
                    <List.Item.Meta
                      avatar={<CodeOutlined style={{ fontSize: 20, color: '#1890ff' }} />}
                      title={<span style={{ fontWeight: 500 }}>{item.name}</span>}
                      description={
                        <div>
                          <Tag color="blue">{item.type === 'snippet' ? '片段' : item.type === 'script' ? '脚本' : '流程'}</Tag>
                          <Tag color="purple">{item.language}</Tag>
                          {item.tags.map((tag: string) => (
                            <Tag key={tag} color="geekblue">{tag}</Tag>
                          ))}
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </div>
          </Card>
        </Col>
        {/* 右侧详情/预览区 */}
        <Col xs={24} sm={14} md={16} lg={17} xl={18}>
          <Card
            title={<span><FileTextOutlined /> 代码详情</span>}
            style={{ borderRadius: 12, minHeight: 480 }}
            extra={selectedCode && (
              <Space>
                <Tooltip title="复制代码"><Button icon={<CopyOutlined />} onClick={handleCopy} /></Tooltip>
                <Tooltip title="下载"><Button icon={<DownloadOutlined />} /></Tooltip>
                <Tooltip title="编辑"><Button icon={<EditOutlined />} /></Tooltip>
              </Space>
            )}
          >
            {selectedCode && (
              <div>
                <Title level={4}>{selectedCode.name}</Title>
                <Paragraph type="secondary">{selectedCode.description}</Paragraph>
                <Space wrap style={{ marginBottom: 8 }}>
                  <Tag color="blue">{selectedCode.type === 'snippet' ? '片段' : selectedCode.type === 'script' ? '脚本' : '流程'}</Tag>
                  <Tag color="purple">{selectedCode.language}</Tag>
                  {selectedCode.tags.map((tag: string) => (
                    <Tag key={tag} color="geekblue">{tag}</Tag>
                  ))}
                  <Tag color="default">作者: {selectedCode.author}</Tag>
                  <Tag color="default">创建: {selectedCode.createdAt}</Tag>
                  <Tag color="default">更新: {selectedCode.updatedAt}</Tag>
                </Space>
                <Divider />
                {renderPreview()}
              </div>
            )}
            {!selectedCode && <div style={{ color: '#aaa', textAlign: 'center', marginTop: 80 }}>请选择左侧代码查看详情</div>}
          </Card>
        </Col>
      </Row>
      {/* 新增代码/流程弹窗 */}
      <Modal
        open={addModalVisible}
        title="新增代码/流程"
        onCancel={() => setAddModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form layout="vertical">
          <Form.Item label="名称" required>
            <Input placeholder="请输入代码/流程名称" />
          </Form.Item>
          <Form.Item label="类型" required>
            <Select placeholder="请选择类型">
              {codeCategories.filter(c => c.key !== 'all').map(c => (
                <Option key={c.key} value={c.key}>{c.label}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="编程语言/格式" required>
            <Select placeholder="请选择语言/格式">
              {languageOptions.map(opt => (
                <Option key={opt.value} value={opt.value}>{opt.label}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="标签">
            <Select mode="tags" placeholder="请输入标签" />
          </Form.Item>
          <Form.Item label="描述">
            <Input.TextArea rows={2} placeholder="请输入描述" />
          </Form.Item>
          <Form.Item label="代码内容/流程图" required>
            <Input.TextArea rows={6} placeholder="粘贴代码或Mermaid流程图，或上传图片" />
          </Form.Item>
          <Form.Item label="上传图片（可选，流程图/示意图）">
            <Upload listType="picture-card" maxCount={1}>
              <Button icon={<FileImageOutlined />}>上传图片</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>提交</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CodeRepository; 