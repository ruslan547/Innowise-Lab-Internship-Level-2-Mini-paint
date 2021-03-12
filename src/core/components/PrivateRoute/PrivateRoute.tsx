import { Route } from 'react-router-dom';
import { Redirect, RouteProps } from 'react-router';
import { connect } from 'react-redux';
import { User } from '../../actions/auth.actions';
import { routeConstants } from '../../constants/route.constants';

export interface IPrivateRouteProps {
  component: () => JSX.Element;
  user: User;
}

function PrivateRoute({ user, component: Component, ...rest }: IPrivateRouteProps & RouteProps): JSX.Element {
  return (
    <Route
      {...rest}
      render={(props) => (user ? <Component {...props} /> : <Redirect to={routeConstants.SIGNIN} />)}
    ></Route>
  );
}

function mapStateToProps(store: any) {
  const { user } = store.authReducer;
  return { user };
}

export default connect(mapStateToProps)(PrivateRoute);
