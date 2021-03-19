import { MouseEvent, useCallback, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { drawActions } from '../../../../core/actions/draw.actions';
import { drawConstants } from '../../../../core/constants/draw.constants';
import { Dispatch } from '../../../../core/helpers/store';
import { RootSate } from '../../../../core/reducers/root.reducer';
import { drawService } from '../../../../core/services/draw.service';
import './MainView.scss';

const CANVAS_WIDTH = 712;
const CANVAS_HEIGHT = 632;
const CANVAS_MARGIN = 50;

interface MainViewProps {
  tool: string;
  isDraw: boolean;
  color: string;
  size: string;
  dispatch: Dispatch;
  img: HTMLImageElement;
  context: CanvasRenderingContext2D | null;
}

function MainView({ tool, isDraw, color, size, dispatch, img, context }: MainViewProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mainviewRef = useRef<HTMLDivElement | null>(null);
  const startX = useRef<number>(0);
  const startY = useRef<number>(0);

  const handleMouseDown = ({ clientX, clientY }: MouseEvent) => {
    dispatch(drawActions.hideSizeBar());
    dispatch(drawActions.hideShapeBar());
    if (canvasRef && canvasRef.current && context && tool) {
      dispatch(drawActions.startDraw());
      const mouseX = clientX - canvasRef.current.offsetLeft;
      const mouseY = clientY - canvasRef.current.offsetTop;

      if (tool === drawConstants.PAINTBRUSH) {
        drawService.drawPoint(context, mouseX, mouseY, color, size, img);
      } else {
        startX.current = mouseX;
        startY.current = mouseY;
      }
    }
  };

  const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
    if (canvasRef && canvasRef.current && context) {
      const mouseX = clientX - canvasRef.current.offsetLeft;
      const mouseY = clientY - canvasRef.current.offsetTop;
      const width = mouseX - startX.current;
      const height = mouseY - startY.current;

      if (isDraw && tool === drawConstants.PAINTBRUSH) {
        drawService.drawPoint(context, mouseX, mouseY, color, size, img);
      } else if (isDraw && tool === drawConstants.LINE) {
        drawService.drawLine(context, size, color, startX.current, startY.current, mouseX, mouseY, img);
      } else if (isDraw && tool === drawConstants.CIRCLE) {
        drawService.drawCircle(context, startX.current, startY.current, width, height, color, img);
      } else if (isDraw && tool === drawConstants.RECTANGLE) {
        drawService.drawRectangle(context, startX.current, startY.current, width, height, color, img);
      } else if (isDraw && tool === drawConstants.STAR) {
        const outerRadius = width + height;
        drawService.drawStar(context, startX.current, startY.current, outerRadius, color, img);
      } else if (isDraw && tool === drawConstants.HEXAGON) {
        drawService.drawHexagon(context, startX.current, startY.current, width, color, img);
      }
    }
  };

  const handleMouseUp = useCallback(() => {
    if (canvasRef && canvasRef.current) {
      dispatch(drawActions.setImg(drawService.createImg(canvasRef.current)));
    }
    drawService.clearFromPaintbrush();
    dispatch(drawActions.stopDraw());
  }, [dispatch]);

  const handleMouseLeave = () => {
    if (tool === drawConstants.PAINTBRUSH && canvasRef && canvasRef.current) {
      dispatch(drawActions.setImg(drawService.createImg(canvasRef.current)));
      drawService.clearFromPaintbrush();
    }
  };

  const handleResize = useCallback(() => {
    if (canvasRef && canvasRef.current && mainviewRef && mainviewRef.current) {
      canvasRef.current.width = mainviewRef.current.clientWidth;
      canvasRef.current.height = mainviewRef.current.clientHeight;
      dispatch(drawActions.setContext(drawService.createContext(canvasRef.current)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      canvasRef.current.height = window.innerHeight;
      if (window.innerWidth < CANVAS_WIDTH) {
        canvasRef.current.width = window.innerWidth - CANVAS_MARGIN;
      }

      dispatch(drawActions.setContext(drawService.createContext(canvasRef.current)));
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch, handleResize]);

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);

    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseUp]);

  return (
    <div className="mainview" ref={mainviewRef}>
      <canvas
        className="mainview__canvas"
        id="mainview"
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      ></canvas>
    </div>
  );
}

function mapStateToProps({ drawReducer: { tool, isDraw, color, dispatch, size, img, context } }: RootSate) {
  return { tool, isDraw, color, dispatch, size, img, context };
}

export default connect(mapStateToProps)(MainView);
