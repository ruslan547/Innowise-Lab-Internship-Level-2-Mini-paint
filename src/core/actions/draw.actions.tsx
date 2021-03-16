import { drawConstants } from '../constants/draw.constants';

const { NO_TOOL, PAINTBRUSH, START_DRAW, STOP_DRAW, SET_COLOR } = drawConstants;

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

export type DrawActions = PaintbrushAction | StartDrawAction | StopDrawAction | NoToolAction | SetColorAction;
