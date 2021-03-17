import { User } from '../actions/auth.actions';
import { authConstants } from '../constants/auth.constants';

const initState = {
  loading: false,
  user: null,
};

export interface AuthState {
  loading: boolean;
  user: User | null;
}

export function authReducer(state = initState, action: any): AuthState {
  switch (action.type) {
    case authConstants.REQUEST:
      return { ...state, loading: true };
    case authConstants.SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case authConstants.ERROR:
      return { ...state, loading: false };
    case authConstants.SIGNOUT:
      return initState;
    default:
      return state;
  }
}
