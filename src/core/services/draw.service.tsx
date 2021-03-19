const SCALE_INIT = 0;
const points: Array<Point> = [];

interface Point {
  pointX: number;
  pointY: number;
  drag: boolean;
  color: string;
  size: string;
}

export const drawService = {
  redraw,
  addPoint,
  clearFromPaintbrush,
  clearCanvas,
  drawLine,
  drawCircle,
  drawRectangle,
  drawImage,
  createImg,
  drawStar,
  drawHexagon,
};

function redraw(context: CanvasRenderingContext2D): void {
  clearCanvas(context);
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

function addPoint(pointX: number, pointY: number, drag: boolean, color: string, size: string): void {
  points.push({
    pointX,
    pointY,
    drag,
    color,
    size,
  });
}

function clearFromPaintbrush(): void {
  points.splice(0, points.length);
}

function clearCanvas(context: CanvasRenderingContext2D): void {
  context.clearRect(SCALE_INIT, SCALE_INIT, context.canvas.width, context.canvas.height);
}

function drawLine(
  context: CanvasRenderingContext2D,
  size: string,
  color: string,
  startX: number,
  startY: number,
  mouseX: number,
  mouseY: number,
  img: HTMLImageElement,
): void {
  redraw(context);
  context.lineWidth = +size;
  context.strokeStyle = color;
  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(mouseX, mouseY);
  context.stroke();
  if (img) {
    drawService.drawImage(context, img);
  }
}

function drawCircle(
  context: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  width: number,
  height: number,
  color: string,
): void {
  const kappa = 0.5522848,
    ox = (width / 2) * kappa, // control point offset horizontal
    oy = (height / 2) * kappa, // control point offset vertical
    xe = startX + width, // x-end
    ye = startY + height, // y-end
    xm = startX + width / 2, // x-middle
    ym = startY + height / 2; // y-middle

  context.fillStyle = color;
  context.fill();
  context.beginPath();
  context.moveTo(startX, ym);
  context.bezierCurveTo(startX, ym - oy, xm - ox, startY, xm, startY);
  context.bezierCurveTo(xm + ox, startY, xe, ym - oy, xe, ym);
  context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
  context.bezierCurveTo(xm - ox, ye, startX, ym + oy, startX, ym);
  context.closePath();
}

function drawRectangle(
  context: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  width: number,
  height: number,
  color: string,
): void {
  context.fillStyle = color;
  context.beginPath();
  context.fillRect(startX, startY, width, height);
  context.closePath();
}

function drawStar(
  context: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  outerRadius: number,
  color: string,
): void {
  const spikes = 5;
  const step = Math.PI / spikes;
  let rot = (Math.PI / 2) * 3;
  let x = startX;
  let y = startY;

  context.beginPath();
  context.moveTo(startX, startY - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = startX + Math.cos(rot) * outerRadius;
    y = startY + Math.sin(rot) * outerRadius;
    context.lineTo(x, y);
    rot += step;

    x = startX + Math.cos(rot) * (outerRadius / 2);
    y = startY + Math.sin(rot) * (outerRadius / 2);
    context.lineTo(x, y);
    rot += step;
  }
  context.lineTo(startX, startY - outerRadius);
  context.closePath();
  context.fillStyle = color;
  context.fill();
}

function drawHexagon(
  canvasContext: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  sideLength: number,
  color: string,
): void {
  const hexagonAngle = 0.523598776; //30 градусов в радианах
  const hexHeight = Math.sin(hexagonAngle) * sideLength;
  const hexRadius = Math.cos(hexagonAngle) * sideLength;
  const hexRectangleWidth = 2 * hexRadius;
  const hexRectangleHeight = sideLength + 2 * hexHeight;
  canvasContext.fillStyle = color;
  canvasContext.beginPath();
  canvasContext.moveTo(startX + hexRadius, startY);
  canvasContext.lineTo(startX + hexRectangleWidth, startY + hexHeight);
  canvasContext.lineTo(startX + hexRectangleWidth, startY + hexHeight + sideLength);
  canvasContext.lineTo(startX + hexRadius, startY + hexRectangleHeight);
  canvasContext.lineTo(startX, startY + sideLength + hexHeight);
  canvasContext.lineTo(startX, startY + hexHeight);
  canvasContext.closePath();
  canvasContext.fill();
}

function drawImage(context: CanvasRenderingContext2D, img: HTMLImageElement): void {
  context.drawImage(img, SCALE_INIT, SCALE_INIT);
}

function createImg(canvas: HTMLCanvasElement): HTMLImageElement {
  const image = canvas.toDataURL('image/png');
  const img = new Image();
  img.src = image;
  return img;
}
