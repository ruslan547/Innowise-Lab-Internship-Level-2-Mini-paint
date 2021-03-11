import { Route } from 'react-router-dom';
import { RouteProps } from 'react-router';
import { connect } from 'react-redux';
import Loader from '../Loader/Loader';

export interface IPrivateRouteProps {
  component: () => JSX.Element;
  loading: boolean;
}

function PrivateRoute({ loading, component: Component, ...rest }: IPrivateRouteProps & RouteProps): JSX.Element {
  return <Route {...rest} render={(props) => (loading ? <Loader /> : <Component {...props} />)}></Route>;
}

function mapStateToProps(store: any) {
  const { loading } = store.authReducer;
  return { loading };
}

export default connect(mapStateToProps)(PrivateRoute);
