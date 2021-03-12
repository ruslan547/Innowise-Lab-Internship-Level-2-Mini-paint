import { authConstants } from '../constants/auth.constants';

const initState = {
  loading: false,
  userId: null,
};

export interface AuthState {
  loading: boolean;
  userId: string | null | undefined;
}

export function authReducer(state = initState, action: any): AuthState {
  switch (action.type) {
    case authConstants.REQUEST:
      return { ...state, loading: true };
    case authConstants.SUCCESS:
      return {
        ...state,
        loading: false,
        userId: action.payload,
      };
    case authConstants.ERROR:
      return { ...state, loading: false };
    case authConstants.SIGNOUT:
      return initState;
    default:
      return state;
  }
}
