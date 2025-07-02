import React from 'react';
import { Card, Row, Col, Input, Button, Tag, List, Avatar } from 'antd';
import { SearchOutlined, PlusOutlined, FileTextOutlined } from '@ant-design/icons';

const { Search } = Input;

const LiteratureKnowledge: React.FC = () => {
    const literatureData = [
        {
            id: 1,
            title: '肠道菌群与宠物健康关系研究进展',
            authors: 'Zhang L, Wang M, Li H',
            journal: 'Veterinary Microbiology',
            year: 2024,
            tags: ['肠道菌群', '宠物健康', '综述'],
            abstract: '本文综述了近年来肠道菌群与宠物健康关系的研究进展...',
            doi: '10.1016/j.vetmic.2024.123456'
        },
        {
            id: 2,
            title: '益生菌在犬类疾病治疗中的应用',
            authors: 'Liu J, Chen X, Zhao Y',
            journal: 'Journal of Veterinary Medicine',
            year: 2024,
            tags: ['益生菌', '犬类疾病', '治疗'],
            abstract: '探讨了益生菌在犬类疾病治疗中的临床应用效果...',
            doi: '10.1000/jvm.2024.789012'
        }
    ];

    return (
        <div style={{ padding: '24px' }}>
            <h1 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: 'bold' }}>
                文献知识库
            </h1>

            {/* 搜索和操作区域 */}
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                <Col span={16}>
                    <Search
                        placeholder="搜索文献..."
                        allowClear
                        enterButton={<SearchOutlined />}
                        size="large"
                    />
                </Col>
                <Col span={8}>
                    <Button type="primary" icon={<PlusOutlined />} size="large" style={{ width: '100%' }}>
                        添加文献
                    </Button>
                </Col>
            </Row>

            {/* 分类标签 */}
            <div style={{ marginBottom: '24px' }}>
                <Tag color="blue" style={{ marginRight: '8px', padding: '4px 12px' }}>全部</Tag>
                <Tag color="green" style={{ marginRight: '8px', padding: '4px 12px' }}>综述</Tag>
                <Tag color="orange" style={{ marginRight: '8px', padding: '4px 12px' }}>研究论文</Tag>
                <Tag color="purple" style={{ marginRight: '8px', padding: '4px 12px' }}>临床研究</Tag>
            </div>

            {/* 文献列表 */}
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 10,
                }}
                dataSource={literatureData}
                renderItem={(item) => (
                    <List.Item
                        key={item.id}
                        actions={[
                            <span key="authors">作者: {item.authors}</span>,
                            <span key="year">{item.year}</span>,
                            <span key="journal">{item.journal}</span>
                        ]}
                        extra={
                            <Button type="primary" size="small">
                                下载PDF
                            </Button>
                        }
                    >
                        <List.Item.Meta
                            avatar={<Avatar icon={<FileTextOutlined />} />}
                            title={<a href="#">{item.title}</a>}
                            description={
                                <div>
                                    <p><strong>摘要:</strong> {item.abstract}</p>
                                    <p><strong>DOI:</strong> {item.doi}</p>
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

export default LiteratureKnowledge; 