// Minimal image helper for bomb.png (non-OOP)

let bombImg: HTMLImageElement | null = null;
let bombReady = false;

/** Kick off loading once (call at app init or component mount). */
export function initBombSprite(src = new URL("../assets/bomb.png", import.meta.url).toString()): void {
  if (bombImg) return;
  bombImg = new Image();
  bombImg.src = src;
  bombImg.onload = () => { bombReady = true; };
  bombImg.onerror = (e) => { console.error("Failed to load bomb.png", e); };
}

/** Draw the bomb if loaded. `size` is width/height. */
export function drawBomb(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size = 100,
  center = false // pass true if x,y are center coords
): void {
  if (!bombImg || !bombReady) return;
  const w = size, h = size;
  const px = center ? x - w / 2 : x;
  const py = center ? y - h / 2 : y;
  ctx.drawImage(bombImg, Math.round(px), Math.round(py), w, h);
}