import { DrawActions } from '../actions/draw.actions';
import { drawConstants } from '../constants/draw.constants';

const { PAINTBRUSH, DRAW } = drawConstants;

const initState = {
  drawingType: null,
  isDraw: false,
};

export interface DrawState {
  drawingType: string | null;
  isDraw: boolean;
}

export function drawReducer(state = initState, action: DrawActions): DrawState {
  switch (action.type) {
    case PAINTBRUSH:
      return { ...state, drawingType: PAINTBRUSH };
    case DRAW:
      return { ...state, isDraw: !state.isDraw };
    default:
      return state;
  }
}
