import { Breadcrumb, Button, Col, ConfigProvider, Divider, Layout, Menu, MenuProps, Row, Space, theme } from 'antd';
import { AppstoreOutlined, LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { createElement, FC } from 'react';
import { Outlet } from 'react-router-dom';

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: createElement(icon),
    label: `subnav ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`
      };
    })
  };
});

const App: FC = () => {
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
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
              items={items2}
            />
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

export default App;
