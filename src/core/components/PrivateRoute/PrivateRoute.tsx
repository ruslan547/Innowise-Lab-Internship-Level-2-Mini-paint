import { Route } from 'react-router-dom';
import { Redirect, RouteProps } from 'react-router';
import { connect } from 'react-redux';
import { routeConstants } from '../../constants/route.constants';
import { RootSate } from '../../reducers/root.reducer';

export interface IPrivateRouteProps {
  component: () => JSX.Element;
  userId: string;
}

function PrivateRoute({ userId, component: Component, ...rest }: IPrivateRouteProps & RouteProps): JSX.Element {
  return (
    <Route
      {...rest}
      render={(props) => (userId ? <Component {...props} /> : <Redirect to={routeConstants.SIGNIN} />)}
    ></Route>
  );
}

function mapStateToProps({ authReducer: { userId } }: RootSate) {
  return { userId };
}

export default connect(mapStateToProps)(PrivateRoute);
