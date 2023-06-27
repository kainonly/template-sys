import { Breadcrumb, Button, Col, ConfigProvider, Divider, Layout, Menu, Row, Space, theme } from 'antd';
import { AppstoreOutlined, CoffeeOutlined, DesktopOutlined, HomeOutlined } from '@ant-design/icons';
import { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './index.scss';

const Index: FC = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  return (
    <ConfigProvider>
      <Layout style={{ height: '100%' }}>
        <Layout.Header className={'header'}>
          <Row style={{ width: '100%' }} justify={'space-between'}>
            <Col>
              <Space split={<Divider type="vertical" />}>
                <Button
                  type="text"
                  onClick={() => {
                    console.log('ok');
                  }}
                >
                  <AppstoreOutlined />
                </Button>
                <Breadcrumb items={[{ title: '首页' }, { title: 'List' }, { title: 'App' }]}></Breadcrumb>
              </Space>
            </Col>
            <Col></Col>
            <Col>C</Col>
          </Row>
        </Layout.Header>
        <Layout>
          <Layout.Sider width={200} style={{ background: colorBgContainer }}>
            <Menu
              mode="inline"
              style={{ height: '100%', borderRight: 0 }}
              items={[
                { key: 'index', icon: <HomeOutlined />, label: <Link to={'/'}>首页</Link> },
                { key: 'example1', icon: <DesktopOutlined />, label: <Link to={'/example1'}>案例 1</Link> },
                { key: 'example2', icon: <CoffeeOutlined />, label: <Link to={'/example2'}>案例 2</Link> }
              ]}
            ></Menu>
          </Layout.Sider>
          <Layout style={{ padding: '6px 8px 0' }}>
            <Layout.Content>
              <Outlet />
            </Layout.Content>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default Index;
