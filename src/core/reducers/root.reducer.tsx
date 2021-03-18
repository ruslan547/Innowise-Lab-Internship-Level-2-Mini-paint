import { combineReducers } from 'redux';
import { authReducer } from './auth.reducer';
import { drawReducer } from './draw.reducer';
import { showReducer } from './show.reducer';

export const rootReducer = combineReducers({
  authReducer,
  drawReducer,
  showReducer,
});

export type RootSate = ReturnType<typeof rootReducer>;
