import { Breadcrumb, Button, Col, Divider, Layout, Menu, message, Row, Space, theme } from 'antd';
import { AppstoreOutlined, CoffeeOutlined, DesktopOutlined } from '@ant-design/icons';
import { FC } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const breadcrumbNameMap: Record<string, string> = {
  '/example1': '案例 1',
  '/example2': '案例 2'
};

const Index: FC = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return {
      key: url,
      title: <Link to={url}>{breadcrumbNameMap[url]}</Link>
    };
  });

  const breadcrumbItems = [
    {
      title: <Link to="/">首页</Link>,
      key: 'home'
    }
  ].concat(extraBreadcrumbItems);

  return (
    <Layout style={{ height: '100%' }}>
      <Layout.Header className={'header'}>
        <Row style={{ width: '100%' }} justify={'space-between'}>
          <Col>
            <Space split={<Divider type="vertical" />}>
              <Button
                type="text"
                onClick={() => {
                  message.success('Success!');
                }}
              >
                <AppstoreOutlined />
              </Button>
              <Breadcrumb items={breadcrumbItems}></Breadcrumb>
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
  );
};

export default Index;
