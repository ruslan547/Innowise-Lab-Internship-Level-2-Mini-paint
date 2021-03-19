const SCALE_INIT = 0;
const ARRAY_SIZE_INIT = 0;
const KAPPA = 0.5522848;
const SPIKES_COUNT = 5;
const IMAGE_TYPE = 'image/png';
const LINE_JOIN = 'round';
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
};

function redraw(context: CanvasRenderingContext2D): void {
  context.clearRect(SCALE_INIT, SCALE_INIT, context.canvas.width, context.canvas.height);
  context.lineJoin = LINE_JOIN;

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
  points.length = ARRAY_SIZE_INIT;
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
): void {
  context.lineWidth = +size;
  context.strokeStyle = color;
  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(mouseX, mouseY);
  context.stroke();
}

function drawCircle(
  context: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  width: number,
  height: number,
  color: string,
): void {
  const ox = (width / 2) * KAPPA, // control point offset horizontal
    oy = (height / 2) * KAPPA, // control point offset vertical
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
  let rot = (Math.PI / 2) * 3;
  let x = startX;
  let y = startY;
  const step = Math.PI / SPIKES_COUNT;

  context.beginPath();
  context.moveTo(startX, startY - outerRadius);
  for (let i = 0; i < SPIKES_COUNT; i++) {
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

function drawImage(context: CanvasRenderingContext2D, img: HTMLImageElement): void {
  context.drawImage(img, SCALE_INIT, SCALE_INIT);
}

function createImg(canvas: HTMLCanvasElement): HTMLImageElement {
  const image = canvas.toDataURL(IMAGE_TYPE);
  const img = new Image();
  img.src = image;
  return img;
}
