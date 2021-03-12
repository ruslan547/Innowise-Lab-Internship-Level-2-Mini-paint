import { User } from '../actions/auth.actions';
import { authConstants } from '../constants/auth.constants';

const initState = {
  loading: false,
  user: null,
};

export interface IAuthSate {
  authReducer: {
    user: User | null;
    loading: boolean;
  };
}

export function authReducer(state = initState, action: any): any {
  switch (action.type) {
    case authConstants.SIGNIN_REQUEST || authConstants.REGISTER_REQUEST:
      return { loading: true };
    case authConstants.SIGNIN_SUCCESS || authConstants.REGISTER_SUCCESS:
      return {
        loading: false,
        user: action.user,
      };
    case authConstants.SIGNIN_ERROR || authConstants.REGISTER_ERROR:
      return {
        loading: false,
        user: null,
      };
    case authConstants.SIGNOUT:
      return initState;
    default:
      return state;
  }
}
