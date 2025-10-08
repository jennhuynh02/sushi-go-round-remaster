import { memo, useEffect, useRef } from "react";
import { drawConveyorTile } from "../game/conveyorTile";

import {
  createBoard,
  drawBeltUnderlay,
  getUnderlayPath,
  getUnderlayWidth,
  stepBelt,
  type BoardState,
} from "../game/board";
import { drawBomb, initBombSprite } from "../game/bombSprite";

type Props = {
  isPlaying: boolean;
  onLevelUpdate: (n: number) => void;
  onScoreUpdate: (n: number) => void;
  onSushiCaught: () => void;
};

const GameCanvas = ({ isPlaying }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boardRef = useRef<BoardState | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);
  const accRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isPlaying) return;

    canvas.width = 600;
    canvas.height = 600;

    boardRef.current = createBoard(100, 10, 10, 15);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scale = 0.6;

    initBombSprite(); // start loading bomb.png once

    const loop = (t: number) => {
      if (lastRef.current === null) lastRef.current = t;
      const dt = t - lastRef.current;
      lastRef.current = t;

      accRef.current += dt;
      while (accRef.current >= 30) {
        boardRef.current = stepBelt(boardRef.current!);
        accRef.current -= 30;
      }

      drawBoard(ctx, boardRef.current!, scale);
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastRef.current = null;
      accRef.current = 0;
    };
  }, [isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-auto rounded-lg border-4 border-slate-600 bg-slate-900"
      style={{ aspectRatio: "1", maxHeight: "90vh" }}
    />
  );
};

export default memo(GameCanvas);

const drawBoard = (
  ctx: CanvasRenderingContext2D,
  board: BoardState,
  scale: number
) => {
  const W = board.cols * board.tileSize;
  const H = board.rows * board.tileSize;

  ctx.save();
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.scale(scale, scale);

  // background — rich deep violet
  ctx.fillStyle = "#1a102e";
  ctx.fillRect(0, 0, W, H);

  // alternating tiles — subtle purplish tones
  for (let c = 0; c < board.cols; c++) {
    for (let r = 0; r < board.rows; r++) {
      const x = c * board.tileSize;
      const y = r * board.tileSize;
      ctx.fillStyle = (c + r) % 2 === 0 ? "#2b1b47" : "#23153c";
      ctx.fillRect(x, y, board.tileSize, board.tileSize);
    }
  }

  // soft purple corners
  const t = 0,
    b = H - 100,
    l = 0,
    r = W - 100;
  ctx.fillStyle = "#3b275f";
  ctx.fillRect(l, t, 100, 100);
  ctx.fillRect(r, t, 100, 100);
  ctx.fillRect(l, b, 100, 100);
  ctx.fillRect(r, b, 100, 100);

  // conveyor underlay with subtle glow
  ctx.shadowColor = "rgba(126, 91, 239, 0.3)";
  ctx.shadowBlur = 8;
  drawBeltUnderlay(ctx, getUnderlayPath(board), getUnderlayWidth(board));
  ctx.shadowBlur = 0;

  // sushi/bombs
  board.items.forEach((idx, i) => {
    const [x, y] = board.loopPath[Math.floor(idx)];
    drawConveyorTile(ctx, x, y, 100);
    if (i % 5 === 0) drawBomb(ctx, x + 25, y + 25, 50);
  });

  ctx.restore();
};
