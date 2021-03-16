import { ChangeEvent, MouseEvent, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  hideSizeBar,
  noTool,
  paintbrush,
  setColor,
  setSize,
  showSizeBar,
  startDraw,
  stopDraw,
} from '../../core/actions/draw.actions';
import PaintButton from '../../core/components/PaintButton/PaintButton';
import { drawConstants } from '../../core/constants/draw.constants';
import { RootSate } from '../../core/reducers/root.reducer';
import { addClick, drawByPaintbrush } from '../../core/services/draw.service';
import './Paint.scss';
import pencil_img from '../../assets/img/pencil.svg';
import SizeBar from './SizeBar/SizeBar';

const { PAINTBRUSH } = drawConstants;

export interface PaintProps {
  tool: string;
  isDraw: boolean;
  color: string;
  isShowedSizeBar: boolean;
  size: string;
  dispatch: Dispatch;
}

function Paint({ tool, isDraw, color, isShowedSizeBar, size, dispatch }: PaintProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);

  const handlePaintbrushClick = () => {
    if (tool === PAINTBRUSH) {
      dispatch(noTool());
    } else {
      dispatch(paintbrush());
    }
  };

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

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (context && context.current) {
      dispatch(setColor(value));
    }
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
          <PaintButton name={PAINTBRUSH} onClick={handlePaintbrushClick}>
            <img src={pencil_img} alt="" />
          </PaintButton>
          <PaintButton>figure</PaintButton>
          <PaintButton>
            <input className="color-input" value={color} type="color" name="color" onChange={handleChange} />
          </PaintButton>
          <SizeBar />
        </div>
        <PaintButton />
      </div>
    </div>
  );
}

function mapStateToProps({ drawReducer: { tool, isDraw, color, dispatch, isShowedSizeBar, size } }: RootSate) {
  return { tool, isDraw, color, dispatch, isShowedSizeBar, size };
}

export default connect(mapStateToProps)(Paint);
