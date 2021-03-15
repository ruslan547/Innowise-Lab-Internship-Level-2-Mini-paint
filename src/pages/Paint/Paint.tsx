import { MouseEvent, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { paintbrush, startDraw, stopDraw } from '../../core/actions/draw.actions';
import PaintButton from '../../core/components/PaintButton/PaintButton';
import { drawConstants } from '../../core/constants/draw.constants';
import { RootSate } from '../../core/reducers/root.reducer';
import { addClick, drawByPaintbrush } from '../../core/services/draw.service';
import './Paint.scss';
import drawbrush from '../../assets/img/drawbrush.svg';

const { PAINTBRUSH } = drawConstants;

export interface PaintProps {
  tool: string;
  isDraw: boolean;
  dispatch: Dispatch;
}

function Paint({ tool, isDraw, dispatch }: PaintProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);

  const handlePaintbtushClick = () => {
    dispatch(paintbrush());
  };

  const handleMouseDown = (event: MouseEvent) => {
    dispatch(startDraw());
    if (canvasRef && canvasRef.current) {
      const { offsetLeft, offsetTop } = canvasRef.current;
      addClick(event.pageX - offsetLeft, event.pageY - offsetTop);
      drawByPaintbrush(context.current);
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDraw && tool === PAINTBRUSH) {
      if (canvasRef && canvasRef.current) {
        const { offsetLeft, offsetTop } = canvasRef.current;
        addClick(event.pageX - offsetLeft, event.pageY - offsetTop, true);
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
          <div className="paintbrush">
            <PaintButton value={drawbrush} onClick={handlePaintbtushClick} />
            <div className="paintbrush__setting"></div>
          </div>
        </div>
        <PaintButton />
      </div>
    </div>
  );
}

function mapStateToProps({ drawReducer: { tool, isDraw, dispatch } }: RootSate) {
  return { tool, isDraw, dispatch };
}

export default connect(mapStateToProps)(Paint);
