import { authConstants } from '../constants/auth.constants';

export function authReducer(state = {} as any, action: any): any {
  switch (action.type) {
    case authConstants.SIGNIN_REQUEST || authConstants.REGISTER_REQUEST:
      return { loading: true };
    case authConstants.SIGNIN_SUCCESS || authConstants.REGISTER_SUCCESS:
      return {
        loading: false,
        user: action.user,
        message: '',
      };
    case authConstants.SIGNIN_ERROR || authConstants.REGISTER_ERROR:
      return {
        loading: false,
        user: {},
        message: action.message,
      };
    case authConstants.SIGNOUT:
      return {};
    default:
      return state;
  }
}
