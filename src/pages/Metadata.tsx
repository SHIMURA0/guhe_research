import React, { useState } from 'react';
import {
  Card,
  Table,
  Tag,
  Space,
  Button,
  Input,
  Select,
  Row,
  Col,
  Typography,
  Modal,
  Descriptions,
  Badge,
  Tooltip,
  Form,
  DatePicker,
  Upload,
  Statistic,
  Tabs,
  Divider,
  Avatar,
  Progress,
  Alert,
  message
} from 'antd';
import {
  SearchOutlined,
  EyeOutlined,
  DownloadOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  FileTextOutlined,
  CloudUploadOutlined,
  InfoCircleOutlined,
  UserOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  StarOutlined,
  ReloadOutlined,
  BarChartOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const Metadata: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedData, setSelectedData] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  // 元数据表
  const metadataTables = [
    {
      id: 1,
      name: '犬类样本基本信息表',
      category: '基本信息',
      species: '犬',
      samples: 320,
      fields: 25,
      status: 'complete',
      updateDate: '2025-01-15',
      description: '包含320个犬类样本的基本信息，包括样本编号、年龄、性别、品种、体重等',
      dataSource: '临床收集',
      format: 'CSV',
      uploader: '张研究员',
      tags: ['犬类', '基本信息', '临床数据', '样本编号'],
      quality: 95,
      lastModified: '2025-01-15 14:30:00',
      version: 'v1.2',
      size: '2.8MB',
      sampleData: [
        { sampleId: 'DOG001', age: 3, gender: '雄性', breed: '金毛', weight: 28.5, neutered: '是', healthStatus: '健康' },
        { sampleId: 'DOG002', age: 5, gender: '雌性', breed: '拉布拉多', weight: 25.2, neutered: '否', healthStatus: '健康' },
        { sampleId: 'DOG003', age: 7, gender: '雄性', breed: '德牧', weight: 32.1, neutered: '是', healthStatus: '慢性肾病' }
      ]
    },
    {
      id: 2,
      name: '猫类样本基本信息表',
      category: '基本信息',
      species: '猫',
      samples: 180,
      fields: 20,
      status: 'complete',
      updateDate: '2025-01-14',
      description: '180个猫类样本的基本信息，包括样本编号、年龄、性别、品种、体重、绝育状态等',
      dataSource: '临床收集',
      format: 'Excel',
      uploader: '王助理',
      tags: ['猫类', '基本信息', '临床数据', '样本编号'],
      quality: 92,
      lastModified: '2025-01-14 16:45:00',
      version: 'v1.0',
      size: '1.5MB',
      sampleData: [
        { sampleId: 'CAT001', age: 2, gender: '雌性', breed: '英短', weight: 4.2, neutered: '是', healthStatus: '健康' },
        { sampleId: 'CAT002', age: 4, gender: '雄性', breed: '美短', weight: 5.1, neutered: '否', healthStatus: '糖尿病' },
        { sampleId: 'CAT003', age: 6, gender: '雌性', breed: '波斯猫', weight: 3.8, neutered: '是', healthStatus: '健康' }
      ]
    },
    {
      id: 3,
      name: '人类样本基本信息表',
      category: '基本信息',
      species: '人类',
      samples: 450,
      fields: 30,
      status: 'complete',
      updateDate: '2025-01-13',
      description: '450个人类样本的基本信息，包括样本编号、年龄、性别、身高、体重、BMI等',
      dataSource: '医疗记录',
      format: 'CSV',
      uploader: '李博士',
      tags: ['人类', '基本信息', '医疗记录', '样本编号'],
      quality: 88,
      lastModified: '2025-01-13 09:20:00',
      version: 'v0.9',
      size: '4.2MB',
      sampleData: [
        { sampleId: 'HUM001', age: 35, gender: '男性', height: 175, weight: 70, bmi: 22.9, healthStatus: '健康' },
        { sampleId: 'HUM002', age: 42, gender: '女性', height: 162, weight: 58, bmi: 22.1, healthStatus: '轻度肥胖' },
        { sampleId: 'HUM003', age: 28, gender: '男性', height: 180, weight: 75, bmi: 23.1, healthStatus: '健康' }
      ]
    },
    {
      id: 4,
      name: '疾病症状记录表',
      category: '临床信息',
      species: '混合',
      samples: 280,
      fields: 20,
      status: 'complete',
      updateDate: '2025-01-12',
      description: '280个样本的疾病症状记录，包括主要症状、症状持续时间、严重程度等',
      dataSource: '临床诊断',
      format: 'CSV',
      uploader: '刘研究员',
      tags: ['临床信息', '疾病症状', '诊断记录', '症状评估'],
      quality: 96,
      lastModified: '2025-01-12 11:15:00',
      version: 'v1.1',
      size: '3.1MB',
      sampleData: [
        { sampleId: 'DOG001', mainSymptom: '多饮多尿', duration: '3个月', severity: '中度', diagnosis: '糖尿病' },
        { sampleId: 'CAT002', mainSymptom: '食欲不振', duration: '1周', severity: '轻度', diagnosis: '胃炎' },
        { sampleId: 'HUM001', mainSymptom: '腹痛', duration: '2天', severity: '重度', diagnosis: '急性阑尾炎' }
      ]
    },
    {
      id: 5,
      name: '环境因素调查表',
      category: '环境信息',
      species: '混合',
      samples: 150,
      fields: 18,
      status: 'complete',
      updateDate: '2025-01-11',
      description: '150个样本的环境因素调查，包括生活环境、饮食类型、活动水平、接触史等',
      dataSource: '问卷调查',
      format: 'Excel',
      uploader: '陈助理',
      tags: ['环境信息', '生活方式', '问卷调查', '环境因素'],
      quality: 98,
      lastModified: '2025-01-11 13:40:00',
      version: 'v1.3',
      size: '1.8MB',
      sampleData: [
        { sampleId: 'DOG001', livingEnvironment: '室内', dietType: '商业狗粮', activityLevel: '中等', contactHistory: '无' },
        { sampleId: 'CAT002', livingEnvironment: '室内外', dietType: '混合', activityLevel: '低', contactHistory: '流浪猫接触' },
        { sampleId: 'HUM001', livingEnvironment: '城市', dietType: '均衡', activityLevel: '高', contactHistory: '无' }
      ]
    }
  ];

  // 统计数据
  const statistics = [
    { title: '总样本数', value: 1380, unit: '个', icon: <UserOutlined />, color: '#1890ff' },
    { title: '元数据表', value: metadataTables.length, unit: '个', icon: <FileTextOutlined />, color: '#52c41a' },
    { title: '完整数据', value: 4, unit: '个', icon: <CheckCircleOutlined />, color: '#722ed1' },
    { title: '不完整', value: 1, unit: '个', icon: <ExclamationCircleOutlined />, color: '#fa8c16' },
    { title: '平均质量', value: 93.8, unit: '%', icon: <StarOutlined />, color: '#13c2c2' }
  ];

  const columns = [
    {
      title: '元数据名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FileTextOutlined style={{ color: '#1890ff', marginRight: 8 }} />
          <div>
            <Button 
              type="link" 
              onClick={() => {
                setSelectedData(record);
                setIsModalVisible(true);
              }}
              style={{ padding: 0, height: 'auto' }}
            >
              {text}
            </Button>
            <div style={{ fontSize: '12px', color: '#666' }}>
              {record.description}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      render: (text: string) => {
        const colorMap: { [key: string]: string } = {
          '基本信息': 'blue',
          '临床信息': 'red',
          '环境信息': 'green',
          '营养信息': 'orange',
          '实验信息': 'purple'
        };
        return <Tag color={colorMap[text] || 'default'}>{text}</Tag>;
      },
    },
    {
      title: '物种',
      dataIndex: 'species',
      key: 'species',
      render: (text: string) => <Tag color="green">{text}</Tag>,
    },
    {
      title: '样本数',
      dataIndex: 'samples',
      key: 'samples',
      render: (count: number) => <Badge count={count} style={{ backgroundColor: '#52c41a' }} />,
    },
    {
      title: '字段数',
      dataIndex: 'fields',
      key: 'fields',
      render: (fields: number) => <Badge count={fields} style={{ backgroundColor: '#1890ff' }} />,
    },
    {
      title: '质量评分',
      dataIndex: 'quality',
      key: 'quality',
      render: (quality: number) => (
        <div>
          <Progress 
            percent={quality} 
            size="small" 
            strokeColor={quality >= 90 ? '#52c41a' : quality >= 80 ? '#fa8c16' : '#ff4d4f'}
            showInfo={false}
          />
          <Text style={{ fontSize: '12px' }}>{quality}%</Text>
        </div>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color = status === 'complete' ? 'green' : status === 'incomplete' ? 'orange' : 'red';
        const text = status === 'complete' ? '完整' : status === 'incomplete' ? '不完整' : '错误';
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '更新日期',
      dataIndex: 'updateDate',
      key: 'updateDate',
      render: (date: string, record: any) => (
        <div>
          <div>{date}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.uploader}</div>
        </div>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size="small">
          <Tooltip title="查看详情">
            <Button 
              type="primary" 
              size="small" 
              icon={<EyeOutlined />}
              onClick={() => {
                setSelectedData(record);
                setIsModalVisible(true);
              }}
            />
          </Tooltip>
          <Tooltip title="预览数据">
            <Button 
              size="small" 
              icon={<FileTextOutlined />}
              onClick={() => {
                setSelectedData(record);
                setIsModalVisible(true);
              }}
            />
          </Tooltip>
          <Tooltip title="下载数据">
            <Button size="small" icon={<DownloadOutlined />} />
          </Tooltip>
          <Tooltip title="编辑">
            <Button size="small" icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="删除">
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const filteredData = metadataTables.filter((data: any) =>
    data.name.toLowerCase().includes(searchText.toLowerCase()) &&
    (selectedCategory === 'all' || data.category === selectedCategory)
  );

  // 根据分类获取样本数据列定义
  const getSampleDataColumns = (category: string) => {
    const baseColumns = [
      {
        title: '样本编号',
        dataIndex: 'sampleId',
        key: 'sampleId',
        render: (text: string) => <Tag color="blue">{text}</Tag>,
      }
    ];

    switch (category) {
      case '基本信息':
        return [
          ...baseColumns,
          { title: '年龄', dataIndex: 'age', key: 'age', render: (age: number) => `${age}岁` },
          { title: '性别', dataIndex: 'gender', key: 'gender' },
          { title: '品种', dataIndex: 'breed', key: 'breed' },
          { title: '体重(kg)', dataIndex: 'weight', key: 'weight' },
          { title: '绝育状态', dataIndex: 'neutered', key: 'neutered', render: (neutered: string) => 
            <Tag color={neutered === '是' ? 'green' : 'orange'}>{neutered}</Tag> },
          { title: '健康状况', dataIndex: 'healthStatus', key: 'healthStatus', render: (status: string) => 
            <Tag color={status === '健康' ? 'green' : 'red'}>{status}</Tag> },
          { title: '身高(cm)', dataIndex: 'height', key: 'height' },
          { title: 'BMI', dataIndex: 'bmi', key: 'bmi' }
        ];
      case '临床信息':
        return [
          ...baseColumns,
          { title: '主要症状', dataIndex: 'mainSymptom', key: 'mainSymptom' },
          { title: '持续时间', dataIndex: 'duration', key: 'duration' },
          { title: '严重程度', dataIndex: 'severity', key: 'severity', render: (severity: string) => {
            const colorMap: { [key: string]: string } = { '轻度': 'green', '中度': 'orange', '重度': 'red' };
            return <Tag color={colorMap[severity] || 'default'}>{severity}</Tag>;
          }},
          { title: '诊断结果', dataIndex: 'diagnosis', key: 'diagnosis' }
        ];
      case '环境信息':
        return [
          ...baseColumns,
          { title: '生活环境', dataIndex: 'livingEnvironment', key: 'livingEnvironment' },
          { title: '饮食类型', dataIndex: 'dietType', key: 'dietType' },
          { title: '活动水平', dataIndex: 'activityLevel', key: 'activityLevel', render: (level: string) => {
            const colorMap: { [key: string]: string } = { '低': 'red', '中等': 'orange', '高': 'green' };
            return <Tag color={colorMap[level] || 'default'}>{level}</Tag>;
          }},
          { title: '接触史', dataIndex: 'contactHistory', key: 'contactHistory' }
        ];
      default:
        return baseColumns;
    }
  };

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      {/* 页面标题 */}
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>
          <FileTextOutlined style={{ marginRight: 8 }} />
          元数据管理
        </Title>
        <Paragraph style={{ color: '#666', marginBottom: 0 }}>
          管理样本的元数据信息，包括基本信息（年龄、性别、体重、品种、绝育状态等）、临床信息（疾病症状、诊断结果等）、环境信息（生活环境、饮食类型等）
        </Paragraph>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        {statistics.map((stat, index) => (
          <Col xs={24} sm={12} lg={4} key={index}>
            <Card 
              hoverable 
              style={{ 
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: 'none'
              }}
            >
              <Statistic
                title={stat.title}
                value={stat.value}
                suffix={stat.unit}
                prefix={stat.icon}
                valueStyle={{ color: stat.color, fontSize: '24px', fontWeight: 'bold' }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* 主要内容区域 */}
      <Card style={{ borderRadius: '12px', marginBottom: '24px' }}>
        <Tabs 
          defaultActiveKey="all"
          items={[
            {
              key: 'all',
              label: (
                <span>
                  <FileTextOutlined />
                  全部元数据
                </span>
              ),
              children: (
                <div>
                  {/* 搜索和筛选区域 */}
                  <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                    <Col xs={24} sm={12} md={8} lg={6}>
                      <Search
                        placeholder="搜索元数据名称..."
                        allowClear
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        prefix={<SearchOutlined />}
                      />
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={4}>
                      <Select
                        placeholder="选择数据分类"
                        style={{ width: '100%' }}
                        value={selectedCategory}
                        onChange={setSelectedCategory}
                      >
                        <Option value="all">全部分类</Option>
                        <Option value="基本信息">基本信息</Option>
                        <Option value="临床信息">临床信息</Option>
                        <Option value="环境信息">环境信息</Option>
                        <Option value="营养信息">营养信息</Option>
                        <Option value="实验信息">实验信息</Option>
                      </Select>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={4}>
                      <Select
                        placeholder="物种"
                        style={{ width: '100%' }}
                        defaultValue="all"
                      >
                        <Option value="all">全部物种</Option>
                        <Option value="人类">人类</Option>
                        <Option value="犬">犬</Option>
                        <Option value="猫">猫</Option>
                        <Option value="混合">混合</Option>
                      </Select>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={4}>
                      <Select
                        placeholder="状态"
                        style={{ width: '100%' }}
                        defaultValue="all"
                      >
                        <Option value="all">全部状态</Option>
                        <Option value="complete">完整</Option>
                        <Option value="incomplete">不完整</Option>
                      </Select>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                      <DatePicker.RangePicker
                        style={{ width: '100%' }}
                        placeholder={['开始日期', '结束日期']}
                      />
                    </Col>
                  </Row>

                  {/* 操作按钮 */}
                  <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                    <Col>
                      <Space>
                        <Button 
                          type="primary" 
                          icon={<PlusOutlined />} 
                          onClick={() => setIsAddModalVisible(true)}
                        >
                          添加元数据表
                        </Button>
                        <Button icon={<CloudUploadOutlined />}>
                          批量导入
                        </Button>
                        <Button icon={<DownloadOutlined />}>
                          导出数据
                        </Button>
                        <Button icon={<ReloadOutlined />}>
                          刷新
                        </Button>
                      </Space>
                    </Col>
                  </Row>

                  {/* 数据表格 */}
                  <Table
                    columns={columns}
                    dataSource={filteredData}
                    rowKey="id"
                    pagination={{
                      pageSize: 10,
                      showSizeChanger: true,
                      showQuickJumper: true,
                      showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
                    }}
                  />
                </div>
              )
            },
            {
              key: 'statistics',
              label: (
                <span>
                  <BarChartOutlined />
                  统计分析
                </span>
              ),
              children: (
                <Row gutter={[24, 24]}>
                  <Col xs={24} lg={12}>
                    <Card title="数据分类分布" style={{ borderRadius: '12px' }}>
                      <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Text type="secondary">图表区域 - 数据分类饼图</Text>
                      </div>
                    </Card>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Card title="数据质量分布" style={{ borderRadius: '12px' }}>
                      <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Text type="secondary">图表区域 - 数据质量柱状图</Text>
                      </div>
                    </Card>
                  </Col>
                </Row>
              )
            }
          ]}
        />
      </Card>

      {/* 详情模态框 */}
      <Modal
        title={
          <Space>
            <FileTextOutlined />
            {selectedData?.name}
          </Space>
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        width={1000}
        footer={[
          <Button key="back" onClick={() => setIsModalVisible(false)}>
            关闭
          </Button>,
          <Button key="download" type="primary" icon={<DownloadOutlined />}>
            下载数据
          </Button>,
        ]}
      >
        {selectedData && (
          <div>
            <Tabs
              defaultActiveKey="info"
              items={[
                {
                  key: 'info',
                  label: '基本信息',
                  children: (
                    <div>
                      <Descriptions bordered column={2}>
                        <Descriptions.Item label="数据分类" span={2}>
                          <Tag color="blue">{selectedData.category}</Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="物种">
                          <Tag color="green">{selectedData.species}</Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="样本数">
                          <Badge count={selectedData.samples} style={{ backgroundColor: '#52c41a' }} />
                        </Descriptions.Item>
                        <Descriptions.Item label="字段数">
                          <Badge count={selectedData.fields} style={{ backgroundColor: '#1890ff' }} />
                        </Descriptions.Item>
                        <Descriptions.Item label="数据格式">
                          <Tag color="purple">{selectedData.format}</Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="文件大小">
                          {selectedData.size}
                        </Descriptions.Item>
                        <Descriptions.Item label="数据来源" span={2}>
                          {selectedData.dataSource}
                        </Descriptions.Item>
                        <Descriptions.Item label="数据标签" span={2}>
                          <Space wrap>
                            {selectedData.tags.map((tag: string) => (
                              <Tag key={tag} color="blue">{tag}</Tag>
                            ))}
                          </Space>
                        </Descriptions.Item>
                        <Descriptions.Item label="版本">
                          {selectedData.version}
                        </Descriptions.Item>
                        <Descriptions.Item label="最后修改">
                          {selectedData.lastModified}
                        </Descriptions.Item>
                        <Descriptions.Item label="更新日期" span={2}>
                          {selectedData.updateDate}
                        </Descriptions.Item>
                        <Descriptions.Item label="上传者" span={2}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar size="small" style={{ marginRight: 8 }}>
                              {selectedData.uploader.charAt(0)}
                            </Avatar>
                            {selectedData.uploader}
                          </div>
                        </Descriptions.Item>
                        <Descriptions.Item label="状态">
                          <Tag color={selectedData.status === 'complete' ? 'green' : 'orange'}>
                            {selectedData.status === 'complete' ? '完整' : '不完整'}
                          </Tag>
                        </Descriptions.Item>
                      </Descriptions>

                      <Divider />

                      <Title level={4}>数据描述</Title>
                      <Paragraph>{selectedData.description}</Paragraph>

                      <Divider />

                      <Title level={4}>质量评估</Title>
                      <Progress 
                        percent={selectedData.quality} 
                        strokeColor={selectedData.quality >= 90 ? '#52c41a' : selectedData.quality >= 80 ? '#fa8c16' : '#ff4d4f'}
                      />
                    </div>
                  )
                },
                {
                  key: 'preview',
                  label: '数据预览',
                  children: (
                    <div>
                      <Alert
                        message="样本数据预览"
                        description={`显示前 ${selectedData.sampleData?.length || 0} 条样本数据，共 ${selectedData.samples} 条记录`}
                        type="info"
                        showIcon
                        style={{ marginBottom: 16 }}
                      />
                      <Table
                        dataSource={selectedData.sampleData}
                        columns={getSampleDataColumns(selectedData.category)}
                        pagination={false}
                        size="small"
                        scroll={{ x: 800 }}
                      />
                    </div>
                  )
                }
              ]}
            />
          </div>
        )}
      </Modal>

      {/* 添加元数据模态框 */}
      <Modal
        title={
          <Space>
            <PlusOutlined />
            添加元数据表
          </Space>
        }
        open={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        width={700}
        footer={[
          <Button key="back" onClick={() => setIsAddModalVisible(false)}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={() => {
            message.success('元数据表添加成功！');
            setIsAddModalVisible(false);
          }}>
            添加
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="元数据表名称" required>
                <Input placeholder="例如：犬类样本基本信息表" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="数据分类" required>
                <Select placeholder="请选择数据分类">
                  <Option value="基本信息">基本信息</Option>
                  <Option value="临床信息">临床信息</Option>
                  <Option value="环境信息">环境信息</Option>
                  <Option value="营养信息">营养信息</Option>
                  <Option value="实验信息">实验信息</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="物种" required>
                <Select placeholder="请选择物种">
                  <Option value="犬">犬</Option>
                  <Option value="猫">猫</Option>
                  <Option value="人类">人类</Option>
                  <Option value="混合">混合</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="数据格式" required>
                <Select placeholder="请选择数据格式">
                  <Option value="CSV">CSV</Option>
                  <Option value="Excel">Excel</Option>
                  <Option value="JSON">JSON</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="样本数量" required>
                <Input type="number" placeholder="请输入样本数量" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="字段数量" required>
                <Input type="number" placeholder="请输入字段数量" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="数据描述" required>
            <Input.TextArea rows={3} placeholder="请详细描述元数据表的内容、字段说明和用途" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="数据来源" required>
                <Input placeholder="例如：临床收集、问卷调查、医疗记录" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="版本号">
                <Input placeholder="例如：v1.0" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="数据标签">
            <Select mode="tags" placeholder="请添加数据标签">
              <Option value="基本信息">基本信息</Option>
              <Option value="临床数据">临床数据</Option>
              <Option value="样本编号">样本编号</Option>
              <Option value="疾病症状">疾病症状</Option>
              <Option value="环境因素">环境因素</Option>
              <Option value="年龄">年龄</Option>
              <Option value="性别">性别</Option>
              <Option value="体重">体重</Option>
              <Option value="品种">品种</Option>
              <Option value="绝育状态">绝育状态</Option>
            </Select>
          </Form.Item>
          <Form.Item label="数据文件" required>
            <Upload.Dragger
              name="file"
              multiple={false}
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              onChange={(info) => {
                const { status } = info.file;
                if (status === 'done') {
                  message.success(`${info.file.name} 文件上传成功.`);
                } else if (status === 'error') {
                  message.error(`${info.file.name} 文件上传失败.`);
                }
              }}
            >
              <p className="ant-upload-drag-icon">
                <CloudUploadOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽元数据文件到此区域上传</p>
              <p className="ant-upload-hint">
                支持CSV、Excel、JSON格式，文件应包含样本编号索引字段
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Metadata; 