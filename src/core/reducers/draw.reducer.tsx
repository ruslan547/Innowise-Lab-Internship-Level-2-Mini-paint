import { DrawActions } from '../actions/draw.actions';
import { drawConstants } from '../constants/draw.constants';

const { PAINTBRUSH, START_DRAW, STOP_DRAW } = drawConstants;

const initState = {
  tool: null,
  isDraw: false,
};

export interface DrawState {
  tool: string | null;
  isDraw: boolean;
}

export function drawReducer(state = initState, action: DrawActions): DrawState {
  switch (action.type) {
    case PAINTBRUSH:
      return { ...state, tool: PAINTBRUSH };
    case START_DRAW:
      return { ...state, isDraw: true };
    case STOP_DRAW:
      return { ...state, isDraw: false };
    default:
      return state;
  }
}
