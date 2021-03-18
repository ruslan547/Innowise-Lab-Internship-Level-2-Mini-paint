import { MouseEvent, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { drawConstants } from '../../core/constants/draw.constants';
import { RootSate } from '../../core/reducers/root.reducer';
import './Paint.scss';
import { drawActions } from '../../core/actions/draw.actions';
import { drawService } from '../../core/services/draw.service';
import PaintToolBar from './components/PaintToolBar/PaintToolBar';

const { PAINTBRUSH, LINE, RECTANGLE, CIRCLE } = drawConstants;

export interface PaintProps {
  tool: string;
  isDraw: boolean;
  color: string;
  size: string;
  dispatch: Dispatch;
  img: HTMLImageElement;
  context: CanvasRenderingContext2D | null;
}

function Paint({ tool, isDraw, color, size, dispatch, img, context }: PaintProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const startX = useRef<number>(0);
  const startY = useRef<number>(0);

  const handleMouseDown = ({ clientX, clientY }: MouseEvent) => {
    dispatch(drawActions.hideSizeBar());
    dispatch(drawActions.hideShapeBar());
    dispatch(drawActions.startDraw());
    if (canvasRef && canvasRef.current && context) {
      const mouseX = clientX - canvasRef.current.offsetLeft;
      const mouseY = clientY - canvasRef.current.offsetTop;

      if (tool === PAINTBRUSH) {
        drawService.addPoint(mouseX, mouseY, false, color, size);
      } else {
        startX.current = mouseX;
        startY.current = mouseY;
      }

      drawService.redraw(context);

      if (img) {
        drawService.drawImage(context, img);
      }
    }
  };

  const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
    if (canvasRef && canvasRef.current && context) {
      const mouseX = clientX - canvasRef.current.offsetLeft;
      const mouseY = clientY - canvasRef.current.offsetTop;

      if (isDraw && tool === PAINTBRUSH) {
        drawService.addPoint(mouseX, mouseY, true, color, size);
        drawService.redraw(context);
        if (img) {
          drawService.drawImage(context, img);
        }
      } else if (isDraw && tool === LINE) {
        drawService.redraw(context);
        drawService.drawLine(context, size, color, startX.current, startY.current, mouseX, mouseY);
        if (img) {
          drawService.drawImage(context, img);
        }
      } else if (isDraw && tool === CIRCLE) {
        drawService.redraw(context);
        drawService.drawCircle(
          context,
          startX.current,
          startY.current,
          mouseX - startX.current,
          mouseY - startY.current,
          color,
        );
        if (img) {
          drawService.drawImage(context, img);
        }
      } else if (isDraw && tool === RECTANGLE) {
        drawService.redraw(context);
        drawService.drawRectangle(
          context,
          startX.current,
          startY.current,
          mouseX - startX.current,
          mouseY - startY.current,
          color,
        );
        if (img) {
          drawService.drawImage(context, img);
        }
      }
    }
  };

  const handleMouseUp = () => {
    if (canvasRef && canvasRef.current) {
      dispatch(drawActions.setImg(drawService.createImg(canvasRef.current)));
    }
    drawService.clearFromPaintbrush();
    dispatch(drawActions.stopDraw());
  };

  const handleMouseLeave = () => {
    if (tool === PAINTBRUSH) {
      if (canvasRef && canvasRef.current) {
        dispatch(drawActions.setImg(drawService.createImg(canvasRef.current)));
      }
      drawService.clearFromPaintbrush();
    }
  };

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');

      if (context) {
        context.globalCompositeOperation = 'destination-over';
      }
      dispatch(drawActions.setContext(context));
    }
  }, []);

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
      <PaintToolBar />
    </div>
  );
}

function mapStateToProps({ drawReducer: { tool, isDraw, color, dispatch, size, img, context } }: RootSate) {
  return { tool, isDraw, color, dispatch, size, img, context };
}

export default connect(mapStateToProps)(Paint);
