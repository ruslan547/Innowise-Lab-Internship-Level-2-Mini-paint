import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Route } from 'react-router';
import { auth } from '../../firebase';
import { authActions } from '../actions/auth.actions';
import { RootSate } from '../reducers/root.reducer';
import Loader from './Loader/Loader';

export interface AuthRouteProps {
  children: JSX.Element[];
  loading: boolean;
}

function AuthRoute({ loading, children }: AuthRouteProps): JSX.Element {
  const dispatch = useDispatch();

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        const { uid, email } = user;
        dispatch(authActions.success({ email: email || 'unknowk' }));
        dispatch(authActions.setCurrentUserId(uid));
      }
      dispatch(authActions.setCurrentUserId(null));
    });
  }, [dispatch]);

  return <Route>{loading ? <Loader /> : children}</Route>;
}

function mapStateToProps({ authReducer: { loading } }: RootSate) {
  return { loading };
}

export default connect(mapStateToProps)(AuthRoute);
