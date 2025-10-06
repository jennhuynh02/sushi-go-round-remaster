export type Vec2 = [number, number];

export interface BoardState {
  cols: number; rows: number; tileSize: number;
  loopPath: Vec2[]; items: number[]; speedPx: number;
}

export const buildPerimeterPath = (tileSize: number, cols = 10, rows = 10): Vec2[] => {
  const w = cols * tileSize, h = rows * tileSize, p: Vec2[] = [];
  for (let x = tileSize; x <= w - tileSize; x += 5) p.push([x, tileSize]);                 // top
  for (let y = tileSize + 5; y <= h - tileSize; y += 5) p.push([w - tileSize, y]);         // right
  for (let x = w - tileSize - 5; x >= tileSize; x -= 5) p.push([x, h - tileSize]);         // bottom
  for (let y = h - tileSize - 5; y >= tileSize; y -= 5) p.push([tileSize, y]);             // left
  return p;
};

export const createBoard = (tileSize = 100, cols = 10, rows = 10, itemCount = 28): BoardState => {
  const loopPath = buildPerimeterPath(tileSize, cols - 1, rows - 1);
  const spacing = Math.floor(loopPath.length / itemCount);
  return {
    cols, rows, tileSize, loopPath,
    items: Array.from({ length: itemCount }, (_, i) => (i * spacing) % loopPath.length),
    speedPx: 2, // slower belt
  };
};

export const stepBelt = (s: BoardState): BoardState => {
  const len = s.loopPath.length;
  return { ...s, items: s.items.map(i => (i + s.speedPx) % len) };
};

export function drawBeltUnderlay(
  ctx: CanvasRenderingContext2D,
  path: [number, number][],
  width: number
) {
  if (!path.length) return;
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "#0f172a"; // dark navy tone under the belt
  ctx.lineWidth = width;
  ctx.shadowColor = "rgba(0,0,0,0.25)";
  ctx.shadowBlur = 6;

  ctx.beginPath();
  ctx.moveTo(path[0][0], path[0][1]);
  for (let i = 1; i < path.length; i++) ctx.lineTo(path[i][0], path[i][1]);
  ctx.closePath();
  ctx.stroke();

  ctx.restore();
}

export const getUnderlayPath = (s: BoardState): Vec2[] =>
  s.loopPath.map(([x, y]) => [x + s.tileSize / 2, y + s.tileSize / 2]);

export const getUnderlayWidth = (s: BoardState): number =>
  Math.round(s.tileSize * 0.38);