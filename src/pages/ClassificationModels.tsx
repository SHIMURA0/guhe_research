import React, { useState } from 'react';
import { Card, Row, Col, Input, Button, Tag, Modal, Typography, Space, Tooltip, Progress, Statistic, Tabs, Divider, Form, Select, Upload, message, Badge, Avatar, List, Descriptions } from 'antd';
import { SearchOutlined, PlusOutlined, PlayCircleOutlined, SettingOutlined, DownloadOutlined, DeleteOutlined, EyeOutlined, RocketOutlined, BarChartOutlined, ExperimentOutlined, CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const modelCategories = [
  { key: 'all', label: '全部' },
  { key: 'binary', label: '二分类' },
  { key: 'multiclass', label: '多分类' },
  { key: 'deep', label: '深度学习' },
  { key: 'traditional', label: '传统机器学习' },
  { key: 'ensemble', label: '集成学习' }
];

const modelsData = [
  {
    id: 1,
    name: '疾病预测模型',
    type: 'binary',
    category: '二分类',
    description: '基于微生物组数据预测疾病状态的二分类模型',
    author: '张三',
    createdAt: '2024-06-01',
    status: 'deployed',
    accuracy: 0.89,
    precision: 0.87,
    recall: 0.91,
    f1Score: 0.89,
    trainingTime: '2.5小时',
    datasetSize: '1200样本',
    featureCount: 156,
    tags: ['疾病预测', '微生物组', '二分类'],
    algorithm: 'XGBoost',
    parameters: {
      learning_rate: 0.1,
      max_depth: 6,
      n_estimators: 100,
      subsample: 0.8
    },
    performance: {
      train_accuracy: 0.92,
      val_accuracy: 0.89,
      test_accuracy: 0.87,
      auc: 0.91
    },
    confusionMatrix: [
      [85, 15],
      [12, 88]
    ],
    featureImportance: [
      { feature: 'Bacteroides', importance: 0.15 },
      { feature: 'Firmicutes', importance: 0.12 },
      { feature: 'Proteobacteria', importance: 0.10 }
    ],
    rocData: [
      { fpr: 0, tpr: 0 },
      { fpr: 0.1, tpr: 0.8 },
      { fpr: 0.2, tpr: 0.85 },
      { fpr: 1, tpr: 1 }
    ]
  },
  {
    id: 2,
    name: '物种分类模型',
    type: 'multiclass',
    category: '多分类',
    description: '基于基因序列特征进行物种分类的多分类模型',
    author: '李四',
    createdAt: '2024-06-02',
    status: 'completed',
    accuracy: 0.94,
    precision: 0.93,
    recall: 0.94,
    f1Score: 0.93,
    trainingTime: '4.2小时',
    datasetSize: '5000样本',
    featureCount: 1024,
    tags: ['物种分类', '基因序列', '多分类'],
    algorithm: 'Random Forest',
    parameters: {
      n_estimators: 200,
      max_depth: 10,
      min_samples_split: 5,
      min_samples_leaf: 2
    },
    performance: {
      train_accuracy: 0.96,
      val_accuracy: 0.94,
      test_accuracy: 0.93,
      auc: 0.95
    }
  },
  {
    id: 3,
    name: '图像分类CNN',
    type: 'deep',
    category: '深度学习',
    description: '基于卷积神经网络的微生物图像分类模型',
    author: '王五',
    createdAt: '2024-06-03',
    status: 'training',
    accuracy: 0.91,
    precision: 0.90,
    recall: 0.92,
    f1Score: 0.91,
    trainingTime: '8.5小时',
    datasetSize: '8000样本',
    featureCount: 224,
    tags: ['图像分类', 'CNN', '深度学习'],
    algorithm: 'ResNet-50',
    parameters: {
      learning_rate: 0.001,
      batch_size: 32,
      epochs: 100,
      dropout: 0.5
    },
    performance: {
      train_accuracy: 0.95,
      val_accuracy: 0.91,
      test_accuracy: 0.89,
      auc: 0.93
    }
  },
  {
    id: 4,
    name: '营养状态预测',
    type: 'binary',
    category: '二分类',
    description: '基于营养指标预测营养状态的二分类模型',
    author: '赵六',
    createdAt: '2024-06-04',
    status: 'deploying',
    accuracy: 0.86,
    precision: 0.84,
    recall: 0.88,
    f1Score: 0.86,
    trainingTime: '1.8小时',
    datasetSize: '800样本',
    featureCount: 45,
    tags: ['营养预测', '二分类', '健康'],
    algorithm: 'Logistic Regression',
    parameters: {
      C: 1.0,
      penalty: 'l2',
      solver: 'liblinear'
    },
    performance: {
      train_accuracy: 0.88,
      val_accuracy: 0.86,
      test_accuracy: 0.84,
      auc: 0.87
    }
  },
  {
    id: 5,
    name: '集成分类模型',
    type: 'ensemble',
    category: '集成学习',
    description: '结合多个基学习器的集成分类模型',
    author: '张三',
    createdAt: '2024-06-05',
    status: 'completed',
    accuracy: 0.93,
    precision: 0.92,
    recall: 0.94,
    f1Score: 0.93,
    trainingTime: '3.5小时',
    datasetSize: '2000样本',
    featureCount: 200,
    tags: ['集成学习', '多分类', '高精度'],
    algorithm: 'Voting Classifier',
    parameters: {
      estimators: ['RandomForest', 'XGBoost', 'SVM'],
      voting: 'soft'
    },
    performance: {
      train_accuracy: 0.95,
      val_accuracy: 0.93,
      test_accuracy: 0.91,
      auc: 0.94
    }
  }
];

const ClassificationModels: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedModel, setSelectedModel] = useState<any>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);

  const filteredModels = modelsData.filter(model =>
    (selectedCategory === 'all' || model.type === selectedCategory) &&
    (model.name.toLowerCase().includes(searchText.toLowerCase()) ||
      model.description.toLowerCase().includes(searchText.toLowerCase()) ||
      model.tags.join(',').toLowerCase().includes(searchText.toLowerCase()))
  );



  const getStatusColor = (status: string) => {
    switch (status) {
      case 'training': return 'processing';
      case 'completed': return 'success';
      case 'deploying': return 'warning';
      case 'deployed': return 'success';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'training': return '训练中';
      case 'completed': return '已完成';
      case 'deploying': return '部署中';
      case 'deployed': return '已部署';
      default: return '未知';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'training': return <ClockCircleOutlined />;
      case 'completed': return <CheckCircleOutlined />;
      case 'deploying': return <ExclamationCircleOutlined />;
      case 'deployed': return <RocketOutlined />;
      default: return <ExclamationCircleOutlined />;
    }
  };

  return (
    <div style={{ padding: '24px', background: '#f5f7fa', minHeight: '100vh' }}>
      <Title level={2} style={{ marginBottom: 8 }}>
        <ExperimentOutlined style={{ marginRight: 8 }} />分类模型仓库
      </Title>
      <Paragraph style={{ color: '#666', marginBottom: 24 }}>
        管理和部署各种分类模型，包括二分类、多分类、深度学习等，支持模型训练、评估、部署和监控。
      </Paragraph>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 12 }}>
            <Statistic
              title="总模型数"
              value={modelsData.length}
              prefix={<ExperimentOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 12 }}>
            <Statistic
              title="已部署"
              value={modelsData.filter(m => m.status === 'deployed').length}
              prefix={<RocketOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 12 }}>
            <Statistic
              title="训练中"
              value={modelsData.filter(m => m.status === 'training').length}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 12 }}>
            <Statistic
              title="平均准确率"
              value={modelsData.reduce((acc, m) => acc + m.accuracy, 0) / modelsData.length}
              precision={2}
              suffix="%"
              prefix={<BarChartOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 分类标签 */}
      <Space style={{ marginBottom: 24 }}>
        {modelCategories.map(cat => (
          <Tag.CheckableTag
            key={cat.key}
            checked={selectedCategory === cat.key}
            onChange={() => setSelectedCategory(cat.key)}
            style={{ fontSize: 16, padding: '4px 16px' }}
          >
            {cat.label}
          </Tag.CheckableTag>
        ))}
      </Space>

      {/* 搜索和添加 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col flex="auto">
          <Search
            placeholder="搜索模型名称/描述/标签..."
            allowClear
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            enterButton={<SearchOutlined />}
            size="large"
          />
        </Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => setAddModalVisible(true)}>
            添加模型
          </Button>
        </Col>
      </Row>

      {/* 模型卡片列表 */}
      <Row gutter={[24, 24]}>
        {filteredModels.map(model => (
          <Col xs={24} sm={12} lg={8} xl={6} key={model.id}>
            <Card
              hoverable
              style={{ borderRadius: 12, minHeight: 320 }}
              title={
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 600 }}>{model.name}</span>
                  <Badge status={getStatusColor(model.status) as any} text={getStatusText(model.status)} />
                </div>
              }
              extra={
                <Space>
                  <Tooltip title="查看详情">
                    <Button
                      type="link"
                      icon={<EyeOutlined />}
                      onClick={() => {
                        setSelectedModel(model);
                        setDetailModalVisible(true);
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="部署">
                    <Button type="link" icon={<RocketOutlined />} />
                  </Tooltip>
                  <Tooltip title="删除">
                    <Button type="link" danger icon={<DeleteOutlined />} />
                  </Tooltip>
                </Space>
              }
            >
              <div style={{ marginBottom: 12 }}>
                <Tag color="blue">{model.category}</Tag>
                <Tag color="purple">{model.algorithm}</Tag>
                {model.tags.map((tag: string) => (
                  <Tag key={tag} color="geekblue">{tag}</Tag>
                ))}
              </div>
              <Paragraph ellipsis={{ rows: 2 }}>{model.description}</Paragraph>
              
              {/* 性能指标 */}
              <div style={{ marginBottom: 12 }}>
                <Row gutter={8}>
                  <Col span={12}>
                    <Text type="secondary" style={{ fontSize: 12 }}>准确率</Text>
                    <div><Text strong>{model.accuracy}</Text></div>
                  </Col>
                  <Col span={12}>
                    <Text type="secondary" style={{ fontSize: 12 }}>F1分数</Text>
                    <div><Text strong>{model.f1Score}</Text></div>
                  </Col>
                </Row>
              </div>

              {/* 训练信息 */}
              <div style={{ marginBottom: 12 }}>
                <Text type="secondary" style={{ fontSize: 12 }}>训练时间: {model.trainingTime}</Text><br />
                <Text type="secondary" style={{ fontSize: 12 }}>数据集: {model.datasetSize}</Text><br />
                <Text type="secondary" style={{ fontSize: 12 }}>特征数: {model.featureCount}</Text>
              </div>

              {/* 作者和时间 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar size="small" style={{ marginRight: 8 }}>
                    {model.author.charAt(0)}
                  </Avatar>
                  <Text type="secondary" style={{ fontSize: 12 }}>{model.author}</Text>
                </div>
                <Text type="secondary" style={{ fontSize: 12 }}>{model.createdAt}</Text>
              </div>
            </Card>
          </Col>
        ))}
        {filteredModels.length === 0 && (
          <Col span={24} style={{ textAlign: 'center', color: '#aaa', marginTop: 48 }}>
            暂无符合条件的模型
          </Col>
        )}
      </Row>

      {/* 模型详情弹窗 */}
      <Modal
        open={detailModalVisible}
        title={selectedModel?.name}
        onCancel={() => setDetailModalVisible(false)}
        width={800}
        footer={[
          <Button key="back" onClick={() => setDetailModalVisible(false)}>
            关闭
          </Button>,
          <Button key="deploy" type="primary" icon={<RocketOutlined />}>
            部署模型
          </Button>,
        ]}
      >
        {selectedModel && (
          <div>
            <Tabs
              defaultActiveKey="overview"
              items={[
                {
                  key: 'overview',
                  label: '概览',
                  children: (
                    <div>
                      <Descriptions bordered column={2}>
                        <Descriptions.Item label="模型类型" span={2}>
                          <Tag color="blue">{selectedModel.category}</Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="算法">
                          {selectedModel.algorithm}
                        </Descriptions.Item>
                        <Descriptions.Item label="状态">
                          <Badge status={getStatusColor(selectedModel.status) as any} text={getStatusText(selectedModel.status)} />
                        </Descriptions.Item>
                        <Descriptions.Item label="准确率">
                          <Progress percent={selectedModel.accuracy * 100} size="small" />
                        </Descriptions.Item>
                        <Descriptions.Item label="F1分数">
                          <Progress percent={selectedModel.f1Score * 100} size="small" />
                        </Descriptions.Item>
                        <Descriptions.Item label="训练时间">
                          {selectedModel.trainingTime}
                        </Descriptions.Item>
                        <Descriptions.Item label="数据集大小">
                          {selectedModel.datasetSize}
                        </Descriptions.Item>
                        <Descriptions.Item label="特征数量">
                          {selectedModel.featureCount}
                        </Descriptions.Item>
                        <Descriptions.Item label="作者">
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar size="small" style={{ marginRight: 8 }}>
                              {selectedModel.author.charAt(0)}
                            </Avatar>
                            {selectedModel.author}
                          </div>
                        </Descriptions.Item>
                        <Descriptions.Item label="创建时间" span={2}>
                          {selectedModel.createdAt}
                        </Descriptions.Item>
                        <Descriptions.Item label="标签" span={2}>
                          <Space wrap>
                            {selectedModel.tags.map((tag: string) => (
                              <Tag key={tag} color="blue">{tag}</Tag>
                            ))}
                          </Space>
                        </Descriptions.Item>
                      </Descriptions>
                      <Divider />
                      <Title level={4}>模型描述</Title>
                      <Paragraph>{selectedModel.description}</Paragraph>
                    </div>
                  )
                },
                {
                  key: 'performance',
                  label: '性能指标',
                  children: (
                    <div>
                      <Row gutter={16}>
                        <Col span={6}>
                          <Card>
                            <Statistic title="准确率" value={selectedModel.accuracy} precision={3} />
                          </Card>
                        </Col>
                        <Col span={6}>
                          <Card>
                            <Statistic title="精确率" value={selectedModel.precision} precision={3} />
                          </Card>
                        </Col>
                        <Col span={6}>
                          <Card>
                            <Statistic title="召回率" value={selectedModel.recall} precision={3} />
                          </Card>
                        </Col>
                        <Col span={6}>
                          <Card>
                            <Statistic title="F1分数" value={selectedModel.f1Score} precision={3} />
                          </Card>
                        </Col>
                      </Row>
                      <Divider />
                      <Title level={4}>训练历史</Title>
                      <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', borderRadius: 8 }}>
                        <Text type="secondary">训练历史图表区域</Text>
                      </div>
                    </div>
                  )
                },
                {
                  key: 'parameters',
                  label: '模型参数',
                  children: (
                    <div>
                      <Title level={4}>超参数</Title>
                      <Descriptions bordered column={2}>
                        {Object.entries(selectedModel.parameters).map(([key, value]) => (
                          <Descriptions.Item key={key} label={key}>
                            {value as string}
                          </Descriptions.Item>
                        ))}
                      </Descriptions>
                    </div>
                  )
                }
              ]}
            />
          </div>
        )}
      </Modal>

      {/* 添加模型弹窗 */}
      <Modal
        open={addModalVisible}
        title="添加分类模型"
        onCancel={() => setAddModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form layout="vertical">
          <Form.Item label="模型名称" required>
            <Input placeholder="请输入模型名称" />
          </Form.Item>
          <Form.Item label="模型类型" required>
            <Select placeholder="请选择模型类型">
              {modelCategories.filter(c => c.key !== 'all').map(c => (
                <Option key={c.key} value={c.key}>{c.label}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="算法" required>
            <Select placeholder="请选择算法">
              <Option value="XGBoost">XGBoost</Option>
              <Option value="Random Forest">Random Forest</Option>
              <Option value="SVM">SVM</Option>
              <Option value="Logistic Regression">Logistic Regression</Option>
              <Option value="Neural Network">Neural Network</Option>
              <Option value="CNN">CNN</Option>
              <Option value="ResNet">ResNet</Option>
            </Select>
          </Form.Item>
          <Form.Item label="标签">
            <Select mode="tags" placeholder="请输入标签" />
          </Form.Item>
          <Form.Item label="描述">
            <Input.TextArea rows={3} placeholder="请输入模型描述" />
          </Form.Item>
          <Form.Item label="训练数据">
            <Upload.Dragger>
              <p className="ant-upload-drag-icon">
                <UploadOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
            </Upload.Dragger>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>创建模型</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ClassificationModels; 