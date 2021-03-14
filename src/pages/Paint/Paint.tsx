import { MouseEvent, useRef } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { draw, paintbrush } from '../../core/actions/draw.actions';
import PaintButton from '../../core/components/PaintButton/PaintButton';
import { drawConstants } from '../../core/constants/draw.constants';
import { RootSate } from '../../core/reducers/root.reducer';
import { drawByPaintbrush } from '../../core/services/draw.service';
import './Paint.scss';

const { PAINTBRUSH } = drawConstants;

export interface PaintProps {
  drawingType: string;
  isDraw: boolean;
  dispatch: Dispatch;
}

function Paint({ drawingType, isDraw, dispatch }: PaintProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleMouseDown = () => {
    dispatch(draw());
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDraw) {
      if (drawingType === PAINTBRUSH) {
        drawByPaintbrush(event);
      }
    }
  };

  const handleMouseUp = () => {
    dispatch(draw());
  };

  const handlePaintbrushClick = () => {
    dispatch(paintbrush());
  };

  return (
    <div className="paint">
      <div className="toolbar">
        <PaintButton />
        <div className="toolbar__draw">
          <div className="paintbrush">
            <PaintButton onClick={handlePaintbrushClick} />
            <div className="paintbrush__setting"></div>
          </div>
        </div>
        <PaintButton />
      </div>
      <canvas
        className="mainview"
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      ></canvas>
    </div>
  );
}

function mapStateToProps({ drawReducer: { drawingType, isDraw, dispatch } }: RootSate) {
  return { drawingType, isDraw, dispatch };
}

export default connect(mapStateToProps)(Paint);
