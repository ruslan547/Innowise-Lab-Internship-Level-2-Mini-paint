import { drawConstants } from '../constants/draw.constants';

export const drawActions = {
  noTool,
  paintbrush,
  startDraw,
  stopDraw,
  setColor,
  showSizeBar,
  hideSizeBar,
  setSize,
  showShapeBar,
  hideShapeBar,
  line,
  rectangle,
  circle,
  star,
  setImg,
  deleteImg,
  setContext,
};

interface NoToolAction {
  type: typeof drawConstants.NO_TOOL;
}

interface PaintbrushAction {
  type: typeof drawConstants.PAINTBRUSH;
}

interface StartDrawAction {
  type: typeof drawConstants.START_DRAW;
}

interface StopDrawAction {
  type: typeof drawConstants.STOP_DRAW;
}

interface SetColorAction {
  type: typeof drawConstants.SET_COLOR;
  payload: string;
}

interface ShowSizeBarAction {
  type: typeof drawConstants.SHOW_SIZE_BAR;
}

interface HideSizeBarAction {
  type: typeof drawConstants.HIDE_SIZE_BAR;
}

interface SetSizeAction {
  type: typeof drawConstants.SET_SIZE;
  payload: string;
}

interface ShowShapeBarAction {
  type: typeof drawConstants.SHOW_SHAPE_BAR;
}

interface HideShapeBarAction {
  type: typeof drawConstants.HIDE_SHAPE_BAR;
}

interface LineAction {
  type: typeof drawConstants.LINE;
}

interface RectangleAction {
  type: typeof drawConstants.RECTANGLE;
}

interface CircleAction {
  type: typeof drawConstants.CIRCLE;
}

interface SetImgAction {
  type: typeof drawConstants.SET_IMG;
  payload: HTMLImageElement;
}

interface DeleteImgAction {
  type: typeof drawConstants.DELETE_IMG;
}

interface SetContextAction {
  type: typeof drawConstants.SET_CONTEXT;
  payload: CanvasRenderingContext2D | null;
}

interface StarAction {
  type: typeof drawConstants.STAR;
}

function noTool(): NoToolAction {
  return { type: drawConstants.NO_TOOL };
}

function paintbrush(): PaintbrushAction {
  return { type: drawConstants.PAINTBRUSH };
}

function startDraw(): StartDrawAction {
  return { type: drawConstants.START_DRAW };
}

function stopDraw(): StopDrawAction {
  return { type: drawConstants.STOP_DRAW };
}

function setColor(color: string): SetColorAction {
  return {
    type: drawConstants.SET_COLOR,
    payload: color,
  };
}

function showSizeBar(): ShowSizeBarAction {
  return { type: drawConstants.SHOW_SIZE_BAR };
}

function hideSizeBar(): HideSizeBarAction {
  return { type: drawConstants.HIDE_SIZE_BAR };
}

function setSize(size: string): SetSizeAction {
  return {
    type: drawConstants.SET_SIZE,
    payload: size,
  };
}

function showShapeBar(): ShowShapeBarAction {
  return { type: drawConstants.SHOW_SHAPE_BAR };
}

function hideShapeBar(): HideShapeBarAction {
  return { type: drawConstants.HIDE_SHAPE_BAR };
}

function line(): LineAction {
  return { type: drawConstants.LINE };
}

function rectangle(): RectangleAction {
  return { type: drawConstants.RECTANGLE };
}

function circle(): CircleAction {
  return { type: drawConstants.CIRCLE };
}

function star(): StarAction {
  return { type: drawConstants.STAR };
}

function setImg(img: HTMLImageElement): SetImgAction {
  return {
    type: drawConstants.SET_IMG,
    payload: img,
  };
}

function deleteImg(): DeleteImgAction {
  return { type: drawConstants.DELETE_IMG };
}

function setContext(context: CanvasRenderingContext2D | null): SetContextAction {
  return {
    type: drawConstants.SET_CONTEXT,
    payload: context,
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
  | StarAction
  | SetImgAction
  | DeleteImgAction
  | SetContextAction;
