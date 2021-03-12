import './App.scss';
import { Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './core/components/PrivateRoute/PrivateRoute';
import { routeConstants } from './core/constants/route.constants';
import Signin from './pages/Signin/Signin';
import Register from './pages/Register/Register';
import { history } from './core/helpers/history';

function App(): JSX.Element {
  return (
    <div className="main">
      <div className="container">
        <Router history={history}>
          <Switch>
            <PrivateRoute exact path={routeConstants.HOME} component={() => <div>page1</div>} />
            <PrivateRoute path={routeConstants.PAINT} component={() => <div>page2</div>} />
            <Route path={routeConstants.SIGNIN} component={Signin} />
            <Route path={routeConstants.REGISTER} component={Register} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
