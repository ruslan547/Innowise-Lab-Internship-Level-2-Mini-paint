import { MouseEvent, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  circle,
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
import { addPoint, addLine, redraw } from '../../core/services/draw.service';
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
}

function Paint({ tool, isDraw, color, size, dispatch, isShowedShapeBar }: PaintProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const startX = useRef<number>(0);
  const startY = useRef<number>(0);

  const handleMouseDown = ({ clientX, clientY }: MouseEvent) => {
    dispatch(hideSizeBar());
    dispatch(hideShapeBar());
    dispatch(startDraw());
    if (canvasRef && canvasRef.current) {
      const { offsetLeft, offsetTop } = canvasRef.current;

      if (tool === PAINTBRUSH) {
        addPoint(clientX - offsetLeft, clientY - offsetTop, false, color, size);
      } else if (tool === LINE) {
        startX.current = clientX - offsetLeft;
        startY.current = clientY - offsetTop;
      }
      if (context.current) {
        redraw(context.current);
      }
    }
  };

  const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
    if (canvasRef && canvasRef.current && context && context.current) {
      const { offsetLeft, offsetTop } = canvasRef.current;
      const ctx = context.current;
      const mouseX = clientX - offsetLeft;
      const mouseY = clientY - offsetTop;

      if (isDraw && tool === PAINTBRUSH) {
        addPoint(mouseX, mouseY, true, color, size);
        redraw(context.current);
      } else if (isDraw && tool === LINE) {
        redraw(context.current);
        ctx.lineWidth = +size;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(startX.current, startY.current);
        ctx.lineTo(mouseX, mouseY);
        ctx.stroke();
      }
    }
  };

  const handleMouseUp = ({ clientX, clientY }: MouseEvent) => {
    if (canvasRef && canvasRef.current) {
      const { offsetLeft, offsetTop } = canvasRef.current;
      const mouseX = clientX - offsetLeft;
      const mouseY = clientY - offsetTop;
      if (tool === LINE && isDraw) {
        addLine(startX.current, startY.current, mouseX, mouseY, color, size);
      }
    }

    dispatch(stopDraw());
  };

  const handleMouseLeave = ({ clientX, clientY }: MouseEvent) => {
    if (canvasRef && canvasRef.current) {
      const { offsetLeft, offsetTop } = canvasRef.current;
      const mouseX = clientX - offsetLeft;
      const mouseY = clientY - offsetTop;
      if (tool === LINE && isDraw) {
        addLine(startX.current, startY.current, mouseX, mouseY, color, size);
      }
    }

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
    }
  }, [canvasRef, context]);

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

function mapStateToProps({ drawReducer: { tool, isDraw, color, dispatch, size, isShowedShapeBar } }: RootSate) {
  return { tool, isDraw, color, dispatch, size, isShowedShapeBar };
}

export default connect(mapStateToProps)(Paint);
