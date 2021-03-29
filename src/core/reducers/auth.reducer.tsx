import { AuthAction, User } from '../actions/auth.actions';
import { authConstants } from '../constants/auth.constants';

const initState = {
  user: null,
  currentUserId: null,
};

export interface AuthState {
  user: User | null;
  currentUserId: string | null;
}

export function authReducer(state = initState, action: AuthAction): AuthState {
  switch (action.type) {
    case authConstants.SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case authConstants.SIGNOUT:
      return initState;
    case authConstants.SET_CURRENT_USER_ID:
      return { ...state, currentUserId: action.payload };
    default:
      return state;
  }
}
