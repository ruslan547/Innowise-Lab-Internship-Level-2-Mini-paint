const points: Array<Point> = [];
const existingLines: Array<Line> = [];

interface Point {
  pointX: number;
  pointY: number;
  drag: boolean;
  color: string;
  size: string;
}

interface Line {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
  size: string;
}

export function redraw(context: CanvasRenderingContext2D): void {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.lineJoin = 'round';

  points.forEach((point, index, arr) => {
    context.beginPath();
    if (point.drag && index) {
      context.moveTo(arr[index - 1].pointX, arr[index - 1].pointY);
    } else {
      context.moveTo(point.pointX - 1, point.pointY);
    }

    context.lineTo(point.pointX, point.pointY);
    context.closePath();
    context.strokeStyle = point.color;
    context.lineWidth = +point.size;
    context.stroke();
  });

  existingLines.forEach((line) => {
    context?.beginPath();
    context.strokeStyle = line.color;
    context.lineWidth = +line.size;
    context.moveTo(line.startX, line.startY);
    context.lineTo(line.endX, line.endY);
    context?.stroke();
  });
}

export function addPoint(pointX: number, pointY: number, drag: boolean, color: string, size: string): void {
  points.push({
    pointX,
    pointY,
    drag,
    color,
    size,
  });
}

export function addLine(startX: number, startY: number, endX: number, endY: number, color: string, size: string): void {
  existingLines.push({
    startX,
    startY,
    endX,
    endY,
    color,
    size,
  });
}
