import { Route } from 'react-router-dom';
import { Redirect, RouteProps } from 'react-router';
import { connect } from 'react-redux';
import { User } from '../../actions/auth.actions';
import { routeConstants } from '../../constants/route.constants';
import { IAuthSate } from '../../reducers/auth.reducer';

export interface IPrivateRouteProps {
  component: () => JSX.Element;
  user: User | null;
}

function PrivateRoute({ user, component: Component, ...rest }: IPrivateRouteProps & RouteProps): JSX.Element {
  return (
    <Route
      {...rest}
      render={(props) => (user ? <Component {...props} /> : <Redirect to={routeConstants.SIGNIN} />)}
    ></Route>
  );
}

function mapStateToProps({ authReducer: { user } }: IAuthSate) {
  return { user };
}

export default connect(mapStateToProps)(PrivateRoute);
