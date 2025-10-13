type ConveyorOpts = {
  radius?: number; // corner radius
  inset?: number; // inner inset for bevel
  gloss?: boolean; // top gloss highlight
  stripes?: boolean; // faint diagonal “motion” stripes
  orientation?: "h" | "v"; // stripe direction only (visual)
};

export function drawConveyorTilePurple(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size = 100,
  opts: ConveyorOpts = {}
): void {
  const {
    radius = Math.max(8, Math.floor(size * 0.12)),
    inset = Math.floor(size * 0.06),
    gloss = true,
    stripes = true,
    orientation = "h",
  } = opts;

  // Helpers
  const roundedRect = (
    xx: number,
    yy: number,
    w: number,
    h: number,
    r: number
  ) => {
    const rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(xx + rr, yy);
    ctx.arcTo(xx + w, yy, xx + w, yy + h, rr);
    ctx.arcTo(xx + w, yy + h, xx, yy + h, rr);
    ctx.arcTo(xx, yy + h, xx, yy, rr);
    ctx.arcTo(xx, yy, xx + w, yy, rr);
    ctx.closePath();
  };

  // Base (deep purple)
  const baseG = ctx.createLinearGradient(x, y, x, y + size);
  baseG.addColorStop(0, "#2b2140"); // top
  baseG.addColorStop(0.5, "#251b39");
  baseG.addColorStop(1, "#1f1631"); // bottom

  // Plate face (slightly lighter purple)
  const faceX = x + inset,
    faceY = y + inset,
    faceS = size - inset * 2;
  const faceG = ctx.createLinearGradient(faceX, faceY, faceX, faceY + faceS);
  faceG.addColorStop(0, "#3b2c5c");
  faceG.addColorStop(0.5, "#352551");
  faceG.addColorStop(1, "#2e2147");

  // Outer base
  ctx.save();
  roundedRect(x, y, size, size, radius);
  ctx.fillStyle = baseG;
  ctx.fill();

  // Inner face
  roundedRect(faceX, faceY, faceS, faceS, Math.max(4, radius - inset));
  ctx.fillStyle = faceG;
  ctx.fill();

  // Inset bevel (inner shadow)
  ctx.save();
  roundedRect(faceX, faceY, faceS, faceS, Math.max(4, radius - inset));
  ctx.clip();
  const shG = ctx.createLinearGradient(faceX, faceY, faceX, faceY + faceS);
  shG.addColorStop(0, "rgba(0,0,0,0.35)");
  shG.addColorStop(0.2, "rgba(0,0,0,0.05)");
  shG.addColorStop(0.8, "rgba(255,255,255,0.03)");
  shG.addColorStop(1, "rgba(255,255,255,0.06)");
  ctx.fillStyle = shG;
  ctx.fillRect(faceX, faceY, faceS, faceS);
  ctx.restore();

  // Optional diagonal motion stripes (very subtle)
  if (stripes) {
    ctx.save();
    roundedRect(faceX, faceY, faceS, faceS, Math.max(4, radius - inset));
    ctx.clip();
    ctx.globalAlpha = 0.06;

    // rotate based on orientation
    const cx = faceX + faceS / 2;
    const cy = faceY + faceS / 2;
    ctx.translate(cx, cy);
    ctx.rotate(((orientation === "h" ? 20 : 70) * Math.PI) / 180);
    ctx.translate(-cx, -cy);

    const step = Math.max(6, Math.floor(size * 0.12));
    for (let i = -size; i < size * 2; i += step) {
      ctx.beginPath();
      ctx.moveTo(faceX + i, faceY - size);
      ctx.lineTo(faceX + i + step / 2, faceY - size);
      ctx.lineTo(faceX + i + faceS, faceY + faceS + size);
      ctx.lineTo(faceX + i + faceS - step / 2, faceY + faceS + size);
      ctx.closePath();
      ctx.fillStyle = "#ffffff";
      ctx.fill();
    }
    ctx.restore();
  }

  // Gloss highlight (top arc)
  if (gloss) {
    ctx.save();
    roundedRect(faceX, faceY, faceS, faceS, Math.max(4, radius - inset));
    ctx.clip();
    const glossH = Math.floor(faceS * 0.45);
    const glossG = ctx.createLinearGradient(
      faceX,
      faceY,
      faceX,
      faceY + glossH
    );
    glossG.addColorStop(0, "rgba(255,255,255,0.22)");
    glossG.addColorStop(1, "rgba(255,255,255,0.00)");
    ctx.fillStyle = glossG;
    ctx.fillRect(faceX, faceY, faceS, glossH);
    ctx.restore();
  }

  // Rim highlight & hairline for crispness
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  roundedRect(x + 0.5, y + 0.5, size - 1, size - 1, radius - 0.5);
  ctx.stroke();

  ctx.restore();
}
