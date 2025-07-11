import React, { useState } from 'react';
import { 
    Card, 
    Row, 
    Col, 
    Input, 
    Button, 
    Tag, 
    List, 
    Avatar, 
    Statistic, 
    Select, 
    Space, 
    Divider, 
    Typography, 
    Tooltip, 
    Badge, 
    Progress, 
    Table, 
    Modal, 
    Form, 
    DatePicker, 
    Upload,
    Tabs,
    Tree,
    Timeline,
    Collapse,
    Alert,
    Empty,
    Skeleton
} from 'antd';
import { 
    SearchOutlined, 
    PlusOutlined, 
    BookOutlined, 
    DatabaseOutlined,
    ExperimentOutlined,
    TeamOutlined,
    EyeOutlined,
    LikeOutlined,
    ShareAltOutlined,
    EditOutlined,
    DeleteOutlined,
    DownloadOutlined,
    FilterOutlined,
    ReloadOutlined,
    StarOutlined,
    FileTextOutlined,
    LinkOutlined,
    BarChartOutlined,
    NodeIndexOutlined,
    BranchesOutlined
} from '@ant-design/icons';

const { Search } = Input;
const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const { Panel } = Collapse;

const MicrobiomeKnowledge: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [viewMode, setViewMode] = useState<'list' | 'card' | 'table'>('card');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    // 统计数据
    const statistics = [
        { title: '知识条目', value: 1247, icon: <BookOutlined />, color: '#1890ff' },
        { title: '研究领域', value: 23, icon: <DatabaseOutlined />, color: '#52c41a' },
        { title: '活跃用户', value: 89, icon: <TeamOutlined />, color: '#faad14' },
        { title: '本月新增', value: 156, icon: <PlusOutlined />, color: '#f5222d' }
    ];

    // 分类数据
    const categories = [
        { key: 'all', label: '全部', count: 1247, color: 'blue' },
        { key: 'immunology', label: '免疫学', count: 234, color: 'green' },
        { key: 'metabolism', label: '代谢学', count: 189, color: 'orange' },
        { key: 'pathology', label: '病理学', count: 156, color: 'red' },
        { key: 'application', label: '应用研究', count: 298, color: 'purple' },
        { key: 'molecular', label: '分子机制', count: 167, color: 'cyan' },
        { key: 'ecology', label: '生态学', count: 203, color: 'geekblue' }
    ];

    // 知识条目数据
    const knowledgeData = [
        {
            id: 1,
            title: '肠道菌群与免疫系统关系研究进展',
            category: 'immunology',
            categoryLabel: '免疫学',
            tags: ['肠道菌群', '免疫系统', '炎症反应', 'T细胞'],
            description: '深入探讨肠道菌群如何影响宿主免疫系统的发育和功能，包括T细胞分化、B细胞活化等关键机制...',
            author: '张研究员',
            authorAvatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
            date: '2025-01-15',
            views: 1247,
            likes: 89,
            shares: 23,
            rating: 4.8,
            status: 'published',
            attachments: 3,
            relatedStudies: 12
        },
        {
            id: 2,
            title: '益生菌在宠物健康中的应用与机制',
            category: 'application',
            categoryLabel: '应用研究',
            tags: ['益生菌', '宠物健康', '营养', '肠道屏障'],
            description: '系统综述益生菌在改善宠物肠道健康和免疫功能方面的作用机制，包括菌株筛选、剂量优化等...',
            author: '李博士',
            authorAvatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
            date: '2025-01-14',
            views: 892,
            likes: 67,
            shares: 15,
            rating: 4.6,
            status: 'published',
            attachments: 2,
            relatedStudies: 8
        },
        {
            id: 3,
            title: '菌群失调与疾病关联性的多组学分析',
            category: 'pathology',
            categoryLabel: '病理学',
            tags: ['菌群失调', '疾病诊断', '多组学', '生物标志物'],
            description: '运用多组学技术分析肠道菌群失调与各种疾病之间的关联性，建立预测模型和诊断标志物...',
            author: '王助理',
            authorAvatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
            date: '2025-01-13',
            views: 1567,
            likes: 123,
            shares: 34,
            rating: 4.9,
            status: 'featured',
            attachments: 5,
            relatedStudies: 18
        },
        {
            id: 4,
            title: '肠道菌群代谢产物与宿主代谢调控',
            category: 'metabolism',
            categoryLabel: '代谢学',
            tags: ['代谢产物', '短链脂肪酸', '胆汁酸', '能量代谢'],
            description: '研究肠道菌群产生的代谢产物如何调控宿主能量代谢、脂质代谢和糖代谢等生理过程...',
            author: '陈教授',
            authorAvatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
            date: '2025-01-12',
            views: 2034,
            likes: 156,
            shares: 45,
            rating: 4.7,
            status: 'published',
            attachments: 4,
            relatedStudies: 15
        }
    ];

    // 表格列定义
    const columns = [
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            render: (text: string, record: any) => (
                <div>
                    <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                        {record.status === 'featured' && <StarOutlined style={{ color: '#faad14', marginRight: '4px' }} />}
                        {text}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                        {record.description.substring(0, 60)}...
                    </div>
                </div>
            )
        },
        {
            title: '分类',
            dataIndex: 'categoryLabel',
            key: 'category',
            render: (text: string, record: any) => (
                <Tag color={categories.find(c => c.key === record.category)?.color}>
                    {text}
                </Tag>
            )
        },
        {
            title: '作者',
            dataIndex: 'author',
            key: 'author',
            render: (author: string, record: any) => (
                <Space>
                    <Avatar size="small" src={record.authorAvatar} />
                    {author}
                </Space>
            )
        },
        {
            title: '统计',
            key: 'stats',
            render: (record: any) => (
                <Space direction="vertical" size="small">
                    <div>👁️ {record.views}</div>
                    <div>👍 {record.likes}</div>
                    <div>⭐ {record.rating}</div>
                </Space>
            )
        },
        {
            title: '操作',
            key: 'action',
            render: (record: any) => (
                <Space>
                    <Button type="link" icon={<EyeOutlined />} size="small">查看</Button>
                    <Button type="link" icon={<EditOutlined />} size="small">编辑</Button>
                    <Button type="link" icon={<ShareAltOutlined />} size="small">分享</Button>
                </Space>
            )
        }
    ];

    const handleSearch = (value: string) => {
        setSearchText(value);
        setLoading(true);
        // 模拟搜索延迟
        setTimeout(() => setLoading(false), 1000);
    };

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);
    };

    const renderCardView = () => (
        <Row gutter={[16, 16]}>
            {knowledgeData.map(item => (
                <Col xs={24} sm={12} lg={8} xl={6} key={item.id}>
                    <Card
                        hoverable
                        actions={[
                            <Tooltip title="查看详情">
                                <EyeOutlined key="view" />
                            </Tooltip>,
                            <Tooltip title="收藏">
                                <StarOutlined key="star" />
                            </Tooltip>,
                            <Tooltip title="分享">
                                <ShareAltOutlined key="share" />
                            </Tooltip>,
                            <Tooltip title="下载">
                                <DownloadOutlined key="download" />
                            </Tooltip>
                        ]}
                        cover={
                            <div style={{ 
                                height: 120, 
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '24px'
                            }}>
                                <DatabaseOutlined />
                            </div>
                        }
                    >
                        <Card.Meta
                            avatar={<Avatar src={item.authorAvatar} />}
                            title={
                                <div>
                                    {item.status === 'featured' && <StarOutlined style={{ color: '#faad14', marginRight: '4px' }} />}
                                    {item.title}
                                </div>
                            }
                            description={
                                <div>
                                    <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: '8px' }}>
                                        {item.description}
                                    </Paragraph>
                                    <div style={{ marginBottom: '8px' }}>
                                        <Tag color={categories.find(c => c.key === item.category)?.color}>
                                            {item.categoryLabel}
                                        </Tag>
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#666' }}>
                                        <Space>
                                            <span>👁️ {item.views}</span>
                                            <span>👍 {item.likes}</span>
                                            <span>⭐ {item.rating}</span>
                                        </Space>
                                    </div>
                                </div>
                            }
                        />
                    </Card>
                </Col>
            ))}
        </Row>
    );

    const renderListView = () => (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: (page) => console.log(page),
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
            }}
            dataSource={knowledgeData}
            renderItem={(item) => (
                <List.Item
                    key={item.id}
                    actions={[
                        <Space key="stats">
                            <span>👁️ {item.views}</span>
                            <span>👍 {item.likes}</span>
                            <span>📤 {item.shares}</span>
                            <span>⭐ {item.rating}</span>
                        </Space>,
                        <Space key="actions">
                            <Button type="link" icon={<EyeOutlined />}>查看</Button>
                            <Button type="link" icon={<EditOutlined />}>编辑</Button>
                            <Button type="link" icon={<ShareAltOutlined />}>分享</Button>
                        </Space>
                    ]}
                    extra={
                        <div style={{ width: 200, textAlign: 'center' }}>
                            <Progress 
                                type="circle" 
                                percent={item.rating * 20} 
                                format={() => item.rating}
                                size="small"
                            />
                            <div style={{ marginTop: '8px', fontSize: '12px' }}>
                                评分
                            </div>
                        </div>
                    }
                >
                    <List.Item.Meta
                        avatar={<Avatar size="large" src={item.authorAvatar} />}
                        title={
                            <div>
                                {item.status === 'featured' && <StarOutlined style={{ color: '#faad14', marginRight: '4px' }} />}
                                <a href="#">{item.title}</a>
                            </div>
                        }
                        description={
                            <div>
                                <Paragraph ellipsis={{ rows: 2 }}>
                                    {item.description}
                                </Paragraph>
                                <div style={{ marginTop: '8px' }}>
                                    {item.tags.map(tag => (
                                        <Tag key={tag} color="blue" style={{ marginRight: '4px' }}>
                                            {tag}
                                        </Tag>
                                    ))}
                                </div>
                                <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
                                    <Space>
                                        <span>作者: {item.author}</span>
                                        <span>发布时间: {item.date}</span>
                                        <span>附件: {item.attachments}个</span>
                                    </Space>
                                </div>
                            </div>
                        }
                    />
                </List.Item>
            )}
        />
    );

    return (
        <div style={{ padding: '24px', background: '#ffffff', minHeight: '100vh' }}>
            {/* 页面标题和统计 */}
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                <Col span={16}>
                    <Title level={2} style={{ margin: 0 }}>
                        <DatabaseOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                        菌群知识库
                    </Title>
                    <Paragraph type="secondary">
                        专业的微生物组学研究知识库，涵盖免疫学、代谢学、病理学等多个领域
                    </Paragraph>
                </Col>
                <Col span={8} style={{ textAlign: 'right' }}>
                    <Button type="primary" icon={<PlusOutlined />} size="large">
                        添加知识条目
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
                            placeholder="搜索知识条目、作者、标签..."
                            allowClear
                            enterButton={<SearchOutlined />}
                            size="large"
                            onSearch={handleSearch}
                            loading={loading}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Select
                            placeholder="选择分类"
                            style={{ width: '100%' }}
                            size="large"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            {categories.map(cat => (
                                <Option key={cat.key} value={cat.key}>
                                    {cat.label} ({cat.count})
                                </Option>
                            ))}
                        </Select>
                    </Col>
                    <Col xs={24} sm={12} md={4}>
                        <Button icon={<FilterOutlined />} size="large" style={{ width: '100%' }}>
                            高级筛选
                        </Button>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Space>
                            <Button 
                                type={viewMode === 'card' ? 'primary' : 'default'} 
                                icon={<DatabaseOutlined />}
                                onClick={() => setViewMode('card')}
                            >
                                卡片
                            </Button>
                            <Button 
                                type={viewMode === 'list' ? 'primary' : 'default'} 
                                icon={<FileTextOutlined />}
                                onClick={() => setViewMode('list')}
                            >
                                列表
                            </Button>
                            <Button 
                                type={viewMode === 'table' ? 'primary' : 'default'} 
                                icon={<BarChartOutlined />}
                                onClick={() => setViewMode('table')}
                            >
                                表格
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Card>

            {/* 分类标签 */}
            <Card style={{ marginBottom: '24px' }}>
                <Space wrap>
                    {categories.map(cat => (
                        <Tag 
                            key={cat.key}
                            color={cat.color}
                            style={{ 
                                padding: '8px 16px', 
                                fontSize: '14px',
                                cursor: 'pointer',
                                border: selectedCategory === cat.key ? '2px solid' : '1px solid'
                            }}
                            onClick={() => setSelectedCategory(cat.key)}
                        >
                            {cat.label} ({cat.count})
                        </Tag>
                    ))}
                </Space>
            </Card>

            {/* 内容区域 */}
            <Card>
                <Tabs defaultActiveKey="knowledge" size="large">
                    <TabPane tab="知识条目" key="knowledge">
                        {loading ? (
                            <Row gutter={[16, 16]}>
                                {[1, 2, 3, 4].map(i => (
                                    <Col xs={24} sm={12} lg={8} xl={6} key={i}>
                                        <Card>
                                            <Skeleton active />
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        ) : viewMode === 'card' ? renderCardView() : 
                           viewMode === 'list' ? renderListView() : (
                            <Table 
                                columns={columns} 
                                dataSource={knowledgeData}
                                rowKey="id"
                                pagination={{
                                    pageSize: 10,
                                    showSizeChanger: true,
                                    showQuickJumper: true,
                                    showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
                                }}
                            />
                        )}
                    </TabPane>
                    
                    <TabPane tab="知识图谱" key="graph">
                        <div style={{ 
                            height: 400, 
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '18px'
                        }}>
                            <Space direction="vertical" align="center">
                                <NodeIndexOutlined style={{ fontSize: '48px' }} />
                                <div>知识图谱可视化</div>
                                <div style={{ fontSize: '14px', opacity: 0.8 }}>
                                    展示菌群知识之间的关联关系
                                </div>
                            </Space>
                        </div>
                    </TabPane>
                    
                    <TabPane tab="研究趋势" key="trends">
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Card title="热门研究领域">
                                    <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <BarChartOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                                    </div>
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card title="发表趋势">
                                    <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <BranchesOutlined style={{ fontSize: '48px', color: '#52c41a' }} />
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </TabPane>
                    
                    <TabPane tab="协作空间" key="collaboration">
                        <Alert
                            message="协作功能"
                            description="在这里可以与其他研究者协作编辑知识条目，共享研究成果。"
                            type="info"
                            showIcon
                            style={{ marginBottom: '16px' }}
                        />
                        <Empty 
                            description="暂无协作项目"
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    );
};

export default MicrobiomeKnowledge; 