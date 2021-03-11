import './App.scss';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './core/components/PrivateRoute/PrivateRoute';
import { routeConstants } from './core/constants/route.constants';
import Signin from './pages/Signin/Signin';

function App(): JSX.Element {
  return (
    <div className="main">
      <div className="container">
        <Router basename={routeConstants.HOME}>
          <Switch>
            <PrivateRoute exact path={routeConstants.HOME} component={() => <div>page1</div>} />
            <PrivateRoute path={routeConstants.PAINT} component={() => <div>page2</div>} />
            <Route path={routeConstants.SIGNIN} component={Signin} />
            <Route path={routeConstants.REGISTER} component={() => <div>register</div>} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
