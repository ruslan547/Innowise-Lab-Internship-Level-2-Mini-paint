import { authConstants } from '../constants/auth.constants';
import { routeConstants } from '../constants/route.constants';
import { history } from '../helpers/history';
import { firebaseAuthService, UserCredential } from '../services/firebase.auth.service';
import { Id, toast } from 'react-toastify';
import { ThunkAction } from 'redux-thunk';
import { AuthState } from '../reducers/auth.reducer';
import { Dispatch } from '../helpers/store';
import { firebaseDbService } from '../services/firebase.db.service';

export const authActions = {
  signin,
  register,
  signout,
};

export interface User {
  email: string;
}

toast.configure();
let toastId: Id;

interface RequestAction {
  type: typeof authConstants.REQUEST;
}

interface SuccessAction {
  type: typeof authConstants.SUCCESS;
  payload: User | null;
}

interface ErrorAction {
  type: typeof authConstants.ERROR;
}

interface SignoutAction {
  type: typeof authConstants.SIGNOUT;
}

interface SetCurrentUserIdAction {
  type: typeof authConstants.SET_CURRENT_USER_ID;
  payload: string;
}

export type AuthAction = RequestAction | SuccessAction | ErrorAction | SignoutAction | SetCurrentUserIdAction;

export type AuthThunkAction = ThunkAction<void, AuthState, unknown, AuthAction>;

function request(): RequestAction {
  return { type: authConstants.REQUEST };
}

function success(user: User | null): SuccessAction {
  return {
    type: authConstants.SUCCESS,
    payload: user,
  };
}

function error(): ErrorAction {
  return { type: authConstants.ERROR };
}

function signin(email: string, password: string): AuthThunkAction {
  return (dispatch: Dispatch) => {
    dispatch(request());

    firebaseAuthService
      .signin(email, password)
      .then(({ user }: UserCredential) => {
        if (user) {
          const { uid, email } = user;
          dispatch(success({ email: email || 'unknowk' }));
          dispatch(setCurrentUserId(uid));
          history.push(routeConstants.GALLERY);
        }
      })
      .catch(({ message }) => {
        dispatch(error());

        if (!toast.isActive(toastId)) {
          toastId = toast.error(message, { position: toast.POSITION.TOP_CENTER });
        }
      });
  };
}

function register(email: string, password: string): AuthThunkAction {
  return (dispatch) => {
    dispatch(request());

    firebaseAuthService
      .register(email, password)
      .then(({ user }: UserCredential) => {
        if (user) {
          const { uid, email } = user;
          const newUser = { email: email || 'unknowk' };
          dispatch(success(newUser));
          dispatch(setCurrentUserId(uid));
          firebaseDbService.setUserEmail(uid, newUser);
          history.push(routeConstants.GALLERY);
        }
      })
      .catch(({ message }) => {
        dispatch(error());

        if (!toast.isActive(toastId)) {
          toastId = toast.error(message, { position: toast.POSITION.TOP_CENTER });
        }
      });
  };
}

function signout(): AuthThunkAction {
  return (dispatch) => {
    firebaseAuthService.signout().then(() => {
      dispatch({ type: authConstants.SIGNOUT });
    });
  };
}

function setCurrentUserId(uid: string): SetCurrentUserIdAction {
  return {
    type: authConstants.SET_CURRENT_USER_ID,
    payload: uid,
  };
}
