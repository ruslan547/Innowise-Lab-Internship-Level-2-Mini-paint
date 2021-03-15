import { drawConstants } from '../constants/draw.constants';

const { PAINTBRUSH, START_DRAW, STOP_DRAW } = drawConstants;

interface PaintbrushAction {
  type: typeof PAINTBRUSH;
}

interface StartDrawAction {
  type: typeof START_DRAW;
}

interface StopDrawAction {
  type: typeof STOP_DRAW;
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

export type DrawActions = PaintbrushAction | StartDrawAction | StopDrawAction;
