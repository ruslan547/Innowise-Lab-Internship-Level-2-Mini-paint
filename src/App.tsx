import './App.scss';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './core/components/PrivateRoute/PrivateRoute';

function App(): JSX.Element {
  return (
    <div className="main">
      <div className="container">
        <Router basename={'/'}>
          <Switch>
            <PrivateRoute exact path={'/'} component={() => <div>page1</div>} />
            <PrivateRoute path={'/paint'} component={() => <div>page2</div>} />
            <Route path={'/signin'} component={() => <div>signin</div>} />
            <Route path={'/register'} component={() => <div>register</div>} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
