import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, message, Layout, Collapse } from 'antd';
import PaginaPadrao from '../../components/PaginaPadrao/PaginaPadrao';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TicketService from '../../service/TicketService';
import TabelaTickets from '../../components/TabelaTickets/TabelaTickets';
import { useHistory } from 'react-router-dom';

const { Panel } = Collapse;
const { Header, Content } = Layout;
const { Column } = Table;

const ListaTickets = () => {
  let history = useHistory();
  const [listaTickets, setListaTickets] = useState([]);

  const usuario = localStorage.getItem('usuario');
  console.log(usuario);

  function callback(key) {
    console.log(key);
  }

  useEffect(() => {
    refreshTickets();
    return () => {};
  }, []);

  const refreshTickets = async () => {
    TicketService.retrieveAllTickets().then((response) => {
      setListaTickets(response.data);

      console.log(response.data);
    });
  };

  const remove = async (record) => {
    await TicketService.deleteTicket(record._id);
    refreshTickets();
    message.success('Ticket removido com sucesso!', 2);
  };

  const abrirTicket = async (record) => {
    history.push({
      pathname: '/vizualizacao-ticket',
      state: { ticket: record },
    });
  };

  return (
    <>
      <PaginaPadrao titulo="Lista de Tickets" selecionado="2">
        <Collapse defaultActiveKey={['1', '2']} onChange={callback}>
          <Panel header="Meus Tickets para responder" key="1">
            <TabelaTickets
              lista={listaTickets.filter((item) => {
                console.log('user: ' + item.usuario_atual);
                return item.usuario_atual === usuario;
              })}
              remove={remove}
              vizualizar={abrirTicket}
            />
          </Panel>
          <Panel header="Tickets sem responsável" key="2">
            <TabelaTickets
              lista={listaTickets.filter((item) => {
                console.log('user: ' + item.usuario_atual);
                return item.usuario_atual === '';
              })}
              remove={remove}
              vizualizar={abrirTicket}
            />
          </Panel>
          <Panel header="Meus Tickets respondidos" key="3">
            <TabelaTickets
              lista={listaTickets.filter((item) => {
                console.log('user: ' + item.usuario_atual);
                return (
                  item.usuario_atual !== usuario && item.agente === usuario
                );
              })}
              remove={remove}
              vizualizar={abrirTicket}
            />
          </Panel>
        </Collapse>
      </PaginaPadrao>
    </>
  );
};

export default ListaTickets;
