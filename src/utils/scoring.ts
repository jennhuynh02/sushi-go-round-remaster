import { SCORE_PER_LEVEL } from "./gameConfig";

export const levelThreshold = (level: number) => level * SCORE_PER_LEVEL;

export function levelProgressPct(score: number, level: number) {
  const ceiling = levelThreshold(level);
  const floor = levelThreshold(level - 1);
  if (score <= floor) return 0;
  const span = Math.max(1, ceiling - floor);
  return Math.min(100, Math.max(0, ((score - floor) / span) * 100));
}

export function rollHitAccuracy(base = 95, jitter = 5) {
  const n = base + (Math.random() * (jitter * 2) - jitter);
  return Math.round(Math.min(100, Math.max(70, n)));
}