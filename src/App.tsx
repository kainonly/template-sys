import {
  Breadcrumb,
  Button,
  Card,
  Col,
  ConfigProvider,
  Divider,
  Input,
  Layout,
  Menu,
  MenuProps,
  Row,
  Space,
  Table,
  Tag,
  theme
} from 'antd';
import {
  AppstoreOutlined,
  ClearOutlined,
  FilterOutlined,
  LaptopOutlined,
  NotificationOutlined,
  ReloadOutlined,
  UserOutlined
} from '@ant-design/icons';
import React, { ReactNode } from 'react';
import { ColumnsType } from 'antd/es/table';

const { Header, Content, Sider } = Layout;

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
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

const title: ReactNode = (
  <Space>
    <Input placeholder="搜索关键词" style={{ width: 180 }} bordered={false} />
    <Button.Group>
      <Button type="text">
        <ReloadOutlined />
      </Button>
      <Button type="text">
        <ClearOutlined />
      </Button>
      <Button type="text">
        <FilterOutlined />
      </Button>
    </Button.Group>
  </Space>
);

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    )
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    )
  }
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
];

const App: React.FC = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  return (
    <ConfigProvider>
      <Layout style={{ height: '100%' }}>
        <Header className={'header'}>
          <Row style={{ width: '100%' }} justify={'space-between'}>
            <Col>
              <Space split={<Divider type="vertical" />}>
                <Button type="text">
                  <AppstoreOutlined />
                </Button>
                <Breadcrumb>
                  <Breadcrumb.Item>首页</Breadcrumb.Item>
                  <Breadcrumb.Item>List</Breadcrumb.Item>
                  <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
              </Space>
            </Col>
            <Col></Col>
            <Col>C</Col>
          </Row>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: colorBgContainer }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
              items={items2}
            />
          </Sider>
          <Layout style={{ padding: '6px 8px 0' }}>
            <Content>
              <Card title={title} extra={<Button type="primary">新增</Button>}>
                <Table size={'middle'} columns={columns} dataSource={data} />
              </Card>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
