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
    PlusOutlined,
    FilterOutlined,
    BranchesOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {Breadcrumb, Button, Layout, Menu, theme} from 'antd';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Workbench from './pages/Workbench';
import MicrobiomeKnowledge from './pages/MicrobiomeKnowledge';
import DiseaseKnowledge from './pages/DiseaseKnowledge';
import NutritionKnowledge from './pages/NutritionKnowledge';
import LiteratureKnowledge from './pages/LiteratureKnowledge';
import ResearchProjects from './pages/ResearchProjects';
import RawData from './pages/RawData';
import Metadata from './pages/Metadata';
import StatisticalMethodsKnowledge from './pages/StatisticalMethodsKnowledge';
import CodeRepository from './pages/CodeRepository';
import ClassificationModels from './pages/ClassificationModels';
import Workflow from './pages/Workflow';

const {Header, Sider, Content, Footer} = Layout;

const AppContent: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    const handleAddSubject = () => {
        console.log('新增课题');
        // 这里可以添加新增课题的逻辑
    };

    const siderStyle: React.CSSProperties = {
        overflow: 'auto',
        height: '100vh',
        position: 'sticky',
        insetInlineStart: 0,
        top: 0,
        bottom: 0,
        scrollbarWidth: 'thin',
        scrollbarGutter: 'stable',
    };

    const handleMenuClick = (key: string) => {
        switch (key) {
            case '1':
                navigate('/');
                break;
            case '2':
                navigate('/microbiome');
                break;
            case '3':
                navigate('/disease');
                break;
            case '4':
                navigate('/nutrition');
                break;
            case '5':
                navigate('/literature');
                break;
            case '8-1':
                navigate('/raw-data');
                break;
            case '8-2':
                navigate('/metadata');
                break;
            case '9':
                navigate('/projects');
                break;
            case 'statistical-methods':
                navigate('/statistical-methods');
                break;
            case 'code-repository':
                navigate('/code-repository');
                break;
            case '6-1':
                navigate('/classification-models');
                break;
            case 'workflow':
                navigate('/workflow');
                break;
            default:
                break;
        }
    };

    const getSelectedKey = () => {
        const path = location.pathname;
        switch (path) {
            case '/':
                return ['1'];
            case '/microbiome':
                return ['2'];
            case '/disease':
                return ['3'];
            case '/nutrition':
                return ['4'];
            case '/literature':
                return ['5'];
            case '/raw-data':
                return ['8-1'];
            case '/metadata':
                return ['8-2'];
            case '/projects':
                return ['9'];
            case '/statistical-methods':
                return ['statistical-methods'];
            case '/code-repository':
                return ['code-repository'];
            case '/classification-models':
                return ['6-1'];
            case '/workflow':
                return ['workflow'];
            default:
                return ['1'];
        }
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
            key: '3',
            icon: <DatabaseOutlined/>,
            label: '疾病知识库',
        },
        {
            key: '4',
            icon: <ExperimentOutlined/>,
            label: '营养知识库',
        },
        {
            key: '5',
            icon: <BookOutlined/>,
            label: '文献知识库',
        },
        {
            key: 'statistical-methods',
            icon: <FilterOutlined />,
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
            key: 'code-repository',
            icon: <CodeOutlined />,
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
            key: '9',
            icon: <UploadOutlined/>,
            label: '科研项目',
        },
        {
            key: 'workflow',
            icon: <BranchesOutlined/>,
            label: '工作流',
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
                overflow: 'hidden',
                padding: 4,
                // background: '#fafafa'
            }}
        >
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{
                    background: '#f5f5f5', // 设置为白色背景
                    height: '100vh', // 确保Sider占满高度
                    overflow: 'auto', // Sider内部可滚动（如果菜单太多）
                    paddingLeft: '20px', // 增加左侧间距
                    paddingRight: '10px' // 增加右侧间距
                }}
            >
                <div className="demo-logo-vertical" style={{
                    height: '80px', // 设置logo区域高度
                    marginBottom: '20px', // 或者添加底部边距
                    // 或者同时使用：
                    // marginTop: '20px',
                }}
                >谷禾菌研</div>
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
                <Menu
                    // theme="light"
                    mode="inline"
                    selectedKeys={getSelectedKey()}
                    items={items}
                    onClick={({ key }) => handleMenuClick(key)}
                />
            </Sider>
            <Layout style={{
                background: '#fff',
                borderRadius: borderRadiusLG,
                margin: '20px 10px 20px 0', // 调整边距，减少左侧边距
                height: 'calc(100vh - 40px)', // 确保高度与侧边栏对齐
                overflow: 'hidden'
            }}>
                <Content
                    style={{
                        // margin: '24px 16px',
                        // padding: 20,
                        background: '#fff',
                        borderRadius: borderRadiusLG,
                        overflow: 'auto',
                        flex: 1,
                        height: '100%' // 确保内容区域占满高度
                    }}
                >
                    <Routes>
                        <Route path="/" element={<Workbench />} />
                        <Route path="/microbiome" element={<MicrobiomeKnowledge />} />
                        <Route path="/disease" element={<DiseaseKnowledge />} />
                        <Route path="/nutrition" element={<NutritionKnowledge />} />
                        <Route path="/literature" element={<LiteratureKnowledge />} />
                        <Route path="/raw-data" element={<RawData />} />
                        <Route path="/metadata" element={<Metadata />} />
                        <Route path="/projects" element={<ResearchProjects />} />
                        <Route path="/statistical-methods" element={<StatisticalMethodsKnowledge />} />
                        <Route path="/code-repository" element={<CodeRepository />} />
                        <Route path="/classification-models" element={<ClassificationModels />} />
                        <Route path="/workflow" element={<Workflow />} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>

        // <Layout>
        //     <Sider style={siderStyle}>
        //         <div className="demo-logo-vertical" />
        //         <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
        //     </Sider>
        //     <Layout style={{height: '100vh'}}>
        //         {/*<Header style={{ padding: 0, background: colorBgContainer }} />*/}
        //         <Content style={{ margin: '24px 16px', overflow: 'initial'}}>
        //             <div
        //                 style={{
        //                     padding: 24,
        //                     height: '90vh',
        //                     textAlign: 'center',
        //                     background: colorBgContainer,
        //                     borderRadius: borderRadiusLG,
        //                 }}
        //             >
        //                 <p>long content</p>
        //             </div>
        //         </Content>
        //         {/*<Footer style={{ textAlign: 'center' }}>*/}
        //         {/*    Ant Design ©{new Date().getFullYear()} Created by Ant UED*/}
        //         {/*</Footer>*/}
        //     </Layout>
        // </Layout>
    );


};

const App: React.FC = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
};

export default App;