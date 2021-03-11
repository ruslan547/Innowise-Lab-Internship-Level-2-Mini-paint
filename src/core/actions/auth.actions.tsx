import { authConstants } from '../constants/auth.constants';
import { routeConstants } from '../constants/route.constants';
import { history } from '../helpers/history';
import { firebaseAuthService } from '../services/firebase.auth.service';
import { toast } from 'react-toastify';

export const authActions = {
  signin,
  register,
  signout,
};

export interface User {
  uid: string;
}

toast.configure();
let toastId: string | number;

function signin(email: string, password: string): any {
  const request = () => ({ type: authConstants.SIGNIN_REQUEST });
  const success = (user: User) => ({ type: authConstants.SIGNIN_SUCCESS, user });
  const error = () => ({ type: authConstants.SIGNIN_ERROR });

  return (dispatch: any) => {
    dispatch(request());

    firebaseAuthService
      .signin(email, password)
      .then(({ user }) => {
        dispatch(success(user as User));
        history.push(routeConstants.HOME);
      })
      .catch(({ message }) => {
        dispatch(error());
        if (!toast.isActive(toastId)) {
          toastId = toast.error(message, { position: toast.POSITION.TOP_CENTER });
        }
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
        history.push(routeConstants.HOME);
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
