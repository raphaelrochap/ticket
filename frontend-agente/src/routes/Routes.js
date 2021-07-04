import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CadastrarTag from '../pages/CadastrarTag/CadastrarTag';
import VizualizacaoTicket from '../pages/VizualizacaoTicket/VizualizacaoTicket';
import HomePage from '../pages/HomePage/HomePage';
import ListarTags from '../pages/ListarTags/ListarTags';
import Login from '../pages/Login/Login';
import ListaTickets from '../pages/ListaTickets/ListaTickets';
import EsqueciSenha from '../pages/EsqueciSenha/EsqueciSenha';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/principal" component={HomePage}></Route>
        <Route exact path="/cadastrar-tag" component={CadastrarTag}></Route>
        <Route exact path="/listar-tags" component={ListarTags}></Route>
        <Route
          exact
          path="/vizualizacao-ticket"
          component={VizualizacaoTicket}
        ></Route>
        <Route exact path="/lista-tickets" component={ListaTickets}></Route>
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
