const clickX: number[] = [];
const clickY: number[] = [];
const clickDrag: Array<boolean | undefined> = [];
const clickColor: Array<string> = [];

export function drawByPaintbrush(context: CanvasRenderingContext2D | null): void {
  if (context) {
    // context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    // context.strokeStyle = '#df4b26';
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
      context.strokeStyle = clickColor[index];
      context?.stroke();
    });
  }
}

export function addClick(x: number, y: number, dragging: boolean, curColor: string): void {
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickColor.push(curColor);
}
