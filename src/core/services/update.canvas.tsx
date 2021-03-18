export function updateSizes(context: CanvasRenderingContext2D): void {
  const percentage = getPercentageOfWindow(context);
  const viewportSize = getViewportSize();
  context.canvas.height = viewportSize.height * percentage.y;
  context.canvas.width = viewportSize.width * percentage.x;
}

function getPercentageOfWindow(context: CanvasRenderingContext2D) {
  const viewportSize = getViewportSize();
  const canvasSize = getCanvastSize(context);
  return {
    x: canvasSize.width / (viewportSize.width - 10),
    y: canvasSize.height / (viewportSize.height - 10),
  };
}

function getViewportSize() {
  return {
    height: window.innerHeight,
    width: window.innerWidth,
  };
}

function getCanvastSize(context: CanvasRenderingContext2D) {
  return {
    height: context.canvas.height,
    width: context.canvas.width,
  };
}
