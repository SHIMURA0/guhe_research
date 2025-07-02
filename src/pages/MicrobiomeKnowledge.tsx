import React from 'react';
import { Card, Row, Col, Input, Button, Tag, List, Avatar } from 'antd';
import { SearchOutlined, PlusOutlined, BookOutlined } from '@ant-design/icons';

const { Search } = Input;

const MicrobiomeKnowledge: React.FC = () => {
    const knowledgeData = [
        {
            id: 1,
            title: '肠道菌群与免疫系统关系',
            category: '免疫学',
            tags: ['肠道菌群', '免疫系统', '炎症'],
            description: '探讨肠道菌群如何影响宿主免疫系统的发育和功能...',
            author: '张研究员',
            date: '2025-01-15'
        },
        {
            id: 2,
            title: '益生菌在宠物健康中的应用',
            category: '应用研究',
            tags: ['益生菌', '宠物健康', '营养'],
            description: '益生菌在改善宠物肠道健康和免疫功能方面的作用机制...',
            author: '李博士',
            date: '2025-01-14'
        },
        {
            id: 3,
            title: '菌群失调与疾病关联性',
            category: '病理学',
            tags: ['菌群失调', '疾病', '诊断'],
            description: '分析肠道菌群失调与各种疾病之间的关联性研究...',
            author: '王助理',
            date: '2025-01-13'
        }
    ];

    return (
        <div style={{ padding: '24px' }}>
            <h1 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: 'bold' }}>
                菌群知识库
            </h1>

            {/* 搜索和操作区域 */}
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                <Col span={16}>
                    <Search
                        placeholder="搜索菌群知识..."
                        allowClear
                        enterButton={<SearchOutlined />}
                        size="large"
                    />
                </Col>
                <Col span={8}>
                    <Button type="primary" icon={<PlusOutlined />} size="large" style={{ width: '100%' }}>
                        添加知识条目
                    </Button>
                </Col>
            </Row>

            {/* 分类标签 */}
            <div style={{ marginBottom: '24px' }}>
                <Tag color="blue" style={{ marginRight: '8px', padding: '4px 12px' }}>全部</Tag>
                <Tag color="green" style={{ marginRight: '8px', padding: '4px 12px' }}>免疫学</Tag>
                <Tag color="orange" style={{ marginRight: '8px', padding: '4px 12px' }}>应用研究</Tag>
                <Tag color="purple" style={{ marginRight: '8px', padding: '4px 12px' }}>病理学</Tag>
                <Tag color="red" style={{ marginRight: '8px', padding: '4px 12px' }}>分子机制</Tag>
            </div>

            {/* 知识条目列表 */}
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 10,
                }}
                dataSource={knowledgeData}
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
                            avatar={<Avatar icon={<BookOutlined />} />}
                            title={<a href="#">{item.title}</a>}
                            description={
                                <div>
                                    <p>{item.description}</p>
                                    <div style={{ marginTop: '8px' }}>
                                        {item.tags.map(tag => (
                                            <Tag key={tag} color="blue" style={{ marginRight: '4px' }}>
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

export default MicrobiomeKnowledge; 