import React, { useState } from 'react';
import { 
    Card, 
    Row, 
    Col, 
    Statistic, 
    Progress, 
    Table, 
    Tag, 
    Button, 
    Avatar, 
    List, 
    Timeline, 
    Badge, 
    Tooltip, 
    Space, 
    Typography, 
    Divider, 
    Alert,
    Calendar,
    Modal,
    Form,
    Input,
    Select,
    DatePicker,
    Upload,
    message,
    Tabs
} from 'antd';
import { 
    UserOutlined, 
    ExperimentOutlined, 
    DatabaseOutlined, 
    BookOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    PlusOutlined,
    UploadOutlined,
    TeamOutlined,
    FileTextOutlined,
    BarChartOutlined,
    CalendarOutlined,
    BellOutlined,
    SettingOutlined,
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    ShareAltOutlined,
    DownloadOutlined,
    StarOutlined,
    HeartOutlined,
    TrophyOutlined,
    FireOutlined,
    RocketOutlined,
    ThunderboltOutlined,
    CrownOutlined,
    GlobalOutlined,
    SafetyOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const Workbench: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    // 统计数据
    const statistics = [
        { 
            title: '总项目数', 
            value: 12, 
            icon: <ExperimentOutlined />, 
            color: '#1890ff',
            trend: '+15%',
            trendUp: true,
            subtitle: '较上月增长'
        },
        { 
            title: '进行中项目', 
            value: 6, 
            icon: <RocketOutlined />, 
            color: '#52c41a',
            trend: '+8%',
            trendUp: true,
            subtitle: '活跃项目'
        },
        { 
            title: '已完成项目', 
            value: 4, 
            icon: <TrophyOutlined />, 
            color: '#722ed1',
            trend: '+12%',
            trendUp: true,
            subtitle: '成功交付'
        },
        { 
            title: '文献数量', 
            value: 234, 
            icon: <BookOutlined />, 
            color: '#fa8c16',
            trend: '+23%',
            trendUp: true,
            subtitle: '知识积累'
        },
        { 
            title: '团队成员', 
            value: 18, 
            icon: <TeamOutlined />, 
            color: '#13c2c2',
            trend: '+2',
            trendUp: true,
            subtitle: '协作人员'
        },
        { 
            title: '数据样本', 
            value: 2847, 
            icon: <DatabaseOutlined />, 
            color: '#eb2f96',
            trend: '+156',
            trendUp: true,
            subtitle: '样本总数'
        }
    ];

    // 项目进度数据
    const projectProgress = [
        { 
            name: '犬肾病微生物组研究', 
            progress: 85, 
            status: '进行中',
            team: ['张研究员', '王助理', '李博士'],
            deadline: '2025-03-15',
            priority: 'high',
            samples: 320,
            technology: '16S rRNA V3-V4'
        },
        { 
            name: '犬腹泻微生物组分析', 
            progress: 65, 
            status: '进行中',
            team: ['刘研究员', '陈助理'],
            deadline: '2025-02-28',
            priority: 'medium',
            samples: 280,
            technology: '宏基因组测序'
        },
        { 
            name: '犬癫痫微生物组研究', 
            progress: 45, 
            status: '进行中',
            team: ['赵博士', '孙研究员'],
            deadline: '2025-04-20',
            priority: 'high',
            samples: 200,
            technology: '16S rRNA V3-V4'
        },
        { 
            name: '犬甲减微生物组分析', 
            progress: 25, 
            status: '筹备中',
            team: ['周研究员'],
            deadline: '2025-05-10',
            priority: 'medium',
            samples: 160,
            technology: '16S rRNA V4'
        }
    ];

    // 最近活动数据
    const recentActivities = [
        { 
            key: '1', 
            time: '2025-01-15 14:30', 
            action: '创建新项目', 
            project: '犬痴呆微生物组研究', 
            user: '张研究员',
            avatar: '张',
            type: 'create',
            description: '启动了新的神经退化疾病研究项目'
        },
        { 
            key: '2', 
            time: '2025-01-15 13:45', 
            action: '上传数据', 
            project: '犬肾病微生物组', 
            user: '王助理',
            avatar: '王',
            type: 'upload',
            description: '上传了320个样本的测序数据'
        },
        { 
            key: '3', 
            time: '2025-01-15 12:20', 
            action: '完成分析', 
            project: '宠物年龄微生物组', 
            user: '李博士',
            avatar: '李',
            type: 'complete',
            description: '完成了年龄相关菌群变化分析'
        },
        { 
            key: '4', 
            time: '2025-01-15 11:15', 
            action: '添加文献', 
            project: '犬IBD微生物组', 
            user: '刘研究员',
            avatar: '刘',
            type: 'literature',
            description: '添加了5篇相关研究文献'
        },
        { 
            key: '5', 
            time: '2025-01-15 10:30', 
            action: '团队会议', 
            project: '项目讨论', 
            user: '全体成员',
            avatar: '团',
            type: 'meeting',
            description: '召开了本周项目进展讨论会'
        }
    ];

    // 团队成员数据
    const teamMembers = [
        { name: '张研究员', role: '首席研究员', avatar: '张', status: 'online', projects: 3 },
        { name: '王助理', role: '研究助理', avatar: '王', status: 'online', projects: 2 },
        { name: '李博士', role: '博士后', avatar: '李', status: 'away', projects: 2 },
        { name: '刘研究员', role: '副研究员', avatar: '刘', status: 'online', projects: 1 },
        { name: '陈助理', role: '研究助理', avatar: '陈', status: 'offline', projects: 1 }
    ];

    // 快速操作
    const quickActions = [
        { title: '新建项目', icon: <PlusOutlined />, color: '#1890ff', action: () => setIsModalVisible(true) },
        { title: '上传数据', icon: <UploadOutlined />, color: '#52c41a', action: () => message.info('上传数据功能') },
        { title: '添加文献', icon: <FileTextOutlined />, color: '#722ed1', action: () => message.info('添加文献功能') },
        { title: '团队管理', icon: <TeamOutlined />, color: '#fa8c16', action: () => message.info('团队管理功能') },
        { title: '数据分析', icon: <BarChartOutlined />, color: '#13c2c2', action: () => message.info('数据分析功能') },
        { title: '项目报告', icon: <BookOutlined />, color: '#eb2f96', action: () => message.info('项目报告功能') }
    ];

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'create': return <PlusOutlined style={{ color: '#52c41a' }} />;
            case 'upload': return <UploadOutlined style={{ color: '#1890ff' }} />;
            case 'complete': return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
            case 'literature': return <BookOutlined style={{ color: '#722ed1' }} />;
            case 'meeting': return <TeamOutlined style={{ color: '#fa8c16' }} />;
            default: return <ExclamationCircleOutlined style={{ color: '#fa8c16' }} />;
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'red';
            case 'medium': return 'orange';
            case 'low': return 'green';
            default: return 'blue';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case '进行中': return 'processing';
            case '已完成': return 'success';
            case '筹备中': return 'warning';
            case '暂停': return 'error';
            default: return 'default';
        }
    };

    return (
        <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
            {/* 欢迎区域 */}
            <div style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '16px',
                padding: '32px',
                marginBottom: '24px',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'relative', zIndex: 2 }}>
                    <Title level={2} style={{ color: 'white', marginBottom: '8px' }}>
                        欢迎回来，张研究员！ 👋
                    </Title>
                    <Paragraph style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', marginBottom: '24px' }}>
                        今天是 2025年1月15日，您有 3 个进行中的项目需要关注
                    </Paragraph>
                    <Space size="middle">
                        <Button type="primary" size="large" icon={<PlusOutlined />} ghost>
                            创建新项目
                        </Button>
                        <Button size="large" icon={<BarChartOutlined />} ghost>
                            查看报告
                        </Button>
                    </Space>
                </div>
                <div style={{
                    position: 'absolute',
                    right: '-50px',
                    top: '-50px',
                    width: '200px',
                    height: '200px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    zIndex: 1
                }}></div>
                <div style={{
                    position: 'absolute',
                    right: '50px',
                    bottom: '-30px',
                    width: '150px',
                    height: '150px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '50%',
                    zIndex: 1
                }}></div>
            </div>

            {/* 统计卡片 */}
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                {statistics.map((stat, index) => (
                    <Col xs={24} sm={12} lg={8} xl={4} key={index}>
                        <Card 
                            hoverable 
                            style={{ 
                                borderRadius: '12px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                border: 'none'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div>
                                    <Statistic
                                        title={
                                            <Text style={{ fontSize: '14px', color: '#666' }}>
                                                {stat.title}
                                            </Text>
                                        }
                                        value={stat.value}
                                        prefix={stat.icon}
                                        valueStyle={{ 
                                            color: stat.color, 
                                            fontSize: '24px',
                                            fontWeight: 'bold'
                                        }}
                                    />
                                    <div style={{ marginTop: '8px' }}>
                                        <Text style={{ fontSize: '12px', color: '#999' }}>
                                            {stat.subtitle}
                                        </Text>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ 
                                        color: stat.trendUp ? '#52c41a' : '#ff4d4f',
                                        fontSize: '12px',
                                        fontWeight: 'bold'
                                    }}>
                                        {stat.trend}
                                    </div>
                                    {stat.trendUp ? 
                                        <ArrowUpOutlined style={{ color: '#52c41a' }} /> : 
                                        <ArrowDownOutlined style={{ color: '#ff4d4f' }} />
                                    }
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* 主要内容区域 */}
            <Tabs 
                activeKey={activeTab} 
                onChange={setActiveTab}
                style={{ background: 'white', borderRadius: '12px', padding: '24px' }}
                items={[
                    {
                        key: 'overview',
                        label: (
                            <span>
                                <BarChartOutlined />
                                概览
                            </span>
                        ),
                        children: (
                            <Row gutter={[24, 24]}>
                                {/* 项目进度 */}
                                <Col xs={24} lg={16}>
                                    <Card 
                                        title={
                                            <span>
                                                <RocketOutlined style={{ marginRight: 8 }} />
                                                项目进度概览
                                            </span>
                                        }
                                        extra={
                                            <Button type="link" icon={<EyeOutlined />}>
                                                查看全部
                                            </Button>
                                        }
                                        style={{ borderRadius: '12px' }}
                                    >
                                        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                            {projectProgress.map((project, index) => (
                                                <div key={index} style={{ marginBottom: '24px' }}>
                                                    <div style={{ 
                                                        display: 'flex', 
                                                        justifyContent: 'space-between', 
                                                        alignItems: 'center',
                                                        marginBottom: '12px'
                                                    }}>
                                                        <div>
                                                            <Text strong style={{ fontSize: '16px' }}>
                                                                {project.name}
                                                            </Text>
                                                            <div style={{ marginTop: '4px' }}>
                                                                <Tag color={getPriorityColor(project.priority)}>
                                                                    {project.priority === 'high' ? '高优先级' : 
                                                                     project.priority === 'medium' ? '中优先级' : '低优先级'}
                                                                </Tag>
                                                                <Tag color={getStatusColor(project.status)}>
                                                                    {project.status}
                                                                </Tag>
                                                            </div>
                                                        </div>
                                                        <div style={{ textAlign: 'right' }}>
                                                            <Text strong style={{ fontSize: '18px', color: '#1890ff' }}>
                                                                {project.progress}%
                                                            </Text>
                                                            <div style={{ fontSize: '12px', color: '#999' }}>
                                                                截止: {project.deadline}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Progress 
                                                        percent={project.progress} 
                                                        strokeColor={{
                                                            '0%': '#108ee9',
                                                            '100%': '#87d068',
                                                        }}
                                                        strokeWidth={8}
                                                        showInfo={false}
                                                    />
                                                    <div style={{ 
                                                        display: 'flex', 
                                                        justifyContent: 'space-between',
                                                        marginTop: '8px',
                                                        fontSize: '12px',
                                                        color: '#666'
                                                    }}>
                                                        <span>样本数: {project.samples}</span>
                                                        <span>技术: {project.technology}</span>
                                                        <span>团队: {project.team.length}人</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>
                                </Col>

                                {/* 快速操作和团队 */}
                                <Col xs={24} lg={8}>
                                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                                        {/* 快速操作 */}
                                        <Card 
                                            title={
                                                <span>
                                                    <ThunderboltOutlined style={{ marginRight: 8 }} />
                                                    快速操作
                                                </span>
                                            }
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <div style={{ 
                                                display: 'grid', 
                                                gridTemplateColumns: 'repeat(2, 1fr)', 
                                                gap: '12px' 
                                            }}>
                                                {quickActions.map((action, index) => (
                                                    <Card 
                                                        key={index}
                                                        size="small" 
                                                        hoverable 
                                                        style={{ 
                                                            textAlign: 'center',
                                                            borderRadius: '8px',
                                                            cursor: 'pointer'
                                                        }}
                                                        onClick={action.action}
                                                    >
                                                        <div style={{ 
                                                            fontSize: '24px', 
                                                            color: action.color, 
                                                            marginBottom: '8px' 
                                                        }}>
                                                            {action.icon}
                                                        </div>
                                                        <div style={{ fontSize: '12px', fontWeight: '500' }}>
                                                            {action.title}
                                                        </div>
                                                    </Card>
                                                ))}
                                            </div>
                                        </Card>

                                        {/* 团队成员 */}
                                        <Card 
                                            title={
                                                <span>
                                                    <TeamOutlined style={{ marginRight: 8 }} />
                                                    团队成员
                                                </span>
                                            }
                                            extra={
                                                <Button type="link" size="small">
                                                    管理
                                                </Button>
                                            }
                                            style={{ borderRadius: '12px' }}
                                        >
                                            <List
                                                dataSource={teamMembers}
                                                renderItem={(member) => (
                                                    <List.Item style={{ padding: '8px 0' }}>
                                                        <List.Item.Meta
                                                            avatar={
                                                                <Badge 
                                                                    status={member.status as any} 
                                                                    dot
                                                                >
                                                                    <Avatar size="small">
                                                                        {member.avatar}
                                                                    </Avatar>
                                                                </Badge>
                                                            }
                                                                                                                         title={
                                                                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                     <Text strong>{member.name}</Text>
                                                                     <Tag>{member.projects}个项目</Tag>
                                                                 </div>
                                                             }
                                                            description={member.role}
                                                        />
                                                    </List.Item>
                                                )}
                                            />
                                        </Card>
                                    </Space>
                                </Col>
                            </Row>
                        )
                    },
                    {
                        key: 'activities',
                        label: (
                            <span>
                                <BellOutlined />
                                活动记录
                            </span>
                        ),
                        children: (
                            <Card style={{ borderRadius: '12px' }}>
                                <Timeline>
                                    {recentActivities.map((activity) => (
                                        <Timeline.Item 
                                            key={activity.key}
                                            dot={getActivityIcon(activity.type)}
                                        >
                                            <div style={{ marginBottom: '8px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Text strong>{activity.action}</Text>
                                                    <Text type="secondary" style={{ fontSize: '12px' }}>
                                                        {activity.time}
                                                    </Text>
                                                </div>
                                                <div style={{ marginTop: '4px' }}>
                                                    <Text>{activity.description}</Text>
                                                </div>
                                                <div style={{ marginTop: '4px' }}>
                                                    <Tag color="blue">{activity.project}</Tag>
                                                    <Tag icon={<UserOutlined />}>{activity.user}</Tag>
                                                </div>
                                            </div>
                                        </Timeline.Item>
                                    ))}
                                </Timeline>
                            </Card>
                        )
                    },
                    {
                        key: 'calendar',
                        label: (
                            <span>
                                <CalendarOutlined />
                                日程安排
                            </span>
                        ),
                        children: (
                            <Card style={{ borderRadius: '12px' }}>
                                <Calendar 
                                    fullscreen={false}
                                    headerRender={({ value, onChange }) => {
                                        return (
                                            <div style={{ padding: '8px 0' }}>
                                                <Button.Group>
                                                    <Button size="small" onClick={() => onChange(value.clone().subtract(1, 'month'))}>
                                                        上个月
                                                    </Button>
                                                    <Button size="small" onClick={() => onChange(value.clone().add(1, 'month'))}>
                                                        下个月
                                                    </Button>
                                                </Button.Group>
                                            </div>
                                        );
                                    }}
                                />
                            </Card>
                        )
                    }
                ]}
            />

            {/* 创建项目模态框 */}
            <Modal
                title="创建新项目"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsModalVisible(false)}>
                        取消
                    </Button>,
                    <Button key="submit" type="primary">
                        创建项目
                    </Button>,
                ]}
                width={600}
            >
                <Form layout="vertical">
                    <Form.Item label="项目名称" required>
                        <Input placeholder="请输入项目名称" />
                    </Form.Item>
                    <Form.Item label="项目描述">
                        <Input.TextArea rows={3} placeholder="请输入项目描述" />
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="项目类型" required>
                                <Select placeholder="选择项目类型">
                                    <Option value="research">研究项目</Option>
                                    <Option value="analysis">数据分析</Option>
                                    <Option value="review">文献综述</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="优先级" required>
                                <Select placeholder="选择优先级">
                                    <Option value="high">高</Option>
                                    <Option value="medium">中</Option>
                                    <Option value="low">低</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="开始日期" required>
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="结束日期" required>
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="团队成员">
                        <Select mode="multiple" placeholder="选择团队成员">
                            <Option value="zhang">张研究员</Option>
                            <Option value="wang">王助理</Option>
                            <Option value="li">李博士</Option>
                            <Option value="liu">刘研究员</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Workbench; 