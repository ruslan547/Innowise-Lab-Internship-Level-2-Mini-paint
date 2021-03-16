import { MouseEvent, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { hideSizeBar, startDraw, stopDraw } from '../../core/actions/draw.actions';
import PaintButton from '../../core/components/PaintButton/PaintButton';
import { drawConstants } from '../../core/constants/draw.constants';
import { RootSate } from '../../core/reducers/root.reducer';
import { addClick, drawByPaintbrush } from '../../core/services/draw.service';
import './Paint.scss';
import SizeBar from './SizeBar/SizeBar';
import ColorBar from './ColorBar/ColorBar';
import PaintBrush from './PaintBrush/PaintBrush';

const { PAINTBRUSH } = drawConstants;

export interface PaintProps {
  tool: string;
  isDraw: boolean;
  color: string;
  size: string;
  dispatch: Dispatch;
}

function Paint({ tool, isDraw, color, size, dispatch }: PaintProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);

  const handleMouseDown = (event: MouseEvent) => {
    dispatch(hideSizeBar());
    dispatch(startDraw());
    if (canvasRef && canvasRef.current) {
      const { offsetLeft, offsetTop } = canvasRef.current;
      const mouseX = event.pageX - offsetLeft;
      const mouseY = event.pageY - offsetTop;

      if (tool === PAINTBRUSH) {
        addClick(mouseX, mouseY, false, color, size);
        drawByPaintbrush(context.current);
      }
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDraw && tool === PAINTBRUSH) {
      if (canvasRef && canvasRef.current) {
        const { offsetLeft, offsetTop } = canvasRef.current;
        addClick(event.pageX - offsetLeft, event.pageY - offsetTop, true, color, size);
        drawByPaintbrush(context.current);
      }
    }
  };

  const handleMouseUp = () => {
    dispatch(stopDraw());
  };

  const handleMouseLeave = () => {
    dispatch(stopDraw());
  };

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      context.current = canvasRef.current.getContext('2d');
    }
  });

  return (
    <div className="paint">
      <canvas
        className="mainview"
        ref={canvasRef}
        width="712px"
        height="632px"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      ></canvas>
      <div className="toolbar">
        <PaintButton />
        <div className="toolbar__draw">
          <PaintBrush />
          <PaintButton>figure</PaintButton>
          <SizeBar />
          <ColorBar />
        </div>
        <PaintButton />
      </div>
    </div>
  );
}

function mapStateToProps({ drawReducer: { tool, isDraw, color, dispatch, size } }: RootSate) {
  return { tool, isDraw, color, dispatch, size };
}

export default connect(mapStateToProps)(Paint);
