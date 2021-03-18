/* eslint-disable prettier/prettier */
import { Route } from 'react-router-dom';
import { Redirect, RouteProps } from 'react-router';
import { connect, ConnectedComponent } from 'react-redux';
import { routeConstants } from '../../constants/route.constants';
import { RootSate } from '../../reducers/root.reducer';
import { PaintProps } from '../../../pages/Paint/Paint';
import { User } from '../../actions/auth.actions';
import { GalleryProps } from '../../../pages/Gallery/Gallery';

export interface IPrivateRouteProps {
  component:
  | ConnectedComponent<
    ({ tool, isDraw, color, size, dispatch, img }: PaintProps) => JSX.Element,
    Omit<PaintProps, 'tool' | 'isDraw' | 'dispatch' | 'color' | 'size' | 'img'>
  >
  | ConnectedComponent<({ user }: GalleryProps) => JSX.Element, Omit<GalleryProps, 'user'>>;
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

function mapStateToProps({ authReducer: { user } }: RootSate) {
  return { user };
}

export default connect(mapStateToProps)(PrivateRoute);
