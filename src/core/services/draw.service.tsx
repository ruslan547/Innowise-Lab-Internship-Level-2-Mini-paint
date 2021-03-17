const points: Array<Point> = [];
const existingLines: Array<Line> = [];
const eclipses: Array<Eclipse> = [];

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

interface Eclipse {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
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
    drawLine(context, line.size, line.color, line.startX, line.startY, line.endX, line.endY);
  });

  eclipses.forEach((item) => {
    drawEclipse(context, item.startX, item.startY, item.endX, item.endY, item.color);
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

export function addEclipse(startX: number, startY: number, endX: number, endY: number, color: string): void {
  eclipses.push({
    startX,
    startY,
    endX,
    endY,
    color,
  });
}

export function clearCanvas(): void {
  points.length = 0;
  existingLines.length = 0;
  eclipses.length = 0;
}

export function drawImage(context: CanvasRenderingContext2D, img: HTMLImageElement): void {
  context.drawImage(img, 0, 0);
}

export function drawLine(
  context: CanvasRenderingContext2D,
  size: string,
  color: string,
  startX: number,
  startY: number,
  mouseX: number,
  mouseY: number,
): void {
  context.lineWidth = +size;
  context.strokeStyle = color;
  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(mouseX, mouseY);
  context.stroke();
}

export function drawEclipse(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string,
): void {
  const kappa = 0.5522848,
    ox = (w / 2) * kappa, // control point offset horizontal
    oy = (h / 2) * kappa, // control point offset vertical
    xe = x + w, // x-end
    ye = y + h, // y-end
    xm = x + w / 2, // x-middle
    ym = y + h / 2; // y-middle

  ctx.strokeStyle = 'transparent';
  ctx.fillStyle = color;
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x, ym);
  ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
  ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
  ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
  ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
  ctx.closePath();
  ctx.stroke();
}

export function createImg(canvas: HTMLCanvasElement): HTMLImageElement {
  const img = canvas.toDataURL('image/png');
  const imgTag = new Image();
  imgTag.src = img;
  return imgTag;
}
