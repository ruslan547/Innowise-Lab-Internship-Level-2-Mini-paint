import { MouseEvent, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setImg, hideShapeBar, hideSizeBar, startDraw, stopDraw } from '../../core/actions/draw.actions';
import PaintButton from '../../core/components/PaintButton/PaintButton';
import { drawConstants } from '../../core/constants/draw.constants';
import { RootSate } from '../../core/reducers/root.reducer';
import {
  addPoint,
  redraw,
  clearCanvas,
  drawImage,
  createImg,
  drawLine,
  drawEclipse,
  drawRectangle,
} from '../../core/services/draw.service';
import './Paint.scss';
import ToolBar from './components/DrawBar/DrawBar';

const { PAINTBRUSH, LINE, RECTANGLE, CIRCLE } = drawConstants;

export interface PaintProps {
  tool: string;
  isDraw: boolean;
  color: string;
  size: string;
  dispatch: Dispatch;
  img: HTMLImageElement;
}

function Paint({ tool, isDraw, color, size, dispatch, img }: PaintProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const startX = useRef<number>(0);
  const startY = useRef<number>(0);

  const handleMouseDown = ({ clientX, clientY }: MouseEvent) => {
    dispatch(hideSizeBar());
    dispatch(hideShapeBar());
    dispatch(startDraw());
    if (canvasRef && canvasRef.current && context && context.current) {
      const mouseX = clientX - canvasRef.current.offsetLeft;
      const mouseY = clientY - canvasRef.current.offsetTop;

      if (tool === PAINTBRUSH) {
        addPoint(mouseX, mouseY, false, color, size);
      } else if (tool === LINE || tool === CIRCLE || tool === RECTANGLE) {
        startX.current = mouseX;
        startY.current = mouseY;
      }
      if (context.current) {
        redraw(context.current);
        if (img) {
          drawImage(context.current, img);
        }
      }
    }
  };

  const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
    if (canvasRef && canvasRef.current && context && context.current) {
      const mouseX = clientX - canvasRef.current.offsetLeft;
      const mouseY = clientY - canvasRef.current.offsetTop;

      if (isDraw && tool === PAINTBRUSH) {
        addPoint(mouseX, mouseY, true, color, size);
        redraw(context.current);
        if (img) {
          drawImage(context.current, img);
        }
      } else if (isDraw && tool === LINE) {
        redraw(context.current);
        drawLine(context.current, size, color, startX.current, startY.current, mouseX, mouseY);
        if (img) {
          drawImage(context.current, img);
        }
      } else if (isDraw && tool === CIRCLE) {
        redraw(context.current);
        drawEclipse(
          context.current,
          startX.current,
          startY.current,
          mouseX - startX.current,
          mouseY - startY.current,
          color,
        );
        if (img) {
          drawImage(context.current, img);
        }
      } else if (isDraw && tool === RECTANGLE) {
        redraw(context.current);
        drawRectangle(
          context.current,
          startX.current,
          startY.current,
          mouseX - startX.current,
          mouseY - startY.current,
          color,
        );
        if (img) {
          drawImage(context.current, img);
        }
      }
    }
  };

  const handleMouseUp = () => {
    if (canvasRef && canvasRef.current) {
      dispatch(setImg(createImg(canvasRef.current)));
    }
    clearCanvas();
    dispatch(stopDraw());
  };

  const handleMouseLeave = () => {
    if (tool === PAINTBRUSH) {
      if (canvasRef && canvasRef.current) {
        dispatch(setImg(createImg(canvasRef.current)));
      }
      clearCanvas();
    }
  };

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      context.current = canvasRef.current.getContext('2d');
      if (context && context.current) {
        context.current.globalCompositeOperation = 'destination-over';
      }
    }
  }, [canvasRef, context]);

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);

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
        <ToolBar />
        <PaintButton />
      </div>
    </div>
  );
}

function mapStateToProps({ drawReducer: { tool, isDraw, color, dispatch, size, img } }: RootSate) {
  return { tool, isDraw, color, dispatch, size, img };
}

export default connect(mapStateToProps)(Paint);
