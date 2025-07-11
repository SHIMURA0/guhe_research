import React, { useState } from 'react';
import { 
    Breadcrumb, 
    Button, 
    Card, 
    Row, 
    Col, 
    Input, 
    Select, 
    Space, 
    Typography, 
    Tag, 
    Statistic, 
    Progress, 
    Tabs,
    Badge,
    Tooltip,
    Alert,
    Empty,
    Skeleton
} from 'antd';
import { 
    PlusOutlined, 
    SearchOutlined, 
    FilterOutlined,
    TeamOutlined,
    ExperimentOutlined,
    DatabaseOutlined,
    CalendarOutlined,
    TrophyOutlined,
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    ShareAltOutlined,
    DownloadOutlined,
    BarChartOutlined,
    PieChartOutlined,
    LineChartOutlined
} from '@ant-design/icons';

const { Search } = Input;
const { Title, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const ResearchProjects: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(false);

    const handleAddSubject = () => {
        console.log('新增课题');
        // 这里可以添加新增课题的逻辑
    };

    // 统计数据
    const statistics = [
        { title: '总项目数', value: 24, icon: <ExperimentOutlined />, color: '#1890ff' },
        { title: '进行中', value: 12, icon: <DatabaseOutlined />, color: '#52c41a' },
        { title: '已完成', value: 8, icon: <TrophyOutlined />, color: '#faad14' },
        { title: '参与人员', value: 45, icon: <TeamOutlined />, color: '#f5222d' }
    ];

    // 项目状态
    const projectStatuses = [
        { key: 'all', label: '全部', count: 24, color: 'blue' },
        { key: 'ongoing', label: '进行中', count: 12, color: 'green' },
        { key: 'completed', label: '已完成', count: 8, color: 'orange' },
        { key: 'planning', label: '规划中', count: 4, color: 'purple' }
    ];

    // 项目分类
    const projectCategories = [
        { key: 'all', label: '全部', count: 24 },
        { key: 'canine', label: '犬类研究', count: 8 },
        { key: 'feline', label: '猫类研究', count: 6 },
        { key: 'human', label: '人类研究', count: 5 },
        { key: 'agriculture', label: '农业应用', count: 3 },
        { key: 'environment', label: '环境监测', count: 2 }
    ];

    // 项目数据
    const projectsData = [
        {
            id: 1,
            title: '犬肾病微生物组',
            description: '慢性肾病肠道菌群研究',
            category: 'canine',
            categoryLabel: '犬类研究',
            status: 'ongoing',
            statusLabel: '进行中',
            statusColor: '#fbbf24',
            emoji: '🐕',
            sampleCount: 320,
            sequencingTech: '16S rRNA V3-V4',
            createDate: '2025-07-15',
            members: ['张', '王', '刘'],
            progress: 65,
            budget: 150000,
            spent: 98000
        },
        {
            id: 2,
            title: '猫肠道菌群与行为',
            description: '猫行为异常与肠道菌群关联性研究',
            category: 'feline',
            categoryLabel: '猫类研究',
            status: 'ongoing',
            statusLabel: '进行中',
            statusColor: '#fbbf24',
            emoji: '🐱',
            sampleCount: 180,
            sequencingTech: '16S rRNA V4',
            createDate: '2025-06-20',
            members: ['李', '陈', '赵'],
            progress: 45,
            budget: 120000,
            spent: 54000
        },
        {
            id: 3,
            title: '人类肠道菌群与免疫',
            description: '免疫系统疾病与肠道菌群关系研究',
            category: 'human',
            categoryLabel: '人类研究',
            status: 'completed',
            statusLabel: '已完成',
            statusColor: '#10b981',
            emoji: '👤',
            sampleCount: 500,
            sequencingTech: 'Shotgun Metagenomics',
            createDate: '2025-03-10',
            members: ['王', '张', '刘', '陈'],
            progress: 100,
            budget: 200000,
            spent: 200000
        },
        {
            id: 4,
            title: '农业土壤微生物组',
            description: '土壤健康与作物产量关系研究',
            category: 'agriculture',
            categoryLabel: '农业应用',
            status: 'planning',
            statusLabel: '规划中',
            statusColor: '#8b5cf6',
            emoji: '🌾',
            sampleCount: 0,
            sequencingTech: '16S rRNA V3-V4',
            createDate: '2025-08-01',
            members: ['赵', '孙'],
            progress: 0,
            budget: 80000,
            spent: 0
        },
        {
            id: 5,
            title: '宠物益生菌筛选',
            description: '宠物专用益生菌菌株筛选与验证',
            category: 'canine',
            categoryLabel: '犬类研究',
            status: 'ongoing',
            statusLabel: '进行中',
            statusColor: '#fbbf24',
            emoji: '🐕',
            sampleCount: 150,
            sequencingTech: 'Culture-based',
            createDate: '2025-05-15',
            members: ['李', '王', '张'],
            progress: 80,
            budget: 100000,
            spent: 80000
        },
        {
            id: 6,
            title: '环境微生物监测',
            description: '城市环境微生物多样性监测项目',
            category: 'environment',
            categoryLabel: '环境监测',
            status: 'ongoing',
            statusLabel: '进行中',
            statusColor: '#fbbf24',
            emoji: '🌍',
            sampleCount: 200,
            sequencingTech: '16S rRNA V4',
            createDate: '2025-04-20',
            members: ['陈', '刘', '赵'],
            progress: 30,
            budget: 90000,
            spent: 27000
        },
        {
            id: 7,
            title: '猫糖尿病菌群研究',
            description: '糖尿病猫肠道菌群变化规律研究',
            category: 'feline',
            categoryLabel: '猫类研究',
            status: 'completed',
            statusLabel: '已完成',
            statusColor: '#10b981',
            emoji: '🐱',
            sampleCount: 120,
            sequencingTech: '16S rRNA V3-V4',
            createDate: '2025-02-15',
            members: ['张', '李', '王'],
            progress: 100,
            budget: 110000,
            spent: 110000
        },
        {
            id: 8,
            title: '人类肥胖菌群干预',
            description: '肠道菌群干预对肥胖治疗效果研究',
            category: 'human',
            categoryLabel: '人类研究',
            status: 'ongoing',
            statusLabel: '进行中',
            statusColor: '#fbbf24',
            emoji: '👤',
            sampleCount: 300,
            sequencingTech: 'Shotgun Metagenomics',
            createDate: '2025-06-01',
            members: ['王', '陈', '赵', '刘'],
            progress: 55,
            budget: 180000,
            spent: 99000
        }
    ];

    // 定义不同项目的颜色方案
    const getProjectColors = (projectId: number, category: string) => {
        const colorSchemes = {
            canine: [
                'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // 蓝紫色
                'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', // 粉红色
            ],
            feline: [
                'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', // 蓝色
                'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', // 绿色
            ],
            human: [
                'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', // 橙红色
                'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', // 淡粉色
            ],
            agriculture: [
                'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', // 橙色
                'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', // 粉橙色
            ],
            environment: [
                'linear-gradient(135deg, #a8caba 0%, #5d4e75 100%)', // 绿色
                'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)', // 紫色
            ]
        };
        
        const categoryColors = colorSchemes[category as keyof typeof colorSchemes] || colorSchemes.canine;
        return categoryColors[projectId % categoryColors.length];
    };

    const renderProjectCard = (project: any) => (
        <div key={project.id} style={{
            aspectRatio: '1',
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            border: '1px solid #f3f4f6',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            padding: '8px' // 添加内间距
        }}
             onMouseEnter={(e) => {
                 e.currentTarget.style.transform = 'translateY(-4px)';
                 e.currentTarget.style.boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.1)';
             }}
             onMouseLeave={(e) => {
                 e.currentTarget.style.transform = 'translateY(0)';
                 e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
             }}
        >
            {/* 卡片头部 - 渐变背景区域 */}
            <div style={{
                height: '100px',
                padding: '16px',
                color: 'white',
                position: 'relative',
                background: getProjectColors(project.id, project.category),
                borderRadius: '12px 12px 0 0', // 添加圆角
            }}>
                {/* 顶部信息行 */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '8px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '20px' }}>{project.emoji}</span>
                        <span style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: 500
                        }}>
                            {project.categoryLabel}
                        </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <div style={{
                            width: '8px',
                            height: '8px',
                            backgroundColor: project.statusColor,
                            borderRadius: '50%'
                        }}></div>
                        <span style={{
                            backgroundColor: project.statusColor,
                            color: '#92400e',
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: 500
                        }}>
                            {project.statusLabel}
                        </span>
                    </div>
                </div>

                {/* 项目标题和描述 */}
                <h3 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    marginBottom: '6px',
                    margin: 0
                }}>
                    {project.title}
                </h3>
                <p style={{
                    fontSize: '12px',
                    opacity: 0.9,
                    margin: 0
                }}>
                    {project.description}
                </p>
            </div>

            <div style={{
                display: 'flex',
                gap: '12px',
                padding: '12px',
            }}>
                {/* 样本数容器 */}
                <div style={{
                    flex: 1,
                    backgroundColor: '#f5f5f5',
                    padding: '12px',
                    borderRadius: '8px',
                    textAlign: 'center'
                }}>
                    <div style={{
                        fontSize: '12px',
                        color: '#666',
                        marginBottom: '4px'
                    }}>
                        样本数
                    </div>
                    <div style={{
                        fontSize: '10px',
                        fontWeight: 'bold',
                        color: '#333'
                    }}>
                        {project.sampleCount}
                    </div>
                </div>

                {/* 测序技术容器 */}
                <div style={{
                    flex: 1,
                    backgroundColor: '#f5f5f5',
                    padding: '12px',
                    borderRadius: '8px',
                    textAlign: 'center'
                }}>
                    <div style={{
                        fontSize: '12px',
                        color: '#666',
                        marginBottom: '4px'
                    }}>
                        测序技术
                    </div>
                    <div style={{
                        fontSize: '10px',
                        fontWeight: 'bold',
                        color: '#333'
                    }}>
                        {project.sequencingTech}
                    </div>
                </div>
            </div>



            {/* 卡片内容区域 */}
            <div style={{ 
                padding: '16px',
                borderRadius: '0 0 12px 12px', // 添加底部圆角
                backgroundColor: 'white'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{
                        fontSize: '12px',
                        color: '#6b7280'
                    }}>
                        创建时间
                    </div>
                    <div style={{
                        fontSize: '12px',
                        fontWeight: 500
                    }}>
                        {project.createDate}
                    </div>
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '8px'
                }}>
                    <div style={{
                        fontSize: '12px',
                        color: '#6b7280'
                    }}>
                        参与人员
                    </div>
                    <div style={{
                        display: 'flex',
                        gap: '4px'
                    }}>
                        {project.members.map((member: string, index: number) => (
                            <div key={index} style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'][index % 4],
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '10px',
                                fontWeight: 500,
                                color: 'white'
                            }}>
                                {member}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div style={{ padding: '24px', background: '#ffffff', minHeight: '100vh' }}>
            {/* 页面标题和统计 */}
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                <Col span={16}>
                    <Title level={2} style={{ margin: 0 }}>
                        <ExperimentOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                        科研项目
                    </Title>
                    <Paragraph type="secondary">
                        管理微生物组学研究项目，跟踪项目进度和成果
                    </Paragraph>
                </Col>
                <Col span={8} style={{ textAlign: 'right' }}>
                    <Button type="primary" icon={<PlusOutlined />} size="large" onClick={handleAddSubject}>
                        新增项目
                    </Button>
                </Col>
            </Row>

            {/* 统计卡片 */}
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                {statistics.map((stat, index) => (
                    <Col xs={12} sm={6} key={index}>
                        <Card>
                            <Statistic
                                title={stat.title}
                                value={stat.value}
                                prefix={stat.icon}
                                valueStyle={{ color: stat.color }}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* 搜索和筛选区域 */}
            <Card style={{ marginBottom: '24px' }}>
                <Row gutter={[16, 16]} align="middle">
                    <Col xs={24} sm={12} md={8}>
                        <Search
                            placeholder="搜索项目名称、描述、成员..."
                            allowClear
                            enterButton={<SearchOutlined />}
                            size="large"
                            onSearch={setSearchText}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Select
                            placeholder="项目状态"
                            style={{ width: '100%' }}
                            size="large"
                            value={selectedStatus}
                            onChange={setSelectedStatus}
                        >
                            {projectStatuses.map(status => (
                                <Option key={status.key} value={status.key}>
                                    {status.label} ({status.count})
                                </Option>
                            ))}
                        </Select>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Select
                            placeholder="项目分类"
                            style={{ width: '100%' }}
                            size="large"
                            value={selectedCategory}
                            onChange={setSelectedCategory}
                        >
                            {projectCategories.map(category => (
                                <Option key={category.key} value={category.key}>
                                    {category.label} ({category.count})
                                </Option>
                            ))}
                        </Select>
                    </Col>
                    <Col xs={24} sm={12} md={4}>
                        <Button icon={<FilterOutlined />} size="large" style={{ width: '100%' }}>
                            高级筛选
                        </Button>
                    </Col>
                </Row>
            </Card>

            {/* 状态标签 */}
            <Card style={{ marginBottom: '24px' }}>
                <Space wrap>
                    {projectStatuses.map(status => (
                        <Tag 
                            key={status.key}
                            color={status.color}
                            style={{ 
                                padding: '8px 16px', 
                                fontSize: '14px',
                                cursor: 'pointer',
                                border: selectedStatus === status.key ? '2px solid' : '1px solid'
                            }}
                            onClick={() => setSelectedStatus(status.key)}
                        >
                            {status.label} ({status.count})
                        </Tag>
                    ))}
                </Space>
            </Card>

            {/* 内容区域 */}
            <Card>
                <Tabs defaultActiveKey="projects" size="large">
                    <TabPane tab="项目列表" key="projects">
                        {/* 项目卡片网格 */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                            gap: '24px'
                        }}>
                            {projectsData.map(project => renderProjectCard(project))}

                            {/* 添加新项目卡片 */}
                            <div style={{
                                aspectRatio: '1',
                                backgroundColor: 'white',
                                borderRadius: '16px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                overflow: 'hidden',
                                border: '1px solid #f3f4f6',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                                 onClick={handleAddSubject}
                                 onMouseEnter={(e) => {
                                     e.currentTarget.style.backgroundColor = '#f9fafb';
                                 }}
                                 onMouseLeave={(e) => {
                                     e.currentTarget.style.backgroundColor = 'white';
                                 }}
                            >
                                <div style={{ textAlign: 'center', color: '#9ca3af' }}>
                                    <PlusOutlined style={{ fontSize: '32px', marginBottom: '8px' }} />
                                    <div>添加新项目</div>
                                </div>
                            </div>
                        </div>
                    </TabPane>
                    
                    <TabPane tab="项目统计" key="statistics">
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Card title="项目进度分布">
                                    <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <PieChartOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                                    </div>
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card title="预算使用情况">
                                    <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <BarChartOutlined style={{ fontSize: '48px', color: '#52c41a' }} />
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </TabPane>
                    
                    <TabPane tab="时间线" key="timeline">
                        <Card title="项目时间线">
                            <div style={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <LineChartOutlined style={{ fontSize: '48px', color: '#faad14' }} />
                            </div>
                        </Card>
                    </TabPane>
                    
                    <TabPane tab="团队协作" key="collaboration">
                        <Alert
                            message="团队协作功能"
                            description="在这里可以查看团队成员的工作分配和协作情况。"
                            type="info"
                            showIcon
                            style={{ marginBottom: '16px' }}
                        />
                        <Empty 
                            description="暂无团队协作数据"
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    );
};

export default ResearchProjects; 