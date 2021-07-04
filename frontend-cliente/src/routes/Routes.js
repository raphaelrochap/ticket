import { BrowserRouter, Switch, Route } from 'react-router-dom';
import VizualizacaoTicket from '../pages/VizualizacaoTicket/VizualizacaoTicket';
import HomePage from '../pages/HomePage/HomePage';
import Login from '../pages/Login/Login';
import ListaTickets from '../pages/ListaTickets/ListaTickets';
import EsqueciSenha from '../pages/EsqueciSenha/EsqueciSenha';
import NovoTicket from '../pages/NovoTicket/NovoTicket';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/principal" component={HomePage}></Route>
        <Route exact path="/novo-ticket" component={NovoTicket}></Route>
        <Route
          exact
          path="/vizualizacao-ticket"
          component={VizualizacaoTicket}
        ></Route>
        <Route exact path="/meus-tickets" component={ListaTickets}></Route>
        <Route
          exact
          path="/esqueci-minha-senha"
          component={EsqueciSenha}
        ></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
