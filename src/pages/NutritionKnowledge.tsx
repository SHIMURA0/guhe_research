import React from 'react';
import { Card, Row, Col, Input, Button, Tag, List, Avatar } from 'antd';
import { SearchOutlined, PlusOutlined, AppleOutlined } from '@ant-design/icons';

const { Search } = Input;

const NutritionKnowledge: React.FC = () => {
    const nutritionData = [
        {
            id: 1,
            title: '宠物肠道健康营养指南',
            category: '营养指南',
            tags: ['肠道健康', '营养', '消化'],
            description: '针对宠物肠道健康的营养搭配建议和食谱推荐...',
            author: '营养师张',
            date: '2025-01-15'
        },
        {
            id: 2,
            title: '益生菌补充剂选择指南',
            category: '补充剂',
            tags: ['益生菌', '补充剂', '选择'],
            description: '如何为宠物选择合适的益生菌补充剂...',
            author: '李营养师',
            date: '2025-01-14'
        }
    ];

    return (
        <div style={{ padding: '24px' }}>
            <h1 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: 'bold' }}>
                营养知识库
            </h1>

            {/* 搜索和操作区域 */}
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                <Col span={16}>
                    <Search
                        placeholder="搜索营养知识..."
                        allowClear
                        enterButton={<SearchOutlined />}
                        size="large"
                    />
                </Col>
                <Col span={8}>
                    <Button type="primary" icon={<PlusOutlined />} size="large" style={{ width: '100%' }}>
                        添加营养知识
                    </Button>
                </Col>
            </Row>

            {/* 分类标签 */}
            <div style={{ marginBottom: '24px' }}>
                <Tag color="blue" style={{ marginRight: '8px', padding: '4px 12px' }}>全部</Tag>
                <Tag color="green" style={{ marginRight: '8px', padding: '4px 12px' }}>营养指南</Tag>
                <Tag color="orange" style={{ marginRight: '8px', padding: '4px 12px' }}>补充剂</Tag>
                <Tag color="purple" style={{ marginRight: '8px', padding: '4px 12px' }}>食谱</Tag>
            </div>

            {/* 营养知识列表 */}
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 10,
                }}
                dataSource={nutritionData}
                renderItem={(item) => (
                    <List.Item
                        key={item.id}
                        actions={[
                            <span key="author">作者: {item.author}</span>,
                            <span key="date">{item.date}</span>,
                            <span key="category">分类: {item.category}</span>
                        ]}
                        extra={
                            <img
                                width={120}
                                alt="logo"
                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            />
                        }
                    >
                        <List.Item.Meta
                            avatar={<Avatar icon={<AppleOutlined />} />}
                            title={<a href="#">{item.title}</a>}
                            description={
                                <div>
                                    <p>{item.description}</p>
                                    <div style={{ marginTop: '8px' }}>
                                        {item.tags.map(tag => (
                                            <Tag key={tag} color="green" style={{ marginRight: '4px' }}>
                                                {tag}
                                            </Tag>
                                        ))}
                                    </div>
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default NutritionKnowledge; 