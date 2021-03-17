import { drawConstants } from '../constants/draw.constants';

const {
  NO_TOOL,
  PAINTBRUSH,
  LINE,
  RECTANGLE,
  CIRCLE,
  START_DRAW,
  STOP_DRAW,
  SET_COLOR,
  SHOW_SIZE_BAR,
  HIDE_SIZE_BAR,
  SET_SIZE,
  SHOW_SHAPE_BAR,
  HIDE_SHAPE_BAR,
  SET_IMG,
} = drawConstants;

interface NoToolAction {
  type: typeof NO_TOOL;
}

interface PaintbrushAction {
  type: typeof PAINTBRUSH;
}

interface StartDrawAction {
  type: typeof START_DRAW;
}

interface StopDrawAction {
  type: typeof STOP_DRAW;
}

interface SetColorAction {
  type: typeof SET_COLOR;
  payload: string;
}

interface ShowSizeBarAction {
  type: typeof SHOW_SIZE_BAR;
}

interface HideSizeBarAction {
  type: typeof HIDE_SIZE_BAR;
}

interface SetSizeAction {
  type: typeof SET_SIZE;
  payload: string;
}

interface ShowShapeBarAction {
  type: typeof SHOW_SHAPE_BAR;
}

interface HideShapeBarAction {
  type: typeof HIDE_SHAPE_BAR;
}

interface LineAction {
  type: typeof LINE;
}

interface RectangleAction {
  type: typeof RECTANGLE;
}

interface CircleAction {
  type: typeof CIRCLE;
}

interface SetImgAction {
  type: typeof SET_IMG;
  payload: HTMLImageElement;
}

export function noTool(): NoToolAction {
  return { type: NO_TOOL };
}

export function paintbrush(): PaintbrushAction {
  return { type: PAINTBRUSH };
}

export function startDraw(): StartDrawAction {
  return { type: START_DRAW };
}

export function stopDraw(): StopDrawAction {
  return { type: STOP_DRAW };
}

export function setColor(color: string): SetColorAction {
  return {
    type: SET_COLOR,
    payload: color,
  };
}

export function showSizeBar(): ShowSizeBarAction {
  return { type: SHOW_SIZE_BAR };
}

export function hideSizeBar(): HideSizeBarAction {
  return { type: HIDE_SIZE_BAR };
}

export function setSize(size: string): SetSizeAction {
  return {
    type: SET_SIZE,
    payload: size,
  };
}

export function showShapeBar(): ShowShapeBarAction {
  return { type: SHOW_SHAPE_BAR };
}

export function hideShapeBar(): HideShapeBarAction {
  return { type: HIDE_SHAPE_BAR };
}

export function line(): LineAction {
  return { type: LINE };
}

export function rectangle(): RectangleAction {
  return { type: RECTANGLE };
}

export function circle(): CircleAction {
  return { type: CIRCLE };
}

export function setImg(img: HTMLImageElement): SetImgAction {
  return {
    type: SET_IMG,
    payload: img,
  };
}

export type DrawActions =
  | PaintbrushAction
  | StartDrawAction
  | StopDrawAction
  | NoToolAction
  | SetColorAction
  | ShowSizeBarAction
  | HideSizeBarAction
  | SetSizeAction
  | ShowShapeBarAction
  | HideShapeBarAction
  | LineAction
  | RectangleAction
  | CircleAction
  | SetImgAction;
