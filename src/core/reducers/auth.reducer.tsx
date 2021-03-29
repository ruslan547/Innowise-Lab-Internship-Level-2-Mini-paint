import { AuthAction, User } from '../actions/auth.actions';
import { authConstants } from '../constants/auth.constants';

const initState = {
  loading: true,
  user: null,
  currentUserId: null,
};

export interface AuthState {
  loading: boolean;
  user: User | null;
  currentUserId: string | null;
}

export function authReducer(state = initState, action: AuthAction): AuthState {
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
    case authConstants.SET_CURRENT_USER_ID:
      return { ...state, currentUserId: action.payload, loading: false };
    default:
      return state;
  }
}
