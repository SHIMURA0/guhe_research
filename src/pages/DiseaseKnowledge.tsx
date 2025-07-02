import React, { useState } from 'react';
import {
  Card,
  Tabs,
  Table,
  Tag,
  Space,
  Button,
  Input,
  Select,
  Row,
  Col,
  Typography,
  Divider,
  List,
  Avatar,
  Progress,
  Statistic,
  Collapse,
  Timeline,
  Alert,
  Badge,
  Tooltip,
  Modal,
  Descriptions,
  Image
} from 'antd';
import {
  SearchOutlined,
  BookOutlined,
  ExperimentOutlined,
  HeartOutlined,
  BugOutlined,
  DatabaseOutlined,
  FileTextOutlined,
  LinkOutlined,
  EyeOutlined,
  DownloadOutlined,
  ShareAltOutlined,
  StarOutlined,
  MedicineBoxOutlined,
  UserOutlined,
  ExperimentOutlined as DogOutlined,
  ExperimentOutlined as CatOutlined,
  ExperimentOutlined as MicroscopeOutlined,
  BarChartOutlined,
  GlobalOutlined,
  TeamOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;
const { Search } = Input;
const { Option } = Select;
const { Panel } = Collapse;

const DiseaseKnowledge: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDisease, setSelectedDisease] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 人类疾病数据
  const humanDiseases = [
    {
      id: 1,
      name: '炎症性肠病 (IBD)',
      category: '消化系统',
      severity: 'high',
      microbiome_impact: '显著',
      symptoms: ['腹痛', '腹泻', '体重减轻', '疲劳'],
      microbiome_mechanism: '肠道菌群失调导致免疫系统异常激活',
      treatments: ['益生菌治疗', '抗炎药物', '饮食调整'],
      research_count: 1250,
      risk_factors: ['遗传因素', '环境因素', '饮食因素'],
      publications: [
        { title: '肠道菌群与IBD发病机制研究', journal: 'Nature', year: 2023, impact: 9.2 },
        { title: '益生菌在IBD治疗中的应用', journal: 'Gut', year: 2023, impact: 8.5 }
      ]
    },
    {
      id: 2,
      name: '2型糖尿病',
      category: '代谢疾病',
      severity: 'high',
      microbiome_impact: '显著',
      symptoms: ['多饮', '多尿', '多食', '体重减轻'],
      microbiome_mechanism: '肠道菌群影响葡萄糖代谢和胰岛素敏感性',
      treatments: ['口服降糖药', '胰岛素', '饮食控制', '运动'],
      research_count: 2100,
      risk_factors: ['肥胖', '家族史', '缺乏运动'],
      publications: [
        { title: '肠道菌群与糖尿病关系研究', journal: 'Cell', year: 2023, impact: 9.8 },
        { title: '微生物组在糖尿病治疗中的潜力', journal: 'Science', year: 2023, impact: 9.1 }
      ]
    },
    {
      id: 3,
      name: '肥胖症',
      category: '代谢疾病',
      severity: 'medium',
      microbiome_impact: '显著',
      symptoms: ['体重增加', '呼吸困难', '关节疼痛'],
      microbiome_mechanism: '肠道菌群影响能量吸收和脂肪存储',
      treatments: ['饮食控制', '运动', '药物治疗', '手术'],
      research_count: 1800,
      risk_factors: ['高热量饮食', '缺乏运动', '遗传因素'],
      publications: [
        { title: '肠道菌群与肥胖的因果关系', journal: 'Nature Medicine', year: 2023, impact: 8.9 },
        { title: '微生物组移植在肥胖治疗中的应用', journal: 'Cell Metabolism', year: 2023, impact: 8.7 }
      ]
    },
    {
      id: 4,
      name: '自闭症谱系障碍',
      category: '神经系统',
      severity: 'medium',
      microbiome_impact: '中等',
      symptoms: ['社交障碍', '重复行为', '语言发育延迟'],
      microbiome_mechanism: '肠-脑轴异常影响神经发育',
      treatments: ['行为治疗', '药物治疗', '饮食干预'],
      research_count: 950,
      risk_factors: ['遗传因素', '环境因素', '孕期感染'],
      publications: [
        { title: '肠-脑轴在自闭症中的作用', journal: 'Nature Neuroscience', year: 2023, impact: 8.6 },
        { title: '益生菌在自闭症治疗中的研究', journal: 'Molecular Psychiatry', year: 2023, impact: 8.2 }
      ]
    },
    {
      id: 5,
      name: '抑郁症',
      category: '精神疾病',
      severity: 'high',
      microbiome_impact: '中等',
      symptoms: ['情绪低落', '兴趣丧失', '睡眠障碍', '食欲改变'],
      microbiome_mechanism: '肠道菌群通过神经递质影响情绪',
      treatments: ['抗抑郁药', '心理治疗', '运动', '饮食调整'],
      research_count: 1600,
      risk_factors: ['遗传因素', '生活压力', '慢性疾病'],
      publications: [
        { title: '肠道菌群与抑郁症的关联研究', journal: 'Nature Mental Health', year: 2023, impact: 8.4 },
        { title: '微生物组在精神健康中的作用', journal: 'Biological Psychiatry', year: 2023, impact: 8.1 }
      ]
    }
  ];

  // 宠物疾病数据
  const petDiseases = [
    {
      id: 1,
      name: '犬类炎症性肠病',
      category: '消化系统',
      species: '犬',
      severity: 'high',
      microbiome_impact: '显著',
      symptoms: ['呕吐', '腹泻', '食欲不振', '体重减轻'],
      microbiome_mechanism: '肠道菌群失调导致慢性炎症',
      treatments: ['益生菌', '抗炎药物', '特殊饮食'],
      research_count: 320,
      risk_factors: ['品种易感性', '饮食因素', '环境压力'],
      publications: [
        { title: '犬类肠道菌群与IBD关系', journal: 'Veterinary Microbiology', year: 2023, impact: 7.8 },
        { title: '益生菌在犬类IBD治疗中的应用', journal: 'Journal of Veterinary Medicine', year: 2023, impact: 7.2 }
      ]
    },
    {
      id: 2,
      name: '猫类糖尿病',
      category: '代谢疾病',
      species: '猫',
      severity: 'high',
      microbiome_impact: '中等',
      symptoms: ['多饮', '多尿', '体重减轻', '食欲增加'],
      microbiome_mechanism: '肠道菌群影响葡萄糖代谢',
      treatments: ['胰岛素', '饮食控制', '运动'],
      research_count: 280,
      risk_factors: ['肥胖', '年龄', '品种'],
      publications: [
        { title: '猫类肠道菌群与糖尿病', journal: 'Feline Medicine', year: 2023, impact: 7.5 },
        { title: '微生物组在猫类健康中的作用', journal: 'Veterinary Research', year: 2023, impact: 7.1 }
      ]
    },
    {
      id: 3,
      name: '宠物过敏性疾病',
      category: '免疫系统',
      species: '犬/猫',
      severity: 'medium',
      microbiome_impact: '显著',
      symptoms: ['皮肤瘙痒', '皮疹', '打喷嚏', '流泪'],
      microbiome_mechanism: '肠道菌群影响免疫系统发育',
      treatments: ['抗组胺药', '免疫调节剂', '益生菌'],
      research_count: 450,
      risk_factors: ['遗传因素', '环境过敏原', '饮食'],
      publications: [
        { title: '宠物肠道菌群与过敏关系', journal: 'Veterinary Immunology', year: 2023, impact: 7.6 },
        { title: '益生菌在宠物过敏治疗中的应用', journal: 'Animal Health Research', year: 2023, impact: 7.3 }
      ]
    }
  ];

  // 肠道菌群相关研究数据
  const microbiomeResearch = [
    {
      id: 1,
      title: '肠道菌群与疾病发病机制',
      category: '机制研究',
      diseases: ['IBD', '糖尿病', '肥胖'],
      species: ['人类', '犬', '猫'],
      research_areas: ['免疫调节', '代谢调控', '神经调节'],
      publications: 125,
      impact_factor: 8.9,
      key_findings: [
        '肠道菌群通过短链脂肪酸影响免疫系统',
        '微生物代谢产物调节宿主代谢',
        '肠-脑轴在疾病中的作用机制'
      ]
    },
    {
      id: 2,
      title: '益生菌治疗研究',
      category: '治疗研究',
      diseases: ['IBD', '过敏', '腹泻'],
      species: ['人类', '犬', '猫'],
      research_areas: ['菌株筛选', '剂量优化', '安全性评估'],
      publications: 89,
      impact_factor: 7.8,
      key_findings: [
        '特定菌株对特定疾病的有效性',
        '益生菌与抗生素的协同作用',
        '个性化益生菌治疗方案'
      ]
    },
    {
      id: 3,
      title: '微生物组移植研究',
      category: '治疗研究',
      diseases: ['艰难梭菌感染', 'IBD', '肥胖'],
      species: ['人类', '犬'],
      research_areas: ['供体筛选', '移植方法', '长期效果'],
      publications: 67,
      impact_factor: 8.2,
      key_findings: [
        'FMT在艰难梭菌感染中的高治愈率',
        '微生物组移植的安全性评估',
        '移植后菌群定植的动态变化'
      ]
    }
  ];

  const columns = [
    {
      title: '疾病名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Button 
          type="link" 
          onClick={() => {
            setSelectedDisease(record);
            setIsModalVisible(true);
          }}
          style={{ padding: 0, height: 'auto' }}
        >
          {text}
        </Button>
      ),
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: '严重程度',
      dataIndex: 'severity',
      key: 'severity',
      render: (text: string) => {
        const color = text === 'high' ? 'red' : text === 'medium' ? 'orange' : 'green';
        const label = text === 'high' ? '高' : text === 'medium' ? '中' : '低';
        return <Tag color={color}>{label}</Tag>;
      },
    },
    {
      title: '菌群影响',
      dataIndex: 'microbiome_impact',
      key: 'microbiome_impact',
      render: (text: string) => <Tag color="purple">{text}</Tag>,
    },
    {
      title: '研究数量',
      dataIndex: 'research_count',
      key: 'research_count',
      render: (count: number) => (
        <Badge count={count} style={{ backgroundColor: '#52c41a' }} />
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size="middle">
          <Tooltip title="查看详情">
            <Button 
              type="primary" 
              size="small" 
              icon={<EyeOutlined />}
              onClick={() => {
                setSelectedDisease(record);
                setIsModalVisible(true);
              }}
            />
          </Tooltip>
          <Tooltip title="相关文献">
            <Button size="small" icon={<BookOutlined />} />
          </Tooltip>
          <Tooltip title="研究数据">
            <Button size="small" icon={<DatabaseOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const petColumns = [
    ...columns.slice(0, 1),
    {
      title: '物种',
      dataIndex: 'species',
      key: 'species',
      render: (text: string) => {
        const icon = text === '犬' ? <DogOutlined /> : text === '猫' ? <CatOutlined /> : <UserOutlined />;
        return <Tag icon={icon} color="green">{text}</Tag>;
      },
    },
    ...columns.slice(1)
  ];

  const researchColumns = [
    {
      title: '研究主题',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: '研究类别',
      dataIndex: 'category',
      key: 'category',
      render: (text: string) => <Tag color="cyan">{text}</Tag>,
    },
    {
      title: '涉及疾病',
      dataIndex: 'diseases',
      key: 'diseases',
      render: (diseases: string[]) => (
        <Space>
          {diseases.map(disease => (
            <Tag key={disease} color="blue">{disease}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: '涉及物种',
      dataIndex: 'species',
      key: 'species',
      render: (species: string[]) => (
        <Space>
          {species.map(s => (
            <Tag key={s} color="green">{s}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: '影响因子',
      dataIndex: 'impact_factor',
      key: 'impact_factor',
      render: (factor: number) => (
        <Badge count={factor.toFixed(1)} style={{ backgroundColor: '#1890ff' }} />
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button type="primary" size="small" icon={<EyeOutlined />} />
          <Button size="small" icon={<DownloadOutlined />} />
          <Button size="small" icon={<ShareAltOutlined />} />
        </Space>
      ),
    },
  ];

  const filteredHumanDiseases = humanDiseases.filter(disease =>
    disease.name.toLowerCase().includes(searchText.toLowerCase()) &&
    (selectedCategory === 'all' || disease.category === selectedCategory)
  );

  const filteredPetDiseases = petDiseases.filter(disease =>
    disease.name.toLowerCase().includes(searchText.toLowerCase()) &&
    (selectedCategory === 'all' || disease.category === selectedCategory)
  );

  return (
    <div style={{ padding: '24px' }}>
      {/* 页面标题和统计信息 */}
      <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
        <Col span={24}>
          <Title level={2}>
            <MedicineBoxOutlined style={{ marginRight: 8 }} />
            疾病知识库
          </Title>
          <Paragraph>
            全面的疾病数据库，涵盖人类和宠物疾病，重点关注与肠道菌群的关系机制
          </Paragraph>
        </Col>
      </Row>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总疾病数"
              value={humanDiseases.length + petDiseases.length}
              prefix={<MedicineBoxOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="人类疾病"
              value={humanDiseases.length}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="宠物疾病"
              value={petDiseases.length}
              prefix={<DogOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="相关研究"
              value={microbiomeResearch.reduce((sum, r) => sum + r.publications, 0)}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 搜索和筛选 */}
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col span={8}>
            <Search
              placeholder="搜索疾病名称..."
              allowClear
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              prefix={<SearchOutlined />}
            />
          </Col>
          <Col span={6}>
            <Select
              placeholder="选择疾病分类"
              style={{ width: '100%' }}
              value={selectedCategory}
              onChange={setSelectedCategory}
            >
              <Option value="all">全部分类</Option>
              <Option value="消化系统">消化系统</Option>
              <Option value="代谢疾病">代谢疾病</Option>
              <Option value="神经系统">神经系统</Option>
              <Option value="精神疾病">精神疾病</Option>
              <Option value="免疫系统">免疫系统</Option>
            </Select>
          </Col>
          <Col span={10}>
            <Space>
              <Button type="primary" icon={<DownloadOutlined />}>
                导出数据
              </Button>
              <Button icon={<ShareAltOutlined />}>
                分享
              </Button>
              <Button icon={<StarOutlined />}>
                收藏
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* 主要内容区域 */}
      <Tabs defaultActiveKey="1" size="large">
        <TabPane
          tab={
            <span>
              <UserOutlined />
              人类疾病
            </span>
          }
          key="1"
        >
          <Card>
            <Table
              columns={columns}
              dataSource={filteredHumanDiseases}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
              }}
            />
          </Card>
        </TabPane>

        <TabPane
          tab={
            <span>
              <DogOutlined />
              宠物疾病
            </span>
          }
          key="2"
        >
          <Card>
            <Table
              columns={petColumns}
              dataSource={filteredPetDiseases}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
              }}
            />
          </Card>
        </TabPane>

        <TabPane
          tab={
            <span>
              <MicroscopeOutlined />
              菌群研究
            </span>
          }
          key="3"
        >
          <Card>
            <Table
              columns={researchColumns}
              dataSource={microbiomeResearch}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
              }}
            />
          </Card>
        </TabPane>

        <TabPane
          tab={
            <span>
              <BarChartOutlined />
              研究趋势
            </span>
          }
          key="4"
        >
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <Card title="疾病分类分布" extra={<GlobalOutlined />}>
                <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text type="secondary">图表区域 - 疾病分类饼图</Text>
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="研究趋势分析" extra={<TeamOutlined />}>
                <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text type="secondary">图表区域 - 研究数量趋势图</Text>
                </div>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>

      {/* 疾病详情模态框 */}
      <Modal
        title={
          <Space>
            <MedicineBoxOutlined />
            {selectedDisease?.name}
          </Space>
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        width={800}
        footer={[
          <Button key="back" onClick={() => setIsModalVisible(false)}>
            关闭
          </Button>,
          <Button key="literature" type="primary" icon={<BookOutlined />}>
            查看文献
          </Button>,
        ]}
      >
        {selectedDisease && (
          <div>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="疾病分类" span={2}>
                <Tag color="blue">{selectedDisease.category}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="严重程度">
                <Tag color={selectedDisease.severity === 'high' ? 'red' : 'orange'}>
                  {selectedDisease.severity === 'high' ? '高' : '中'}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="菌群影响">
                <Tag color="purple">{selectedDisease.microbiome_impact}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="主要症状" span={2}>
                <Space wrap>
                  {selectedDisease.symptoms.map((symptom: string) => (
                    <Tag key={symptom} color="orange">{symptom}</Tag>
                  ))}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="风险因素" span={2}>
                <Space wrap>
                  {selectedDisease.risk_factors.map((factor: string) => (
                    <Tag key={factor} color="red">{factor}</Tag>
                  ))}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="治疗方法" span={2}>
                <Space wrap>
                  {selectedDisease.treatments.map((treatment: string) => (
                    <Tag key={treatment} color="green">{treatment}</Tag>
                  ))}
                </Space>
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Title level={4}>
              <BugOutlined style={{ marginRight: 8 }} />
              与肠道菌群的作用机制
            </Title>
            <Paragraph>
              {selectedDisease.microbiome_mechanism}
            </Paragraph>

            <Divider />

            <Title level={4}>
              <BookOutlined style={{ marginRight: 8 }} />
              相关文献
            </Title>
            <List
              dataSource={selectedDisease.publications}
              renderItem={(item: any) => (
                <List.Item
                  actions={[
                    <Button type="link" icon={<LinkOutlined />}>查看</Button>,
                    <Button type="link" icon={<DownloadOutlined />}>下载</Button>
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <Space>
                        <Text strong>{item.title}</Text>
                        <Badge count={`IF: ${item.impact}`} style={{ backgroundColor: '#52c41a' }} />
                      </Space>
                    }
                    description={
                      <Space>
                        <Text type="secondary">{item.journal}</Text>
                        <Text type="secondary">{item.year}</Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DiseaseKnowledge; 