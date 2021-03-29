import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router';
import { auth } from '../../firebase';
import { authActions } from '../actions/auth.actions';
import Loader from './Loader/Loader';

export interface AuthRouteProps {
  children: JSX.Element[];
}

function AuthRoute({ children }: AuthRouteProps): JSX.Element {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        const { uid, email } = user;
        dispatch(authActions.success({ email: email || 'unknowk' }));
        dispatch(authActions.setCurrentUserId(uid));
      }
      setLoading(false);
    });
  }, [dispatch]);

  return <Route>{loading ? <Loader /> : children}</Route>;
}

export default AuthRoute;
