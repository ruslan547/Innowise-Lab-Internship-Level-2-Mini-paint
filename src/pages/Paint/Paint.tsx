import { MouseEvent, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { paintbrush, startDraw, stopDraw } from '../../core/actions/draw.actions';
import PaintButton from '../../core/components/PaintButton/PaintButton';
import { drawConstants } from '../../core/constants/draw.constants';
import { RootSate } from '../../core/reducers/root.reducer';
import { drawByPaintbrush } from '../../core/services/draw.service';
import './Paint.scss';

const { PAINTBRUSH } = drawConstants;

export interface PaintProps {
  tool: string;
  isDraw: boolean;
  dispatch: Dispatch;
}

function Paint({ tool, isDraw, dispatch }: PaintProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let ctx: CanvasRenderingContext2D | null = null;
  let canvasWidth = 0;
  let canvasHeight = 0;
  let canvasData: ImageData;

  function drawPixel(x: number, y: number, r: number, g: number, b: number, a: number) {
    const index = (x + y * canvasWidth) * 4;

    canvasData.data[index + 0] = r;
    canvasData.data[index + 1] = g;
    canvasData.data[index + 2] = b;
    canvasData.data[index + 3] = a;
  }

  function updateCanvas() {
    if (ctx) {
      ctx.putImageData(canvasData, 0, 0);
    }
  }

  const handleMouseDown = () => {
    dispatch(startDraw());
    if (canvasRef && canvasRef.current) {
    }
  };

  const handleMouseMove = ({ nativeEvent: { offsetX, offsetY } }: MouseEvent) => {
    if (isDraw) {
      if (tool === PAINTBRUSH) {
        // drawByPaintbrush(target);
        // console.log('draw');
        // ctx?.beginPath();
        // ctx?.moveTo(offsetX - 1, offsetY - 1);
        // ctx?.lineTo(offsetX, offsetY);
        // ctx?.stroke();
        // drawPixel(offsetX, offsetY, 0, 0, 0, 0);
        // updateCanvas();
        if (ctx) {
          ctx.fillStyle = 'red';
          ctx.fillRect(offsetX, offsetY, 1, 1);
          console.log(offsetX + ' ' + offsetY);
        }
      }
    }
  };

  const handleMouseUp = () => {
    dispatch(stopDraw());
  };

  const handlePaintbrushClick = () => {
    dispatch(paintbrush());
  };

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      const { current } = canvasRef;
      canvasWidth = current.width;
      canvasHeight = current.height;
      ctx = canvasRef.current.getContext('2d');

      if (ctx) {
        canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
      }
      console.log(canvasWidth, canvasHeight);
    }

    document.addEventListener('mouseup', handleMouseUp);
  });

  return (
    <div className="paint">
      <div className="toolbar">
        <PaintButton />
        <div className="toolbar__draw">
          <div className="paintbrush">
            <PaintButton onClick={handlePaintbrushClick} />
            <div className="paintbrush__setting"></div>
          </div>
        </div>
        <PaintButton />
      </div>
      <canvas
        className="mainview"
        width="500px"
        height="500px"
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      ></canvas>
    </div>
  );
}

function mapStateToProps({ drawReducer: { tool, isDraw, dispatch } }: RootSate) {
  return { tool, isDraw, dispatch };
}

export default connect(mapStateToProps)(Paint);
