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
  Progress,
  Statistic,
  Tabs,
  Upload,
  Form,
  DatePicker,
  Alert,
  Divider,
  List,
  Avatar,
  Timeline,
  Steps,
  Collapse,
  Drawer,
  Popconfirm,
  notification,
  message,
  Dropdown,
  Menu
} from 'antd';
import {
  SearchOutlined,
  EyeOutlined,
  DownloadOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  DatabaseOutlined,
  FileTextOutlined,
  CloudUploadOutlined,
  FilterOutlined,
  ReloadOutlined,
  ShareAltOutlined,
  StarOutlined,
  FileZipOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  FileImageOutlined,
  SyncOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
  TeamOutlined,
  GlobalOutlined,
  LockOutlined,
  UnlockOutlined,
  KeyOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
  RocketOutlined,
  FireOutlined,
  CrownOutlined,
  TrophyOutlined,
  HeartOutlined,
  BookOutlined,
  ExperimentOutlined,
  BugOutlined,
  MedicineBoxOutlined,
  CarOutlined,
  PlusOutlined as PlusIcon,
  MinusOutlined,
  CloseOutlined,
  SaveOutlined,
  ExportOutlined,
  ImportOutlined,
  CopyOutlined,
  ScissorOutlined,
  LinkOutlined,
  DisconnectOutlined,
  PartitionOutlined,
  ClusterOutlined,
  ApartmentOutlined,
  BranchesOutlined,
  NodeIndexOutlined,
  SubnodeOutlined,
  GatewayOutlined,
  SwapOutlined,
  SwapLeftOutlined,
  SwapRightOutlined,
  ShrinkOutlined,
  ArrowsAltOutlined,
  CompressOutlined,
  ExpandOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  ScanOutlined,
  RadarChartOutlined,
  BarChartOutlined,
  PieChartOutlined,
  LineChartOutlined,
  AreaChartOutlined,
  DotChartOutlined,
  FundOutlined,
  RiseOutlined,
  FallOutlined,
  StockOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  FontSizeOutlined,
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  HighlightOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  VerticalAlignTopOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignBottomOutlined,
  BorderOuterOutlined,
  BorderInnerOutlined,
  BorderTopOutlined,
  BorderBottomOutlined,
  BorderLeftOutlined,
  BorderRightOutlined,
  BorderVerticleOutlined,
  BorderHorizontalOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
  CheckSquareOutlined,
  BorderOutlined,
  CheckOutlined,
  CloseSquareOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined,
  QuestionCircleOutlined,
  StopOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  PlaySquareOutlined,
  PauseOutlined,
  AudioOutlined,
  VideoCameraOutlined,
  CameraOutlined,
  PictureOutlined,
  SoundOutlined,
  AudioMutedOutlined,
  VideoCameraAddOutlined,
  FileOutlined,
  FolderOutlined,
  FileTextOutlined as FileTextOutlined2,
  FileMarkdownOutlined,
  FileUnknownOutlined,
  FileProtectOutlined,
  FileSearchOutlined,
  FileSyncOutlined,
  FileExclamationOutlined,
  FileDoneOutlined,
  FileJpgOutlined,
  FileGifOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const RawData: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedData, setSelectedData] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  // 原始数据
  const rawData = [
    {
      id: 1,
      name: '犬类肠道菌群16S测序数据',
      category: '16S测序',
      species: '犬',
      samples: 320,
      size: '2.5GB',
      status: 'processed',
      uploadDate: '2025-01-15',
      description: '包含320个犬类样本的16S rRNA基因测序数据，涵盖健康犬和患病犬的肠道菌群分析',
      technology: '16S rRNA V3-V4',
      quality: 95,
      format: 'FASTQ',
      recordCount: 1250000,
      compression: 'GZIP',
      checksum: 'a1b2c3d4e5f6',
      location: '/data/raw/dog_16s_2025',
      uploader: '张研究员',
      tags: ['犬类', '16S rRNA', 'V3-V4', '肠道菌群']
    },
    {
      id: 2,
      name: '猫类宏基因组测序数据',
      category: '宏基因组',
      species: '猫',
      samples: 180,
      size: '15.2GB',
      status: 'processing',
      uploadDate: '2025-01-14',
      description: '180个猫类样本的宏基因组测序数据，用于分析肠道菌群的功能基因',
      technology: '宏基因组测序',
      quality: 92,
      format: 'FASTQ',
      recordCount: 2100000,
      compression: 'GZIP',
      checksum: 'b2c3d4e5f6a1',
      location: '/data/raw/cat_metagenome_2025',
      uploader: '王助理',
      tags: ['猫类', '宏基因组', '功能基因', 'WGS']
    },
    {
      id: 3,
      name: '人类肠道菌群数据',
      category: '16S测序',
      species: '人类',
      samples: 450,
      size: '3.8GB',
      status: 'processed',
      uploadDate: '2025-01-13',
      description: '450个人类样本的肠道菌群16S测序数据，包含不同年龄和健康状况的样本',
      technology: '16S rRNA V4',
      quality: 98,
      format: 'FASTQ',
      recordCount: 1800000,
      compression: 'GZIP',
      checksum: 'c3d4e5f6a1b2',
      location: '/data/raw/human_16s_2025',
      uploader: '李博士',
      tags: ['人类', '16S rRNA', 'V4', '肠道菌群']
    },
    {
      id: 4,
      name: '犬类IBD样本数据包',
      category: '16S测序',
      species: '犬',
      samples: 250,
      size: '1.8GB',
      status: 'uploaded',
      uploadDate: '2025-01-12',
      description: '犬类炎症性肠病样本的压缩数据包，包含多个测序文件',
      technology: '16S rRNA V4',
      quality: 88,
      format: 'ZIP',
      recordCount: 0,
      compression: 'ZIP',
      checksum: 'd4e5f6a1b2c3',
      location: '/data/raw/dog_ibd_package',
      uploader: '刘研究员',
      tags: ['犬类', 'IBD', '压缩包', '炎症性肠病']
    },
    {
      id: 5,
      name: '猫类糖尿病研究数据',
      category: '宏基因组',
      species: '猫',
      samples: 120,
      size: '8.5GB',
      status: 'processing',
      uploadDate: '2025-01-11',
      description: '猫类2型糖尿病患者的宏基因组测序数据',
      technology: '宏基因组测序',
      quality: 90,
      format: 'FASTQ',
      recordCount: 1500000,
      compression: 'GZIP',
      checksum: 'e5f6a1b2c3d4',
      location: '/data/raw/cat_diabetes_2025',
      uploader: '陈助理',
      tags: ['猫类', '糖尿病', '宏基因组', '代谢疾病']
    }
  ];

  // 统计数据
  const statistics = [
    { title: '总数据量', value: 31.8, unit: 'GB', icon: <DatabaseOutlined />, color: '#1890ff' },
    { title: '文件数量', value: rawData.length, unit: '个', icon: <FileTextOutlined />, color: '#52c41a' },
    { title: '已处理', value: 2, unit: '个', icon: <CheckCircleOutlined />, color: '#722ed1' },
    { title: '处理中', value: 2, unit: '个', icon: <SyncOutlined spin />, color: '#fa8c16' },
    { title: '待处理', value: 1, unit: '个', icon: <ClockCircleOutlined />, color: '#13c2c2' }
  ];

  const columns = [
    {
      title: '数据名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {getFileTypeIcon(record.format)}
          <div style={{ marginLeft: 8 }}>
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
      render: (text: string) => <Tag color="blue">{text}</Tag>,
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
      title: '数据大小',
      dataIndex: 'size',
      key: 'size',
      render: (size: string) => <Text strong>{size}</Text>,
    },
    {
      title: '记录数',
      dataIndex: 'recordCount',
      key: 'recordCount',
      render: (count: number) => (
        <Text>{count >= 1000000 ? `${(count / 1000000).toFixed(1)}M` : count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count.toString()}</Text>
      ),
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
        const color = status === 'processed' ? 'green' : status === 'processing' ? 'orange' : status === 'uploaded' ? 'blue' : 'red';
        const text = status === 'processed' ? '已处理' : status === 'processing' ? '处理中' : status === 'uploaded' ? '已上传' : '错误';
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '上传时间',
      dataIndex: 'uploadDate',
      key: 'uploadDate',
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
          <Tooltip title="下载数据">
            <Button size="small" icon={<DownloadOutlined />} />
          </Tooltip>
          <Tooltip title="分享">
            <Button size="small" icon={<ShareAltOutlined />} />
          </Tooltip>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="edit" icon={<EditOutlined />}>
                  编辑信息
                </Menu.Item>
                <Menu.Item key="duplicate" icon={<CopyOutlined />}>
                  复制
                </Menu.Item>
                <Menu.Item key="move" icon={<SwapOutlined />}>
                  移动
                </Menu.Item>
                <Menu.Item key="delete" icon={<DeleteOutlined />} danger>
                  删除
                </Menu.Item>
              </Menu>
            }
          >
            <Button type="text" size="small" icon={<SettingOutlined />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  const getFileTypeIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'fastq':
        return <FileTextOutlined style={{ color: '#1890ff' }} />;
      case 'csv':
        return <FileExcelOutlined style={{ color: '#52c41a' }} />;
      case 'zip':
        return <FileZipOutlined style={{ color: '#722ed1' }} />;
      case 'fasta':
        return <FileTextOutlined style={{ color: '#fa8c16' }} />;
      case 'xlsx':
        return <FileExcelOutlined style={{ color: '#13c2c2' }} />;
      case 'json':
        return <FileTextOutlined style={{ color: '#eb2f96' }} />;
      default:
        return <FileUnknownOutlined style={{ color: '#999' }} />;
    }
  };

  const filteredData = rawData.filter(data =>
    data.name.toLowerCase().includes(searchText.toLowerCase()) &&
    (selectedCategory === 'all' || data.category === selectedCategory)
  );

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      {/* 页面标题 */}
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>
          <DatabaseOutlined style={{ marginRight: 8 }} />
          原始数据仓库
        </Title>
        <Paragraph style={{ color: '#666', marginBottom: 0 }}>
          管理和查看所有上传的原始数据文件，支持搜索、筛选和批量操作
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
          activeKey={activeTab} 
          onChange={setActiveTab}
          items={[
            {
              key: 'all',
              label: (
                <span>
                  <DatabaseOutlined />
                  全部数据
                </span>
              ),
              children: (
                <div>
                  {/* 搜索和筛选区域 */}
                  <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                    <Col xs={24} sm={12} md={8} lg={6}>
                      <Search
                        placeholder="搜索文件名、描述或上传者..."
                        allowClear
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        prefix={<SearchOutlined />}
                      />
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={4}>
                      <Select
                        placeholder="文件类型"
                        style={{ width: '100%' }}
                        value={selectedCategory}
                        onChange={setSelectedCategory}
                      >
                        <Option value="all">全部类型</Option>
                        <Option value="16S测序">16S测序</Option>
                        <Option value="宏基因组">宏基因组</Option>
                        <Option value="转录组">转录组</Option>
                      </Select>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={4}>
                      <Select
                        placeholder="状态"
                        style={{ width: '100%' }}
                        defaultValue="all"
                      >
                        <Option value="all">全部状态</Option>
                        <Option value="processed">已处理</Option>
                        <Option value="processing">处理中</Option>
                        <Option value="uploaded">已上传</Option>
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
                          onClick={() => setIsUploadModalVisible(true)}
                        >
                          上传数据
                        </Button>
                        <Button 
                          icon={<DownloadOutlined />}
                          disabled={selectedRowKeys.length === 0}
                        >
                          批量下载 ({selectedRowKeys.length})
                        </Button>
                        <Button 
                          icon={<DeleteOutlined />}
                          danger
                          disabled={selectedRowKeys.length === 0}
                        >
                          批量删除
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
                    rowSelection={{
                      selectedRowKeys,
                      onChange: (newSelectedRowKeys) => setSelectedRowKeys(newSelectedRowKeys),
                    }}
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
                    <Card title="文件类型分布" style={{ borderRadius: '12px' }}>
                      <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Text type="secondary">图表区域 - 文件类型饼图</Text>
                      </div>
                    </Card>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Card title="数据量趋势" style={{ borderRadius: '12px' }}>
                      <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Text type="secondary">图表区域 - 数据量趋势图</Text>
                      </div>
                    </Card>
                  </Col>
                </Row>
              )
            }
          ]}
        />
      </Card>

      <Modal
        title={
          <Space>
            <DatabaseOutlined />
            {selectedData?.name}
          </Space>
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        width={800}
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
              <Descriptions.Item label="数据大小">
                {selectedData.size}
              </Descriptions.Item>
              <Descriptions.Item label="记录数">
                {selectedData.recordCount >= 1000000 ? `${(selectedData.recordCount / 1000000).toFixed(1)}M` : selectedData.recordCount >= 1000 ? `${(selectedData.recordCount / 1000).toFixed(1)}K` : selectedData.recordCount.toString()}
              </Descriptions.Item>
              <Descriptions.Item label="数据格式">
                <Tag color="purple">{selectedData.format}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="压缩格式">
                {selectedData.compression}
              </Descriptions.Item>
              <Descriptions.Item label="校验和" span={2}>
                <Text code>{selectedData.checksum}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="存储位置" span={2}>
                <Text code>{selectedData.location}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="测序技术" span={2}>
                {selectedData.technology}
              </Descriptions.Item>
              <Descriptions.Item label="数据标签" span={2}>
                <Space wrap>
                  {selectedData.tags.map((tag: string) => (
                    <Tag key={tag} color="blue">{tag}</Tag>
                  ))}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="上传时间">
                {selectedData.uploadDate}
              </Descriptions.Item>
              <Descriptions.Item label="上传者">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar size="small" style={{ marginRight: 8 }}>
                    {selectedData.uploader.charAt(0)}
                  </Avatar>
                  {selectedData.uploader}
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="状态">
                <Tag color={selectedData.status === 'processed' ? 'green' : selectedData.status === 'processing' ? 'orange' : selectedData.status === 'uploaded' ? 'blue' : 'red'}>
                  {selectedData.status === 'processed' ? '已处理' : selectedData.status === 'processing' ? '处理中' : selectedData.status === 'uploaded' ? '已上传' : '错误'}
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
        )}
      </Modal>

      {/* 上传数据模态框 */}
      <Modal
        title="上传原始数据"
        open={isUploadModalVisible}
        onCancel={() => setIsUploadModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsUploadModalVisible(false)}>
            取消
          </Button>,
          <Button key="submit" type="primary">
            开始上传
          </Button>,
        ]}
        width={600}
      >
        <Form layout="vertical">
          <Form.Item label="数据名称" required>
            <Input placeholder="请输入数据名称" />
          </Form.Item>
          <Form.Item label="数据描述">
            <Input.TextArea rows={3} placeholder="请输入数据描述" />
          </Form.Item>
          <Form.Item label="数据分类" required>
            <Select placeholder="选择数据分类">
              <Option value="16S测序">16S测序</Option>
              <Option value="宏基因组">宏基因组</Option>
              <Option value="转录组">转录组</Option>
            </Select>
          </Form.Item>
          <Form.Item label="物种" required>
            <Select placeholder="选择物种">
              <Option value="人类">人类</Option>
              <Option value="犬">犬</Option>
              <Option value="猫">猫</Option>
            </Select>
          </Form.Item>
          <Form.Item label="数据标签">
            <Select mode="tags" placeholder="添加标签">
              <Option value="16S rRNA">16S rRNA</Option>
              <Option value="宏基因组">宏基因组</Option>
              <Option value="肠道菌群">肠道菌群</Option>
              <Option value="V3-V4">V3-V4</Option>
              <Option value="V4">V4</Option>
            </Select>
          </Form.Item>
          <Form.Item label="上传文件" required>
            <Upload.Dragger
              name="files"
              action="/api/upload"
              multiple
              accept=".fastq,.csv,.zip,.fasta,.xlsx,.json"
            >
              <p className="ant-upload-drag-icon">
                <CloudUploadOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
              <p className="ant-upload-hint">
                支持单个或批量上传，支持 FASTQ、CSV、ZIP、FASTA、XLSX、JSON 格式
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RawData; 