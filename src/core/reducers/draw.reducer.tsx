import { DrawActions } from '../actions/draw.actions';
import { drawConstants } from '../constants/draw.constants';

const initState = {
  tool: null,
  isDraw: false,
  color: '#000',
  isShowedSizeBar: false,
  size: '5',
  isShowedShapeBar: false,
  img: null,
  context: null,
};

export interface DrawState {
  tool: string | null;
  isDraw: boolean;
  color: string;
  isShowedSizeBar: boolean;
  size: string;
  isShowedShapeBar: boolean;
  img: HTMLImageElement | null;
  context: CanvasRenderingContext2D | null;
}

export function drawReducer(state = initState, action: DrawActions): DrawState {
  switch (action.type) {
    case drawConstants.NO_TOOL:
      return { ...state, tool: null };
    case drawConstants.PAINTBRUSH:
      return { ...state, tool: drawConstants.PAINTBRUSH };
    case drawConstants.LINE:
      return { ...state, tool: drawConstants.LINE };
    case drawConstants.RECTANGLE:
      return { ...state, tool: drawConstants.RECTANGLE };
    case drawConstants.CIRCLE:
      return { ...state, tool: drawConstants.CIRCLE };
    case drawConstants.STAR:
      return { ...state, tool: drawConstants.STAR };
    case drawConstants.HEXAGON:
      return { ...state, tool: drawConstants.HEXAGON };
    case drawConstants.START_DRAW:
      return { ...state, isDraw: true };
    case drawConstants.STOP_DRAW:
      return { ...state, isDraw: false };
    case drawConstants.SET_COLOR:
      return { ...state, color: action.payload };
    case drawConstants.SHOW_SIZE_BAR:
      return { ...state, isShowedSizeBar: true };
    case drawConstants.HIDE_SIZE_BAR:
      return { ...state, isShowedSizeBar: false };
    case drawConstants.SET_SIZE:
      return { ...state, size: action.payload };
    case drawConstants.SHOW_SHAPE_BAR:
      return { ...state, isShowedShapeBar: true };
    case drawConstants.HIDE_SHAPE_BAR:
      return { ...state, isShowedShapeBar: false };
    case drawConstants.SET_IMG:
      return { ...state, img: action.payload };
    case drawConstants.DELETE_IMG:
      return { ...state, img: null };
    case drawConstants.SET_CONTEXT:
      return { ...state, context: action.payload };
    default:
      return state;
  }
}
