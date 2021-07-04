import React from 'react';
import ReactDOM from 'react-dom';
import PaginaPadrao from '../../components/PaginaPadrao/PaginaPadrao';
import {
  Form,
  Button,
  Layout,
  Input,
  message,
  Divider,
  Card,
  TextArea,
} from 'antd';
import { useState } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import TicketService from '../../service/TicketService';
import { useHistory } from 'react-router-dom';

const tabList = [
  {
    key: 'DadosGerais',
    tab: 'Dados gerais',
  },
  {
    key: 'HistoricoComentarios',
    tab: 'Histórico de comentários',
  },
];

const { Header, Content, Footer } = Layout;

const VizualizacaoTicket = (props) => {
  let history = useHistory();
  const usuario = localStorage.getItem('usuario');

  const [key, setKey] = useState('DadosGerais');

  const ticket = props.location.state.ticket;
  const tituloCard = (
    <p style={{ fontSize: 24 }}>
      <b>{'Assunto: '}</b> {ticket.assunto}
    </p>
  );

  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 15 },
  };
  const tailLayout = {
    wrapperCol: { offset: 3 },
  };

  function onFinish(values) {
    ticket.usuario_atual = ticket.agente;
    ticket.mensagens.push({
      texto: values.parecer,
      usuario: usuario,
      data: moment().format('YYYY-MM-DD'),
    });
    TicketService.updateTicket(ticket._id, ticket);
    message.success('Ticket respondido com sucesso');
    history.push('/meus-tickets');
  }

  const contentList = {
    DadosGerais: (
      <div>
        <p style={{ fontSize: 18 }}>
          <b>Usuário Atual: </b>
          {ticket.usuario_atual}
        </p>
        <p style={{ fontSize: 18 }}>
          <b>Criador: </b>
          {ticket.criador}
        </p>
        <p style={{ fontSize: 18 }}>
          <b>Tags:</b>
          {ticket.tags.map((tag) => {
            return <p style={{ margin: 5 }}>{tag.descricao}</p>;
          })}
        </p>
      </div>
    ),
    HistoricoComentarios: (
      <p>
        {ticket.mensagens.map((mensagem) => {
          return (
            <Card
              style={{ marginTop: 10 }}
              title={
                <>
                  <b>Data: </b>
                  <Moment format="DD/MM/YYYY">{mensagem.data}</Moment>
                  <br />
                  <b>Usuário: </b>
                  {mensagem.usuario}
                </>
              }
            >
              <p style={{ fontSize: 22 }}>{mensagem.texto}</p>
            </Card>
          );
        })}
        <br />
        <Divider orientation="left" plain>
          <p style={{ fontSize: 20 }}>Incluir parecer</p>
        </Divider>
        <br />
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Parecer"
            name="parecer"
            rules={[
              {
                required: true,
                message: 'Insira um parecer!',
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button
              disabled={ticket.usuario_atual !== ticket.criador}
              type="primary"
              htmlType="submit"
            >
              Gravar
            </Button>
          </Form.Item>
        </Form>
      </p>
    ),
  };

  return (
    <>
      <PaginaPadrao titulo="" selecionado="2">
        <Card
          style={{ width: '100%' }}
          title={tituloCard}
          tabList={tabList}
          activeTabKey={key}
          onTabChange={(key) => {
            setKey(key);
          }}
        >
          {contentList[key]}
        </Card>
      </PaginaPadrao>
    </>
  );
};

export default VizualizacaoTicket;
