import React from 'react';
import { Breadcrumb, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const ResearchProjects: React.FC = () => {
    const handleAddSubject = () => {
        console.log('新增课题');
        // 这里可以添加新增课题的逻辑
    };

    return (
        <div>
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
                        { title: '课题研究' }
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
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    }}>
                        {/* 顶部信息行 */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: '8px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '20px' }}>🐕</span>
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
                                    backgroundColor: '#3b82f6',
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
                                    backgroundColor: '#10b981',
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
                                    backgroundColor: '#f59e0b',
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
        </div>
    );
};

export default ResearchProjects; 