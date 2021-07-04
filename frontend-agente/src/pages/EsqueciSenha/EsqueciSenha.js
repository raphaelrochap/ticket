import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { useHistory } from 'react-router-dom';

const EsqueciSenha = () => {
  let history = useHistory();
  const [username, Setusername] = React.useState('');

  function handleInputChange(e) {
    Setusername(e.target.value);
  }

  const onFinish = (e) => {
    console.log('Tstes');
    localStorage.setItem('usuario', username);
    history.push('/');
    //this.setState({});
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login-form">
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="E-mail"
          name="email"
          rules={[
            {
              required: true,
              message: 'Por favor insira um E-mail!',
            },
          ]}
        >
          <Input onChange={handleInputChange} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Enviar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EsqueciSenha;
