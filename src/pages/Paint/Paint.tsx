/* eslint-disable no-var */
/* eslint-disable prettier/prettier */
import { MouseEvent, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  circle,
  setImg,
  hideShapeBar,
  hideSizeBar,
  rectangle,
  showShapeBar,
  startDraw,
  stopDraw,
} from '../../core/actions/draw.actions';
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
  // drawPoint,
} from '../../core/services/draw.service';
import './Paint.scss';
import SizeBar from './SizeBar/SizeBar';
import ColorBar from './ColorBar/ColorBar';
import PaintBrush from './PaintBrush/PaintBrush';
import rectangle_img from '../../assets/img/rectangle.svg';
import circle_img from '../../assets/img/circle.svg';
import Line from './components/Line/Line';

const { PAINTBRUSH, LINE, RECTANGLE, CIRCLE } = drawConstants;

export interface PaintProps {
  tool: string;
  isDraw: boolean;
  color: string;
  size: string;
  dispatch: Dispatch;
  isShowedShapeBar: boolean;
  img: HTMLImageElement;
}

function Paint({ tool, isDraw, color, size, dispatch, isShowedShapeBar, img }: PaintProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const startX = useRef<number>(0);
  const startY = useRef<number>(0);
  const mouseX = useRef<number>(0);
  const mouseY = useRef<number>(0);

  const handleMouseDown = ({ clientX, clientY }: MouseEvent) => {
    dispatch(hideSizeBar());
    dispatch(hideShapeBar());
    dispatch(startDraw());
    if (canvasRef && canvasRef.current && context && context.current) {
      mouseX.current = clientX - canvasRef.current.offsetLeft;
      mouseY.current = clientY - canvasRef.current.offsetTop;

      if (tool === PAINTBRUSH) {
        addPoint(mouseX.current, mouseY.current, false, color, size);
        //addPoint(mouseX.current, mouseY.current, size, color);
      } else if (tool === LINE || tool === CIRCLE || tool === RECTANGLE) {
        startX.current = mouseX.current;
        startY.current = mouseY.current;
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
      mouseX.current = clientX - canvasRef.current.offsetLeft;
      mouseY.current = clientY - canvasRef.current.offsetTop;

      if (isDraw && tool === PAINTBRUSH) {
        addPoint(mouseX.current, mouseY.current, true, color, size);
        //addPoint(mouseX.current, mouseY.current, size, color);
        redraw(context.current);
        if (img) {
          drawImage(context.current, img);
        }
      } else if (isDraw && tool === LINE) {
        redraw(context.current);
        drawLine(context.current, size, color, startX.current, startY.current, mouseX.current, mouseY.current);
        if (img) {
          drawImage(context.current, img);
        }
      } else if (isDraw && tool === CIRCLE) {
        redraw(context.current);
        drawEclipse(context.current, startX.current, startY.current, mouseX.current - startX.current, mouseY.current - startY.current, color);
        if (img) {
          drawImage(context.current, img);
        }
      } else if (isDraw && tool === RECTANGLE) {
        redraw(context.current);
        drawRectangle(context.current, startX.current, startY.current, mouseX.current - startX.current, mouseY.current - startY.current, color);
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

  const handleShapeBarClick = () => {
    if (isShowedShapeBar) {
      dispatch(hideShapeBar());
    } else {
      dispatch(showShapeBar());
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
      ></canvas>
      <div className="toolbar">
        <PaintButton />
        <div className="toolbar__draw">
          <PaintBrush />
          <div className="shape-bar">
            <PaintButton name="shape-bar" onClick={handleShapeBarClick}>
              ...
            </PaintButton>
            {isShowedShapeBar && (
              <ul className="shape-bar__setting">
                <li className="shape-bar__item">
                  <Line />
                </li>
                <li className="shape-bar__item">
                  <PaintButton name={CIRCLE} onClick={() => dispatch(circle())}>
                    <img src={circle_img} alt="circle" />
                  </PaintButton>
                </li>
                <li className="shape-bar__item">
                  <PaintButton name={RECTANGLE} onClick={() => dispatch(rectangle())}>
                    <img src={rectangle_img} alt="rectangle" />
                  </PaintButton>
                </li>
              </ul>
            )}
          </div>
          <SizeBar />
          <ColorBar />
        </div>
        <PaintButton />
      </div>
    </div>
  );
}

function mapStateToProps({ drawReducer: { tool, isDraw, color, dispatch, size, isShowedShapeBar, img } }: RootSate) {
  return { tool, isDraw, color, dispatch, size, isShowedShapeBar, img };
}

export default connect(mapStateToProps)(Paint);
