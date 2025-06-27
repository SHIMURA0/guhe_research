import React, {useState} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    DatabaseOutlined,
    ExperimentOutlined,
    CodeOutlined,
    FolderOutlined,
    BookOutlined,
    PlusOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {Breadcrumb, Button, Layout, Menu, theme} from 'antd';

const {Header, Sider, Content} = Layout;

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    const handleAddSubject = () => {
        console.log('新增课题');
        // 这里可以添加新增课题的逻辑
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            icon: <UserOutlined/>,
            label: '工作台',
        },
        {
            key: '2',
            icon: <DatabaseOutlined/>,
            label: '菌群知识库',
        },
        {
            key: '2',
            icon: <DatabaseOutlined/>,
            label: '疾病知识库',
        },
        {
            key: '3',
            icon: <ExperimentOutlined/>,
            label: '营养知识库',
        },
        {
            key: '4',
            icon: <BookOutlined/>,
            label: '文献知识库',
        },
        {
            key: '5',
            icon: <UploadOutlined/>,
            label: '统计方法知识库',
        },
        {
            key: 'sub1', // 模型仓库 - 子菜单
            icon: <FolderOutlined/>,
            label: '模型仓库',
            children: [
                {
                    key: '6-1',
                    label: '分类模型',
                },
                {
                    key: '6-2',
                    label: '回归模型',
                },
                {
                    key: '6-3',
                    label: '聚类模型',
                },
                {
                    key: '6-4',
                    label: '深度学习模型',
                },
                {
                    key: '6-5',
                    label: '预训练模型',
                },
            ],
        },
        {
            key: '7',
            icon: <CodeOutlined/>,
            label: '代码仓库',
        },
        {
            key: '8',
            icon: <CodeOutlined/>,
            label: '数据仓库',
            children: [
                {
                    key: '8-1',
                    label: '原始数据',
                },
                {
                    key: '8-2',
                    label: '元数据',
                }
            ]
        },
        {
            key: '2',
            icon: <DatabaseOutlined/>,
            label: '特征仓库',
        },
        {
            key: '9',
            icon: <UploadOutlined/>,
            label: '科研项目',
        },
        {
            key: '10',
            icon: <VideoCameraOutlined/>,
            label: '课题研究',
        },
    ];

    return (
        <Layout
            style={{
                height: '100vh',
                overflow: 'hidden'
            }}
        >
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{
                    background: '#fff', // 设置为白色背景
                    height: '100vh', // 确保Sider占满高度
                    overflow: 'auto' // Sider内部可滚动（如果菜单太多）
                }}
            >
                <div className="demo-logo-vertical" style={{
                    height: '80px', // 设置logo区域高度
                    marginBottom: '20px', // 或者添加底部边距
                    // 或者同时使用：
                    // marginTop: '20px',
                }}
                >谷禾菌研</div>
                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={items}
                />
            </Sider>
            <Layout>
                <Header style={{padding: 0, background: colorBgContainer}}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>

                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        overflow: 'auto',
                        flex: 1,
                    }}
                >
                    {/* 头部区域：面包屑导航和操作按钮 */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 24
                    }}>
                        <Breadcrumb
                            items={[
                                { title: 'Home' },
                                { title: 'List' },
                                { title: 'App' }
                            ]}
                        />
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={handleAddSubject}
                        >
                            新增课题
                        </Button>
                    </div>

                    {/* 主要内容区域 - 项目卡片网格 */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                        gap: '24px'
                    }}>
                        {/* 研究项目卡片 */}
                        <div style={{
                            aspectRatio: '1',
                            backgroundColor: 'white',
                            borderRadius: '16px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            overflow: 'hidden',
                            border: '1px solid #f3f4f6',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
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
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // 肾病研究渐变色
                            }}>
                                {/* 顶部信息行 */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    marginBottom: '8px'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ fontSize: '20px' }}>🐕</span> {/* 狗狗emoji代替FontAwesome */}
                                        <span style={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                            padding: '4px 8px',
                                            borderRadius: '12px',
                                            fontSize: '12px',
                                            fontWeight: 500
                                        }}>
                                            犬类研究
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <div style={{
                                            width: '8px',
                                            height: '8px',
                                            backgroundColor: '#fbbf24',
                                            borderRadius: '50%'
                                        }}></div>
                                        <span style={{
                                            backgroundColor: '#fbbf24',
                                            color: '#92400e',
                                            padding: '4px 8px',
                                            borderRadius: '12px',
                                            fontSize: '12px',
                                            fontWeight: 500
                                        }}>
                                            进行中
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
                                    犬肾病微生物组
                                </h3>
                                <p style={{
                                    fontSize: '12px',
                                    opacity: 0.9,
                                    margin: 0
                                }}>
                                    慢性肾病肠道菌群研究
                                </p>

                            </div>

                            <div style={{
                                display: 'flex',
                                gap: '12px', // 两个容器之间的间距
                                // marginBottom: '2px',
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
                                        320
                                    </div>
                                </div>

                                {/* 16S rRNA V3-V4容器 */}
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
                                        16S rRNA V3-V4
                                    </div>
                                </div>
                            </div>

                            {/* 卡片内容区域 */}
                            <div style={{ padding: '16px' }}>


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
                                        2025-07-15
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
                                        <div style={{
                                            width: '24px',
                                            height: '24px',
                                            borderRadius: '50%',
                                            backgroundColor: '#3b82f6', // 蓝色
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '10px',
                                            fontWeight: 500,
                                            color: 'white'
                                        }}>
                                            张
                                        </div>
                                        <div style={{
                                            width: '24px',
                                            height: '24px',
                                            borderRadius: '50%',
                                            backgroundColor: '#10b981', // 绿色
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '10px',
                                            fontWeight: 500,
                                            color: 'white'
                                        }}>
                                            王
                                        </div>
                                        <div style={{
                                            width: '24px',
                                            height: '24px',
                                            borderRadius: '50%',
                                            backgroundColor: '#f59e0b', // 橙色
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '10px',
                                            fontWeight: 500,
                                            color: 'white'
                                        }}>
                                            刘
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 宠物年龄研究项目卡片 */}
                        <div style={{
                            aspectRatio: '1',
                            backgroundColor: 'white',
                            borderRadius: '16px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            overflow: 'hidden',
                            border: '1px solid #f3f4f6',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
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
                                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', // 绿色渐变
                            }}>
                                {/* 顶部信息行 */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    marginBottom: '8px'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ fontSize: '20px' }}>🐾</span>
                                        <span style={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                            padding: '4px 8px',
                                            borderRadius: '12px',
                                            fontSize: '12px',
                                            fontWeight: 500
                                        }}>
                    年龄研究
                </span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <div style={{
                                            width: '8px',
                                            height: '8px',
                                            backgroundColor: '#22c55e',
                                            borderRadius: '50%'
                                        }}></div>
                                        <span style={{
                                            backgroundColor: '#22c55e',
                                            color: '#15803d',
                                            padding: '4px 8px',
                                            borderRadius: '12px',
                                            fontSize: '12px',
                                            fontWeight: 500
                                        }}>
                    已完成
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
                                    宠物年龄微生物组
                                </h3>
                                <p style={{
                                    fontSize: '12px',
                                    opacity: 0.9,
                                    margin: 0
                                }}>
                                    不同年龄段菌群变化研究
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
                                        450
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
                                        16S rRNA V4
                                    </div>
                                </div>
                            </div>

                            {/* 卡片内容区域 */}
                            <div style={{ padding: '16px' }}>
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
                                        2025-08-10
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
                                        <div style={{
                                            width: '24px',
                                            height: '24px',
                                            borderRadius: '50%',
                                            backgroundColor: '#3b82f6', // 蓝色
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '10px',
                                            fontWeight: 500,
                                            color: 'white'
                                        }}>
                                            张
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 狗狗腹泻研究项目卡片 */}
                        <div style={{
                            aspectRatio: '1',
                            backgroundColor: 'white',
                            borderRadius: '16px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            overflow: 'hidden',
                            border: '1px solid #f3f4f6',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
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
                                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', // 红色渐变
                            }}>
                                {/* 顶部信息行 */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    marginBottom: '8px'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ fontSize: '20px' }}>🤢</span>
                                        <span style={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                            padding: '4px 8px',
                                            borderRadius: '12px',
                                            fontSize: '12px',
                                            fontWeight: 500
                                        }}>
                    消化系统
                </span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <div style={{
                                            width: '8px',
                                            height: '8px',
                                            backgroundColor: '#fbbf24',
                                            borderRadius: '50%'
                                        }}></div>
                                        <span style={{
                                            backgroundColor: '#fbbf24',
                                            color: '#92400e',
                                            padding: '4px 8px',
                                            borderRadius: '12px',
                                            fontSize: '12px',
                                            fontWeight: 500
                                        }}>
                    进行中
                </span>
                                    </div>
                                </div>

                                {/* 项目标题和描述 */}
                                <h3 style={{
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    marginBottom: '8px',
                                    margin: 0
                                }}>
                                    犬腹泻微生物组
                                </h3>
                                <p style={{
                                    fontSize: '12px',
                                    opacity: 0.9,
                                    margin: 0
                                }}>
                                    腹泻相关肠道菌群分析
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
                                        280
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
                                        宏基因组测序
                                    </div>
                                </div>
                            </div>

                            {/* 卡片内容区域 */}
                            <div style={{ padding: '16px' }}>
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
                                        2025-06-20
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
                                        <div style={{
                                            width: '24px',
                                            height: '24px',
                                            borderRadius: '50%',
                                            backgroundColor: '#3b82f6', // 蓝色
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '10px',
                                            fontWeight: 500,
                                            color: 'white'
                                        }}>
                                            张
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 狗狗甲减研究项目卡片 */}
                        <div style={{
                            aspectRatio: '1',
                            backgroundColor: 'white',
                            borderRadius: '16px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            overflow: 'hidden',
                            border: '1px solid #f3f4f6',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
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
                                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', // 紫色渐变
                            }}>
                                {/* 顶部信息行 */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    marginBottom: '8px'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ fontSize: '20px' }}>🩺</span>
                                        <span style={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                            padding: '4px 8px',
                                            borderRadius: '12px',
                                            fontSize: '12px',
                                            fontWeight: 500
                                        }}>
                    内分泌
                </span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <div style={{
                                            width: '8px',
                                            height: '8px',
                                            backgroundColor: '#3b82f6',
                                            borderRadius: '50%'
                                        }}></div>
                                        <span style={{
                                            backgroundColor: '#3b82f6',
                                            color: '#1e40af',
                                            padding: '4px 8px',
                                            borderRadius: '12px',
                                            fontSize: '12px',
                                            fontWeight: 500
                                        }}>
                    筹备中
                </span>
                                    </div>
                                </div>

                                {/* 项目标题和描述 */}
                                <h3 style={{
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    marginBottom: '8px',
                                    margin: 0
                                }}>
                                    犬甲减微生物组
                                </h3>
                                <p style={{
                                    fontSize: '12px',
                                    opacity: 0.9,
                                    margin: 0
                                }}>
                                    甲状腺功能减退菌群研究
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
                                        160
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
                                        16S rRNA V3-V4
                                    </div>
                                </div>
                            </div>

                            {/* 卡片内容区域 */}
                            <div style={{ padding: '16px' }}>
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
                                        2025-09-05
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
                                        <div style={{
                                            width: '24px',
                                            height: '24px',
                                            borderRadius: '50%',
                                            backgroundColor: '#3b82f6', // 蓝色
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '10px',
                                            fontWeight: 500,
                                            color: 'white'
                                        }}>
                                            张
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 狗狗癫痫研究项目卡片 */}
                        <div style={{
                            aspectRatio: '1',
                            backgroundColor: 'white',
                            borderRadius: '16px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            overflow: 'hidden',
                            border: '1px solid #f3f4f6',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
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
                                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', // 橙色渐变
                            }}>
                                {/* 顶部信息行 */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    marginBottom: '8px'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ fontSize: '20px' }}>⚡</span>
                                        <span style={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                            padding: '4px 8px',
                                            borderRadius: '12px',
                                            fontSize: '12px',
                                            fontWeight: 500
                                        }}>
                    神经系统
                </span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <div style={{
                                            width: '8px',
                                            height: '8px',
                                            backgroundColor: '#fbbf24',
                                            borderRadius: '50%'
                                        }}></div>
                                        <span style={{
                                            backgroundColor: '#fbbf24',
                                            color: '#92400e',
                                            padding: '4px 8px',
                                            borderRadius: '12px',
                                            fontSize: '12px',
                                            fontWeight: 500
                                        }}>
                    进行中
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
                                    犬癫痫微生物组
                                </h3>
                                <p style={{
                                    fontSize: '12px',
                                    opacity: 0.9,
                                    margin: 0
                                }}>
                                    癫痫相关肠脑轴菌群研究
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
                                        200
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
                                        16S rRNA V3-V4
                                    </div>
                                </div>
                            </div>

                            {/* 卡片内容区域 */}
                            <div style={{ padding: '16px' }}>
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
                                        2025-05-12
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
                                        <div style={{
                                            width: '24px',
                                            height: '24px',
                                            borderRadius: '50%',
                                            backgroundColor: '#3b82f6', // 蓝色
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '10px',
                                            fontWeight: 500,
                                            color: 'white'
                                        }}>
                                            张
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 狗狗IBD研究项目卡片 */}
                        <div style={{
                            aspectRatio: '1',
                            backgroundColor: 'white',
                            borderRadius: '16px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            overflow: 'hidden',
                            border: '1px solid #f3f4f6',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
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
                                background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)', // 深蓝色渐变
                            }}>
                                {/* 顶部信息行 */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    marginBottom: '8px'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ fontSize: '20px' }}>🦠</span>
                                        <span style={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                            padding: '4px 8px',
                                            borderRadius: '12px',
                                            fontSize: '12px',
                                            fontWeight: 500
                                        }}>
                    炎症性疾病
                </span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <div style={{
                                            width: '8px',
                                            height: '8px',
                                            backgroundColor: '#22c55e',
                                            borderRadius: '50%'
                                        }}></div>
                                        <span style={{
                                            backgroundColor: '#22c55e',
                                            color: '#15803d',
                                            padding: '4px 8px',
                                            borderRadius: '12px',
                                            fontSize: '12px',
                                            fontWeight: 500
                                        }}>
                    已完成
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
                                    犬IBD微生物组
                                </h3>
                                <p style={{
                                    fontSize: '12px',
                                    opacity: 0.9,
                                    margin: 0
                                }}>
                                    炎症性肠病菌群失调研究
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
                                        350
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
                                        宏基因组测序
                                    </div>
                                </div>
                            </div>

                            {/* 卡片内容区域 */}
                            <div style={{ padding: '16px' }}>
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
                                        2025-03-18
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
                                        <div style={{
                                            width: '24px',
                                            height: '24px',
                                            borderRadius: '50%',
                                            backgroundColor: '#3b82f6', // 蓝色
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '10px',
                                            fontWeight: 500,
                                            color: 'white'
                                        }}>
                                            张
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 狗狗老年痴呆研究项目卡片 */}
                        <div style={{
                            aspectRatio: '1',
                            backgroundColor: 'white',
                            borderRadius: '16px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            overflow: 'hidden',
                            border: '1px solid #f3f4f6',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
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
                                background: 'linear-gradient(135deg, #581c87 0%, #4c1d95 100%)', // 深紫色渐变
                            }}>
                                {/* 顶部信息行 */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    marginBottom: '8px'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ fontSize: '20px' }}>🧠</span>
                                        <span style={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                            padding: '4px 8px',
                                            borderRadius: '12px',
                                            fontSize: '12px',
                                            fontWeight: 500
                                        }}>
                    神经退化
                </span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <div style={{
                                            width: '8px',
                                            height: '8px',
                                            backgroundColor: '#3b82f6',
                                            borderRadius: '50%'
                                        }}></div>
                                        <span style={{
                                            backgroundColor: '#3b82f6',
                                            color: '#1e40af',
                                            padding: '4px 8px',
                                            borderRadius: '12px',
                                            fontSize: '12px',
                                            fontWeight: 500
                                        }}>
                    筹备中
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
                                    犬痴呆微生物组
                                </h3>
                                <p style={{
                                    fontSize: '12px',
                                    opacity: 0.9,
                                    margin: 0
                                }}>
                                    老年认知障碍菌群机制
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
                                        120
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
                                        16S rRNA V4-V5
                                    </div>
                                </div>
                            </div>

                            {/* 卡片内容区域 */}
                            <div style={{ padding: '16px' }}>
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
                                        2025-10-01
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
                                        <div style={{
                                            width: '24px',
                                            height: '24px',
                                            borderRadius: '50%',
                                            backgroundColor: '#3b82f6', // 蓝色
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '10px',
                                            fontWeight: 500,
                                            color: 'white'
                                        }}>
                                            张
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 可以添加更多项目卡片 */}
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
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;