import { MouseEvent, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import PaintButton from '../../core/components/PaintButton/PaintButton';
import { drawConstants } from '../../core/constants/draw.constants';
import { RootSate } from '../../core/reducers/root.reducer';
import './Paint.scss';
import ToolBar from './components/DrawBar/DrawBar';
import { drawActions } from '../../core/actions/draw.actions';
import { firebaseDbService } from '../../core/services/firebase.db.service';
import { User } from '../../core/actions/auth.actions';
import { drawService } from '../../core/services/draw.service';

const { PAINTBRUSH, LINE, RECTANGLE, CIRCLE } = drawConstants;

export interface PaintProps {
  tool: string;
  isDraw: boolean;
  color: string;
  size: string;
  dispatch: Dispatch;
  img: HTMLImageElement;
  user: User;
}

function Paint({ tool, isDraw, color, size, dispatch, img, user }: PaintProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const startX = useRef<number>(0);
  const startY = useRef<number>(0);

  const handleMouseDown = ({ clientX, clientY }: MouseEvent) => {
    dispatch(drawActions.hideSizeBar());
    dispatch(drawActions.hideShapeBar());
    dispatch(drawActions.startDraw());
    if (canvasRef && canvasRef.current && context && context.current) {
      const mouseX = clientX - canvasRef.current.offsetLeft;
      const mouseY = clientY - canvasRef.current.offsetTop;

      if (tool === PAINTBRUSH) {
        drawService.addPoint(mouseX, mouseY, false, color, size);
      } else if (tool === LINE || tool === CIRCLE || tool === RECTANGLE) {
        startX.current = mouseX;
        startY.current = mouseY;
      }
      if (context.current) {
        drawService.redraw(context.current);
        if (img) {
          drawService.drawImage(context.current, img);
        }
      }
    }
  };

  const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
    if (canvasRef && canvasRef.current && context && context.current) {
      const mouseX = clientX - canvasRef.current.offsetLeft;
      const mouseY = clientY - canvasRef.current.offsetTop;

      if (isDraw && tool === PAINTBRUSH) {
        drawService.addPoint(mouseX, mouseY, true, color, size);
        drawService.redraw(context.current);
        if (img) {
          drawService.drawImage(context.current, img);
        }
      } else if (isDraw && tool === LINE) {
        drawService.redraw(context.current);
        drawService.drawLine(context.current, size, color, startX.current, startY.current, mouseX, mouseY);
        if (img) {
          drawService.drawImage(context.current, img);
        }
      } else if (isDraw && tool === CIRCLE) {
        drawService.redraw(context.current);
        drawService.drawCircle(
          context.current,
          startX.current,
          startY.current,
          mouseX - startX.current,
          mouseY - startY.current,
          color,
        );
        if (img) {
          drawService.drawImage(context.current, img);
        }
      } else if (isDraw && tool === RECTANGLE) {
        drawService.redraw(context.current);
        drawService.drawRectangle(
          context.current,
          startX.current,
          startY.current,
          mouseX - startX.current,
          mouseY - startY.current,
          color,
        );
        if (img) {
          drawService.drawImage(context.current, img);
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

  const handleSaveClick = async () => {
    await firebaseDbService.sendImg(img.src, user.email);
    dispatch(drawActions.deleteImg());
    if (context.current) {
      drawService.clearCanvas(context.current);
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
        <PaintButton onClick={handleSaveClick}>Save</PaintButton>
      </div>
    </div>
  );
}

function mapStateToProps({
  drawReducer: { tool, isDraw, color, dispatch, size, img },
  authReducer: { user },
}: RootSate) {
  return { tool, isDraw, color, dispatch, size, img, user };
}

export default connect(mapStateToProps)(Paint);
