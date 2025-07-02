import React, { useState } from 'react';
import { Card, Row, Col, Input, Button, Tag, Modal, Typography, Space, Tooltip } from 'antd';
import { SearchOutlined, PlusOutlined, InfoCircleOutlined, FilterOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

const methodCategories = [
  { key: 'all', label: '全部' },
  { key: 'parametric', label: '参数方法' },
  { key: 'nonparametric', label: '非参数方法' },
  { key: 'multivariate', label: '多元分析' },
  { key: 'dimension', label: '降维' },
  { key: 'clustering', label: '聚类' },
  { key: 'regression', label: '回归' },
  { key: 'other', label: '其他' }
];

const methodsData = [
  {
    id: 1,
    name: 't检验 (t-test)',
    type: '参数方法',
    category: 'parametric',
    description: '用于比较两组均值是否存在显著差异，常用于正态分布数据。',
    principle: '基于样本均值、方差和自由度计算t统计量，检验两组均值差异。',
    scenario: '两组独立或配对样本的均值比较，如病例组与对照组。',
    inputFormat: '二维表格，包含分组标签和测量值（CSV/Excel）',
    outputFormat: 't值、p值、均值、置信区间',
    software: 'R (t.test)、Python (scipy.stats.ttest_ind/ttest_rel)',
    details: 't检验适用于正态分布且方差齐性的连续型数据。常见有独立样本t检验和配对样本t检验。优点是计算简单，广泛应用于生物医学、基因组学等领域。缺点是对分布和方差有假设要求。\n\n【输入示例】\n| group | value |\n|-------|-------|\n| A     | 2.3   |\n| B     | 3.1   |\n\n【输出示例】\nt = 2.13, p = 0.04',
    example: '比较健康组与疾病组的基因表达量是否有显著差异。'
  },
  {
    id: 2,
    name: 'Mann-Whitney U检验',
    type: '非参数方法',
    category: 'nonparametric',
    description: '用于比较两组非正态分布数据的中位数差异。',
    principle: '基于秩和的非参数检验，无需正态分布假设。',
    scenario: '两组独立样本的中位数比较，如小样本或偏态分布数据。',
    inputFormat: '二维表格，包含分组标签和测量值（CSV/Excel）',
    outputFormat: 'U值、p值、中位数',
    software: 'R (wilcox.test)、Python (scipy.stats.mannwhitneyu)',
    details: 'Mann-Whitney U检验适用于非正态分布或等级数据。优点是对分布无要求，适合小样本。缺点是效率低于参数方法。\n\n【输入示例】\n| group | value |\n|-------|-------|\n| A     | 2.3   |\n| B     | 3.1   |\n\n【输出示例】\nU = 15, p = 0.08',
    example: '比较两种处理下动物体重的中位数差异。'
  },
  {
    id: 3,
    name: 'PCA主成分分析',
    type: '降维',
    category: 'dimension',
    description: '将高维数据投影到低维空间，提取主要变异信息。',
    principle: '通过特征值分解协方差矩阵，获得主成分。',
    scenario: '高维组学数据降维、可视化、去噪。',
    inputFormat: '样本×特征的矩阵（CSV/Excel）',
    outputFormat: '主成分得分、方差解释率、载荷矩阵',
    software: 'R (prcomp)、Python (sklearn.decomposition.PCA)',
    details: 'PCA适用于连续型高维数据，常用于基因表达、代谢组等。优点是降维效果好，便于可视化。缺点是仅适用于线性关系。\n\n【输入示例】\n| sample | gene1 | gene2 | ... |\n|--------|-------|-------|-----|\n| S1     | 2.1   | 3.2   | ... |\n\n【输出示例】\nPC1, PC2得分，方差解释率',
    example: '对微生物群落丰度数据进行PCA降维分析。'
  },
  {
    id: 4,
    name: 'K-means聚类',
    type: '聚类',
    category: 'clustering',
    description: '将样本分为K个簇，常用于无监督分类。',
    principle: '最小化组内平方和，迭代分配样本到最近的簇中心。',
    scenario: '样本分群、模式识别、亚型发现。',
    inputFormat: '样本×特征的矩阵（CSV/Excel）',
    outputFormat: '簇标签、簇中心、组内方差',
    software: 'R (kmeans)、Python (sklearn.cluster.KMeans)',
    details: 'K-means适用于连续型数据，需预先设定簇数。优点是算法简单高效，缺点是对初值敏感，不能处理非球状簇。\n\n【输入示例】\n| sample | feature1 | feature2 | ... |\n|--------|----------|----------|-----|\n| S1     | 2.1      | 3.2      | ... |\n\n【输出示例】\n每个样本的簇标签，簇中心',
    example: '对样本的基因表达谱进行聚类，发现亚型。'
  },
  {
    id: 5,
    name: '线性回归 (Linear Regression)',
    type: '回归',
    category: 'regression',
    description: '分析自变量与因变量之间的线性关系。',
    principle: '最小二乘法拟合直线，估计回归系数。',
    scenario: '预测、变量关系分析。',
    inputFormat: '二维表格，包含自变量和因变量（CSV/Excel）',
    outputFormat: '回归系数、R²、p值',
    software: 'R (lm)、Python (sklearn.linear_model.LinearRegression)',
    details: '线性回归适用于连续型变量。优点是解释性强，缺点是对线性关系和残差正态性有要求。\n\n【输入示例】\n| x | y |\n|---|---|\n| 1 | 2 |\n| 2 | 3 |\n\n【输出示例】\n回归系数、R²、p值',
    example: '分析体重与年龄的线性关系。'
  }
];

const StatisticalMethodsKnowledge: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [detailModal, setDetailModal] = useState<{ visible: boolean; method: any | null }>({ visible: false, method: null });

  const filteredMethods = methodsData.filter(method =>
    (selectedCategory === 'all' || method.category === selectedCategory) &&
    (method.name.toLowerCase().includes(searchText.toLowerCase()) ||
      method.description.toLowerCase().includes(searchText.toLowerCase()) ||
      method.type.includes(searchText) ||
      method.scenario.toLowerCase().includes(searchText.toLowerCase()))
  );

  return (
    <div style={{ padding: '24px', background: '#f5f7fa', minHeight: '100vh' }}>
      <Title level={2} style={{ marginBottom: 8 }}>
        <FilterOutlined style={{ marginRight: 8 }} />统计方法知识库
      </Title>
      <Paragraph style={{ color: '#666', marginBottom: 24 }}>
        收录与测序原始数据相关的常用生物信息统计方法，包括参数/非参数、多元分析、降维、聚类、回归等。每种方法均包含原理、适用情况、输入输出格式、常用软件等详细介绍。
      </Paragraph>

      {/* 分类标签 */}
      <Space style={{ marginBottom: 24 }}>
        {methodCategories.map(cat => (
          <Tag.CheckableTag
            key={cat.key}
            checked={selectedCategory === cat.key}
            onChange={() => setSelectedCategory(cat.key)}
            style={{ fontSize: 16, padding: '4px 16px' }}
          >
            {cat.label}
          </Tag.CheckableTag>
        ))}
      </Space>

      {/* 搜索和添加 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col flex="auto">
          <Search
            placeholder="搜索方法名称/简介/适用场景..."
            allowClear
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            enterButton={<SearchOutlined />}
            size="large"
          />
        </Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />} size="large">
            添加方法
          </Button>
        </Col>
      </Row>

      {/* 方法卡片列表 */}
      <Row gutter={[24, 24]}>
        {filteredMethods.map(method => (
          <Col xs={24} sm={12} md={8} lg={8} xl={6} key={method.id}>
            <Card
              hoverable
              style={{ borderRadius: 12, minHeight: 260 }}
              title={<span style={{ fontWeight: 600 }}>{method.name}</span>}
              extra={
                <Tooltip title="查看详细介绍">
                  <Button
                    type="link"
                    icon={<InfoCircleOutlined />}
                    onClick={() => setDetailModal({ visible: true, method })}
                  />
                </Tooltip>
              }
            >
              <div style={{ marginBottom: 8 }}>
                <Tag color="blue">{method.type}</Tag>
                <Tag color="geekblue">{method.category && methodCategories.find(c => c.key === method.category)?.label}</Tag>
              </div>
              <Paragraph ellipsis={{ rows: 2 }}>{method.description}</Paragraph>
              <Text type="secondary" style={{ fontSize: 13 }}>适用：{method.scenario}</Text>
              <div style={{ marginTop: 8 }}>
                <Text type="secondary" style={{ fontSize: 12 }}>输入：{method.inputFormat}</Text><br />
                <Text type="secondary" style={{ fontSize: 12 }}>输出：{method.outputFormat}</Text>
              </div>
              <div style={{ marginTop: 8 }}>
                <Text type="secondary" style={{ fontSize: 12 }}>常用软件/包：{method.software}</Text>
              </div>
            </Card>
          </Col>
        ))}
        {filteredMethods.length === 0 && (
          <Col span={24} style={{ textAlign: 'center', color: '#aaa', marginTop: 48 }}>
            暂无符合条件的方法
          </Col>
        )}
      </Row>

      {/* 详细介绍弹窗 */}
      <Modal
        open={detailModal.visible}
        title={detailModal.method?.name}
        onCancel={() => setDetailModal({ visible: false, method: null })}
        footer={null}
        width={700}
      >
        {detailModal.method && (
          <div>
            <Paragraph><b>方法类型：</b>{detailModal.method.type}</Paragraph>
            <Paragraph><b>原理简介：</b>{detailModal.method.principle}</Paragraph>
            <Paragraph><b>适用情况：</b>{detailModal.method.scenario}</Paragraph>
            <Paragraph><b>输入数据格式：</b>{detailModal.method.inputFormat}</Paragraph>
            <Paragraph><b>输出格式：</b>{detailModal.method.outputFormat}</Paragraph>
            <Paragraph><b>常用软件/包：</b>{detailModal.method.software}</Paragraph>
            <Paragraph><b>详细介绍：</b><br />{detailModal.method.details.split('\n').map((line: string, idx: number) => <span key={idx}>{line}<br /></span>)}</Paragraph>
            <Paragraph><b>典型应用：</b>{detailModal.method.example}</Paragraph>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default StatisticalMethodsKnowledge; 