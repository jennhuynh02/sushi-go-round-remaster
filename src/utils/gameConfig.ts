// Score curve
export const SCORE_PER_LEVEL = 500;

// Baseline pacing (Pokemon Stadium–like: readable, reactive)
export const BASE_TICK_MS = 1600;        // gameplay update cadence (slow)
export const BASE_SPAWN_DELAY_MS = 1500; // new sushi spawn cadence
export const ROTATION_SCALE = 0.5;       // reduce angle delta from your current logic

// Difficulty affects speed (lower = faster tick)
export const DIFFICULTY_MULTIPLIER: Record<number, number> = {
  1: 1.15, // Easy → slower
  2: 1.0,  // Normal
  3: 0.85, // Hard → faster
};

// Level ramps gently: each level reduces tick by ~5% (min bounded)
export function computeTickMs(difficulty: number, level: number) {
  const diff = DIFFICULTY_MULTIPLIER[difficulty] ?? 1;
  const levelCurve = Math.pow(0.95, Math.max(0, level - 1)); // 5% faster per level
  const ms = BASE_TICK_MS * diff * levelCurve;
  return Math.max(550, Math.round(ms)); // never go unreadably fast
}

export function computeSpawnDelayMs(difficulty: number, level: number) {
  // Keep spawns roughly aligned to the tick, but a hair faster than rotation
  const ms = computeTickMs(difficulty, level) * 0.95;
  return Math.max(500, Math.round(ms));
}