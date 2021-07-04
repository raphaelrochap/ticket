import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, Input, message, Tag } from 'antd';
import PaginaPadrao from '../../components/PaginaPadrao/PaginaPadrao';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TicketService from '../../service/TicketService';
import TagService from '../../service/TagService';
import TabelaTickets from '../../components/TabelaTickets/TabelaTickets';
import { useHistory } from 'react-router-dom';
import Moment from 'react-moment';
import moment from 'moment';

const { CheckableTag } = Tag;

const NovoTicket = () => {
  let history = useHistory();
  const [listaTags, setListaTags] = useState([]);
  const [tagsSelecionadas, SetTagsSelecionadas] = useState(['']);

  const usuario = localStorage.getItem('usuario');

  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 15 },
  };
  const tailLayout = {
    wrapperCol: { offset: 3 },
  };

  useEffect(() => {
    refreshTags();
    return () => {};
  }, []);

  const refreshTags = async () => {
    TagService.retrieveAllTags().then((response) => {
      setListaTags(response.data);
      console.log(response.data);
    });
  };

  function handleChange(tag, checked) {
    const nextSelectedTags = checked
      ? [...tagsSelecionadas, tag]
      : tagsSelecionadas.filter((t) => t !== tag);
    SetTagsSelecionadas(nextSelectedTags);
  }

  function onFinish(values) {
    console.log(tagsSelecionadas.length);
    if (tagsSelecionadas.length > 1) {
      values.criador = usuario;
      values.tags = [];
      values.mensagens = [];
      values.mensagens.push({
        texto: values.mensagem,
        usuario: usuario,
        data: moment().format('YYYY-MM-DD'),
      });

      let lista_nova = [];
      tagsSelecionadas.map((item) => {
        if (item) lista_nova.push(String(item._id));
      });
      values.tags = lista_nova;

      console.log('novo: ' + values.tags);
      TicketService.saveTicket(values);
      message.success('Ticket criado com sucesso');
      history.push('/meus-tickets');
    } else {
      message.warning('É necessário selecionar ao mínimo uma Tag!');
    }
  }

  return (
    <>
      <PaginaPadrao titulo="Novo Tickets" selecionado="2">
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Assunto"
            name="assunto"
            rules={[
              {
                required: true,
                message: 'Insira um resumo Assunto!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tags"
            name="tags"
            rules={[
              {
                required: false,
                message: 'Selecione as tags desejadas',
              },
            ]}
          >
            {listaTags.map((tag) => (
              <CheckableTag
                key={tag._id}
                checked={tagsSelecionadas.indexOf(tag) > -1}
                onChange={(checked) => handleChange(tag, checked)}
              >
                {tag.descricao}
              </CheckableTag>
            ))}
          </Form.Item>
          <Form.Item
            label="Mensagem"
            name="mensagem"
            rules={[
              {
                required: true,
                message: 'Descreva a sua dúvida para abertura do Ticket!',
              },
            ]}
          >
            <Input.TextArea rows="8" />
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

export default NovoTicket;
