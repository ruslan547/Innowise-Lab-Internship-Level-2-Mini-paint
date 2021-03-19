import { Route } from 'react-router-dom';
import { Redirect, RouteProps } from 'react-router';
import { connect } from 'react-redux';
import { routeConstants } from '../../constants/route.constants';
import { RootSate } from '../../reducers/root.reducer';
import { User } from '../../actions/auth.actions';
import { MemoExoticComponent } from 'react';

export interface PrivateRouteProps {
  component: MemoExoticComponent<() => JSX.Element>;
  user: User;
}

function PrivateRoute({ user, component: Component, ...rest }: PrivateRouteProps & RouteProps): JSX.Element {
  return (
    <Route
      {...rest}
      render={(props) => (user ? <Component {...props} /> : <Redirect to={routeConstants.SIGNIN} />)}
    ></Route>
  );
}

function mapStateToProps({ authReducer: { user } }: RootSate) {
  return { user };
}

export default connect(mapStateToProps)(PrivateRoute);
