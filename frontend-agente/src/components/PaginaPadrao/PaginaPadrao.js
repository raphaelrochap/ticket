import React from 'react';
import App from '../../App';

import { Layout, Menu } from 'antd';
import { HomeOutlined, TagOutlined, FileOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

//state = {
//  collapsed: false,
//};

//const { collapsed } = this.state;

const PaginaPadrao = (props) => {
  const [collapsed, setCollapsed] = React.useState(false);

  function onCollapse(collapsed) {
    console.log(collapsed);
    setCollapsed(collapsed);
    localStorage.setItem('isso', 'rocha');
  }

  const usuario = localStorage.getItem('usuario');

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        theme="dark"
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          selectedKeys={props.selecionado}
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/principal">Página principal</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<FileOutlined />}>
            <Link to="/lista-tickets">Lista de Tickets</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<TagOutlined />} title="Tags">
            <Menu.Item key="3">
              <Link to="/cadastrar-tag">Cadastrar Tag</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/listar-tags">Listar Tag</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          <div
            style={{
              color: 'white',
              fontSize: 23,
              textAlign: 'end',
              marginRight: 15,
            }}
          >
            Seja Bem vindo, {usuario}!
            <Avatar
              style={{
                color: '#1262ff',
                backgroundColor: '#b5ceff',
                margin: 6,
              }}
              //shape="square"
              size="large"
            >
              {usuario[0]}
            </Avatar>
          </div>{' '}
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <h2 style={{ padding: 10 }}>{props.titulo}</h2>
          {props.children}
        </Content>
        <Footer style={{ textAlign: 'center', backgroundColor: '#e3e3e3' }}>
          Criado por Rocha - 2021
        </Footer>
      </Layout>
    </Layout>
  );
};

export default PaginaPadrao;
