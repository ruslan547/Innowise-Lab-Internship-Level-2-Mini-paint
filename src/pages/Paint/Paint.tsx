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
  // let ctx: CanvasRenderingContext2D | null = null;
  let context: CanvasRenderingContext2D | null = null;
  const canvas = useRef<HTMLCanvasElement | null>(null);
  let mouseX;
  let mouseY;
  let paint: boolean;
  const clickX: any[] = [];
  const clickY: any[] = [];
  const clickDrag: any[] = [];

  function addClick(x: any, y: any, dragging?: any) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
  }

  function redraw() {
    if (context) {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);

      context.strokeStyle = '#df4b26';
      context.lineJoin = 'round';
      context.lineWidth = 5;

      clickX.forEach((_, index) => {
        context?.beginPath();
        if (clickDrag[index] && index) {
          context?.moveTo(clickX[index - 1], clickY[index - 1]);
        } else {
          context?.moveTo(clickX[index] - 1, clickY[index]);
        }

        context?.lineTo(clickX[index], clickY[index]);
        context?.closePath();
        context?.stroke();
      });
    }
  }

  useEffect(() => {
    canvas.current = document.querySelector('canvas');
    if (canvas && canvas.current) {
      context = canvas.current.getContext('2d');

      canvas.current.addEventListener('mousedown', (e) => {
        if (canvas && canvas.current) {
          mouseX = e.pageX - canvas.current.offsetLeft;
          mouseY = e.pageY - canvas.current.offsetTop;
          paint = true;
          addClick(e.pageX - canvas.current.offsetLeft, e.pageY - canvas.current.offsetTop);
          redraw();
        }
      });

      canvas.current.addEventListener('mousemove', (e) => {
        if (paint) {
          if (canvas && canvas.current) {
            addClick(e.pageX - canvas.current.offsetLeft, e.pageY - canvas.current.offsetTop, true);
            redraw();
          }
        }
      });

      canvas.current.addEventListener('mouseup', () => {
        paint = false;
      });
    }
  });

  return (
    <div className="paint">
      <canvas className="mainview" width="712px" height="632px"></canvas>
      <div className="toolbar">
        <PaintButton />
        <div className="toolbar__draw">
          <div className="paintbrush">
            <PaintButton />
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
