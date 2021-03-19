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
  drawPoint,
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

function drawPoint(
  context: CanvasRenderingContext2D,
  mouseX: number,
  mouseY: number,
  color: string,
  size: string,
  img: HTMLImageElement,
): void {
  addPoint(mouseX, mouseY, true, color, size);
  redraw(context);
  drawImage(context, img);
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
  context.closePath();
  context.stroke();
  drawImage(context, img);
}

function drawCircle(
  context: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  width: number,
  height: number,
  color: string,
  img: HTMLImageElement,
): void {
  const kappa = 0.5522848;
  const ox = (width / 2) * kappa; // control point offset horizontal
  const oy = (height / 2) * kappa; // control point offset vertical
  const xe = startX + width; // x-end
  const ye = startY + height; // y-end
  const xm = startX + width / 2; // x-middle
  const ym = startY + height / 2; // y-middle

  redraw(context);
  context.fillStyle = color;
  context.beginPath();
  context.moveTo(startX, ym);
  context.bezierCurveTo(startX, ym - oy, xm - ox, startY, xm, startY);
  context.bezierCurveTo(xm + ox, startY, xe, ym - oy, xe, ym);
  context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
  context.bezierCurveTo(xm - ox, ye, startX, ym + oy, startX, ym);
  context.closePath();
  context.fill();
  drawImage(context, img);
}

function drawRectangle(
  context: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  width: number,
  height: number,
  color: string,
  img: HTMLImageElement,
): void {
  redraw(context);
  context.fillStyle = color;
  context.beginPath();
  context.fillRect(startX, startY, width, height);
  context.closePath();
  drawImage(context, img);
}

function drawStar(
  context: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  outerRadius: number,
  color: string,
  img: HTMLImageElement,
): void {
  const spikes = 5;
  const step = Math.PI / spikes;
  let rot = (Math.PI / 2) * 3;
  let x = startX;
  let y = startY;

  redraw(context);
  context.fillStyle = color;
  context.beginPath();
  context.moveTo(startX, startY - outerRadius);

  new Array(spikes).fill(null).forEach(() => {
    x = startX + Math.cos(rot) * outerRadius;
    y = startY + Math.sin(rot) * outerRadius;
    context.lineTo(x, y);
    rot += step;
    x = startX + Math.cos(rot) * (outerRadius / 2);
    y = startY + Math.sin(rot) * (outerRadius / 2);
    context.lineTo(x, y);
    rot += step;
  });

  context.lineTo(startX, startY - outerRadius);
  context.closePath();
  context.fill();
  drawImage(context, img);
}

function drawHexagon(
  context: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  sideLength: number,
  color: string,
  img: HTMLImageElement,
): void {
  const hexagonAngle = 0.523598776; //30 degrees in radians
  const hexHeight = Math.sin(hexagonAngle) * sideLength;
  const hexRadius = Math.cos(hexagonAngle) * sideLength;
  const hexRectangleWidth = 2 * hexRadius;
  const hexRectangleHeight = sideLength + 2 * hexHeight;

  redraw(context);
  context.fillStyle = color;
  context.beginPath();
  context.moveTo(startX + hexRadius, startY);
  context.lineTo(startX + hexRectangleWidth, startY + hexHeight);
  context.lineTo(startX + hexRectangleWidth, startY + hexHeight + sideLength);
  context.lineTo(startX + hexRadius, startY + hexRectangleHeight);
  context.lineTo(startX, startY + sideLength + hexHeight);
  context.lineTo(startX, startY + hexHeight);
  context.closePath();
  context.fill();
  drawImage(context, img);
}

function drawImage(context: CanvasRenderingContext2D, img: HTMLImageElement): void {
  if (img) {
    context.drawImage(img, SCALE_INIT, SCALE_INIT);
  }
}

function createImg(canvas: HTMLCanvasElement): HTMLImageElement {
  const image = canvas.toDataURL('image/png');
  const img = new Image();

  img.src = image;

  return img;
}
