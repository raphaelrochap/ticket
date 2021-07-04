import React from 'react';
import ReactDOM from 'react-dom';
import PaginaPadrao from '../../components/PaginaPadrao/PaginaPadrao';
import TagService from '../../service/TagService';
import {
  Form,
  Button,
  message,
  DatePicker,
  Layout,
  Menu,
  Input,
  InputNumber,
} from 'antd';
const { Header, Content, Footer } = Layout;

const CadastrarTag = () => {
  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 15 },
  };

  const tailLayout = {
    wrapperCol: { offset: 3 },
  };

  function onFinish(values) {
    TagService.saveTag(values);
    message.success('Tag cadastrada com sucesso!');
  }

  return (
    <>
      <PaginaPadrao titulo="Cadastrar Tag" selecionado="3">
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: false }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Descrição"
            name="descricao"
            rules={[
              {
                required: true,
                message: 'Insira a descrição da Tag',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Gravar
            </Button>
          </Form.Item>
        </Form>
      </PaginaPadrao>
    </>
  );
};

export default CadastrarTag;
