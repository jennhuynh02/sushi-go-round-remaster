export function drawConveyorTile(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size = 100
): void {
  // base bamboo color
  const grad = ctx.createLinearGradient(x, y, x, y + size);
  grad.addColorStop(0, '#e9d8a6');
  grad.addColorStop(1, '#d4a373');
  ctx.fillStyle = grad;
  ctx.fillRect(x, y, size, size);

  // horizontal slats
  ctx.strokeStyle = '#b08968';
  ctx.lineWidth = 3;
  for (let i = 0; i < size; i += size / 5) {
    ctx.beginPath();
    ctx.moveTo(x, y + i);
    ctx.lineTo(x + size, y + i);
    ctx.stroke();
  }

  // highlight edge (optional)
  ctx.strokeStyle = 'rgba(255,255,255,0.4)';
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, size, size);

}