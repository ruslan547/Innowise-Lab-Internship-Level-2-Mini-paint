import './App.scss';
import { Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './core/components/PrivateRoute/PrivateRoute';
import { routeConstants } from './core/constants/route.constants';
import Signin from './pages/Signin/Signin';
import Register from './pages/Register/Register';
import { history } from './core/helpers/history';
import Paint from './pages/Paint/Paint';
import Gallery from './pages/Gallery/Gallery';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { authActions } from './core/actions/auth.actions';

function App(): JSX.Element {
  const dispatch = useDispatch();

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        const { uid, email } = user;
        dispatch(authActions.success({ email: email || 'unknowk' }));
        dispatch(authActions.setCurrentUserId(uid));
        history.push(routeConstants.GALLERY);
      }
    });
  }, [dispatch]);

  return (
    <div className="main">
      <div className="container">
        <Router history={history}>
          <Switch>
            <PrivateRoute exact path={routeConstants.GALLERY} component={Gallery} />
            <PrivateRoute path={routeConstants.PAINT} component={Paint} />
            <Route path={routeConstants.SIGNIN} component={Signin} />
            <Route path={routeConstants.REGISTER} component={Register} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
