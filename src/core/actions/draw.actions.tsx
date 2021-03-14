import { drawConstants } from '../constants/draw.constants';

const { PAINTBRUSH, DRAW } = drawConstants;

interface PaintbrushAction {
  type: typeof PAINTBRUSH;
}

interface DrawAction {
  type: typeof DRAW;
}

export function paintbrush(): PaintbrushAction {
  return { type: PAINTBRUSH };
}

export function draw(): DrawAction {
  return { type: DRAW };
}

export type DrawActions = PaintbrushAction | DrawAction;
