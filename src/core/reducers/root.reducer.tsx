import { combineReducers } from 'redux';
import { authReducer } from './auth.reducer';

export const rootReducer = combineReducers({
  authReducer,
});

export type RootSate = ReturnType<typeof rootReducer>;
