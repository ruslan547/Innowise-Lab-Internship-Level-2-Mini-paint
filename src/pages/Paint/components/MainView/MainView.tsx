import { MouseEvent, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { drawActions } from '../../../../core/actions/draw.actions';
import { drawConstants } from '../../../../core/constants/draw.constants';
import { Dispatch } from '../../../../core/helpers/store';
import { RootSate } from '../../../../core/reducers/root.reducer';
import { drawService } from '../../../../core/services/draw.service';
import { updateSizes } from '../../../../core/services/update.canvas';
import './MainView.scss';

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
  const startX = useRef<number>(0);
  const startY = useRef<number>(0);

  const handleMouseDown = ({ clientX, clientY }: MouseEvent) => {
    dispatch(drawActions.hideSizeBar());
    dispatch(drawActions.hideShapeBar());
    dispatch(drawActions.startDraw());
    if (canvasRef && canvasRef.current && context) {
      const mouseX = clientX - canvasRef.current.offsetLeft;
      const mouseY = clientY - canvasRef.current.offsetTop;

      if (tool === drawConstants.PAINTBRUSH) {
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

      if (isDraw && tool === drawConstants.PAINTBRUSH) {
        drawService.addPoint(mouseX, mouseY, true, color, size);
        drawService.redraw(context);
        if (img) {
          drawService.drawImage(context, img);
        }
      } else if (isDraw && tool === drawConstants.LINE) {
        drawService.redraw(context);
        drawService.drawLine(context, size, color, startX.current, startY.current, mouseX, mouseY);
        if (img) {
          drawService.drawImage(context, img);
        }
      } else if (isDraw && tool === drawConstants.CIRCLE) {
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
      } else if (isDraw && tool === drawConstants.RECTANGLE) {
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
      } else if (isDraw && tool === drawConstants.STAR) {
        const outerRadius = mouseX - startX.current + mouseY - startY.current;
        drawService.redraw(context);
        drawService.drawStar(context, startX.current, startY.current, outerRadius, color);
        if (img) {
          drawService.drawImage(context, img);
        }
      } else if (isDraw && tool === drawConstants.HEXAGON) {
        const sideLength = mouseX - startX.current;
        drawService.redraw(context);
        drawService.drawHexagon(context, startX.current, startY.current, sideLength, color);
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
    if (tool === drawConstants.PAINTBRUSH) {
      if (canvasRef && canvasRef.current) {
        dispatch(drawActions.setImg(drawService.createImg(canvasRef.current)));
      }
      drawService.clearFromPaintbrush();
    }
  };

  const handleResize = () => {
    if (context) {
      updateSizes(context);
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

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      className="mainview"
      id="mainview"
      ref={canvasRef}
      width="712"
      height="632"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    ></canvas>
  );
}

function mapStateToProps({ drawReducer: { tool, isDraw, color, dispatch, size, img, context } }: RootSate) {
  return { tool, isDraw, color, dispatch, size, img, context };
}

export default connect(mapStateToProps)(MainView);
