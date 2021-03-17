const points: Array<Point> = [];

interface Point {
  pointX: number;
  pointY: number;
  drag: boolean;
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

export function clearCanvas(): void {
  points.length = 0;
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

export function drawRectangle(
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  width: number,
  height: number,
  color: string,
): void {
  ctx.strokeStyle = 'transparent';
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.fillRect(startX, startY, width, height);
  ctx.closePath();
  ctx.stroke();
}

export function createImg(canvas: HTMLCanvasElement): HTMLImageElement {
  const img = canvas.toDataURL('image/png');
  const imgTag = new Image();
  imgTag.src = img;
  return imgTag;
}
