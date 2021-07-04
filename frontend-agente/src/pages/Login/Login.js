import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { useHistory, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  let history = useHistory();
  const [username, Setusername] = React.useState('');

  function handleInputChange(e) {
    Setusername(e.target.value);
  }

  const onFinish = (e) => {
    console.log('Tstes');
    localStorage.setItem('usuario', username);
    history.push('/principal');
    //this.setState({});
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login-form">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Usuário"
          name="usuario"
          rules={[
            {
              required: true,
              message: 'Por favor insira um nome de usuário!',
            },
          ]}
        >
          <Input onChange={handleInputChange} />
        </Form.Item>

        <Form.Item
          label="Senha"
          name="senha"
          rules={[
            {
              required: true,
              message: 'Por favor insira sua senha',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Entrar
          </Button>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <a className="login-form-forgot" href="">
            <Link to="/esqueci-minha-senha">Esqueci minha senha</Link>
          </a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
