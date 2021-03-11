import { authConstants } from '../constants/auth.constants';
import { firebaseAuthService } from '../services/firebase.auth.service';

export const authActions = {
  signin,
  register,
  signout,
};

export interface User {
  uid: string;
}

function signin(email: string, password: string): any {
  const request = () => ({ type: authConstants.SIGNIN_REQUEST });
  const success = (user: User) => ({ type: authConstants.SIGNIN_SUCCESS, user });
  const error = (message: string) => ({ type: authConstants.SIGNIN_ERROR, message, loading: false });

  return (dispatch: any) => {
    dispatch(request());

    firebaseAuthService
      .signin(email, password)
      .then(({ user }) => {
        dispatch(success(user as User));
      })
      .catch(({ message }) => {
        dispatch(error(message));
      });
  };
}

function register(email: string, password: string): any {
  const request = () => ({ type: authConstants.REGISTER_REQUEST });
  const success = (user: User) => ({ type: authConstants.REGISTER_SUCCESS, user });
  const error = (message: string) => ({ type: authConstants.REGISTER_ERROR, message });

  return (dispatch: any) => {
    dispatch(request());

    firebaseAuthService
      .register(email, password)
      .then(({ user }) => {
        dispatch(success(user as User));
      })
      .catch(({ message }) => {
        dispatch(error(message));
      });
  };
}

function signout(): any {
  return (dispatch: any) => {
    firebaseAuthService.signout().then(() => {
      dispatch({ type: authConstants.SIGNOUT });
    });
  };
}
