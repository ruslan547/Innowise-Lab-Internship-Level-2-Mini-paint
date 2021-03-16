import { DrawActions } from '../actions/draw.actions';
import { drawConstants } from '../constants/draw.constants';

const { NO_TOOL, PAINTBRUSH, START_DRAW, STOP_DRAW, SET_COLOR, SHOW_SIZE_BAR, HIDE_SIZE_BAR, SET_SIZE } = drawConstants;

const initState = {
  tool: null,
  isDraw: false,
  color: '#000',
  isShowedSizeBar: false,
  size: '5',
};

export interface DrawState {
  tool: string | null;
  isDraw: boolean;
  color: string;
  isShowedSizeBar: boolean;
  size: string;
}

export function drawReducer(state = initState, action: DrawActions): DrawState {
  switch (action.type) {
    case NO_TOOL:
      return { ...state, tool: null };
    case PAINTBRUSH:
      return { ...state, tool: PAINTBRUSH };
    case START_DRAW:
      return { ...state, isDraw: true };
    case STOP_DRAW:
      return { ...state, isDraw: false };
    case SET_COLOR:
      return { ...state, color: action.payload };
    case SHOW_SIZE_BAR:
      return { ...state, isShowedSizeBar: true };
    case HIDE_SIZE_BAR:
      return { ...state, isShowedSizeBar: false };
    case SET_SIZE:
      return { ...state, size: action.payload };
    default:
      return state;
  }
}
