import './App.scss';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './core/components/PrivateRoute/PrivateRoute';
import { SIGNIN, REGISTER, HOME, PAINT } from './core/constants/routeConstants';

function App(): JSX.Element {
  return (
    <div className="main">
      <div className="container">
        <Router basename={HOME}>
          <Switch>
            <PrivateRoute exact path={HOME} component={() => <div>page1</div>} />
            <PrivateRoute path={PAINT} component={() => <div>page2</div>} />
            <Route path={SIGNIN} component={() => <div>signin</div>} />
            <Route path={REGISTER} component={() => <div>register</div>} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
