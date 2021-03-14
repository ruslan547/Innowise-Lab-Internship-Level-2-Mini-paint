import { combineReducers } from 'redux';
import { authReducer } from './auth.reducer';
import { drawReducer } from './draw.reducer';

export const rootReducer = combineReducers({
  authReducer,
  drawReducer,
});

export type RootSate = ReturnType<typeof rootReducer>;
