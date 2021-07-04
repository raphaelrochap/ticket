import React from 'react';
import ReactDOM from 'react-dom';
import PaginaPadrao from '../../components/PaginaPadrao/PaginaPadrao';

const HomePage = () => {
  return (
    <>
      <PaginaPadrao titulo="Página Principal" selecionado="1">
        <div>
          <h2>
            Olá Agente, Seja bem vindo à pagina principal do Sistema de
            Gerenciamento de Tickets.
          </h2>
        </div>
      </PaginaPadrao>
    </>
  );
};

export default HomePage;
