/* eslint-disable prettier/prettier */
import { drawConstants } from '../constants/draw.constants';

const {
  NO_TOOL,
  PAINTBRUSH,
  START_DRAW,
  STOP_DRAW,
  SET_COLOR,
  SHOW_SIZE_BAR,
  HIDE_SIZE_BAR,
  SET_SIZE,
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

export type DrawActions =
  | PaintbrushAction
  | StartDrawAction
  | StopDrawAction
  | NoToolAction
  | SetColorAction
  | ShowSizeBarAction
  | HideSizeBarAction
  | SetSizeAction;
