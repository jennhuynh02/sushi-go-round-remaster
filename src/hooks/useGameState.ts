// src/hooks/useGameState.ts
import { useEffect, useMemo, useState, useCallback } from "react";
import { levelProgressPct, rollHitAccuracy } from "./../utils/scoring";
import {
  computeSpawnDelayMs,
  computeTickMs,
  ROTATION_SCALE,
} from "../utils/gameConfig";

export function useGameState() {
  // Core toggles & overlays
  const [isPlaying, setIsPlaying] = useState(false);
  const [difficulty, setDifficulty] = useState(2); // 1 easy, 2 normal, 3 hard
  const [showInstructions, setShowInstructions] = useState(false);
  const [showStory, setShowStory] = useState(true);
  const [hasSeenStory, setHasSeenStory] = useState(false);

  // Stats
  const [currentScore, setCurrentScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [sushiCaught, setSushiCaught] = useState(0);
  const [accuracy, setAccuracy] = useState(95);

  // Derived
  const levelProgress = useMemo(
    () => levelProgressPct(currentScore, level),
    [currentScore, level]
  );

  // 🍣 Gameplay timing derived from difficulty+level
  const tickMs = useMemo(
    () => computeTickMs(difficulty, level),
    [difficulty, level]
  );
  const spawnDelayMs = useMemo(
    () => computeSpawnDelayMs(difficulty, level),
    [difficulty, level]
  );
  const rotationScale = ROTATION_SCALE;

  // Elapsed timer: keep it simple 1s increments
  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => setTimeElapsed((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [isPlaying]);

  // Actions
  const togglePlay = useCallback(() => {
    if (!isPlaying && !hasSeenStory) {
      setShowStory(true);
      return;
    }
    setIsPlaying((p) => !p);
  }, [isPlaying, hasSeenStory]);

  const startFromStory = useCallback(() => {
    setHasSeenStory(true);
    // soft ease-in
    setTimeout(() => {
      setIsPlaying(true);
      setShowStory(false);
    }, 800);
  }, []);

  const restart = useCallback(() => {
    setIsPlaying(false);
    setCurrentScore(0);
    setLevel(1);
    setLives(3);
    setTimeElapsed(0);
    setSushiCaught(0);
    setAccuracy(95);
  }, []);

  const scoreUpdate = useCallback((score: number) => {
    setCurrentScore(score);
  }, []);

  const levelUpdate = useCallback((newLevel: number) => {
    setLevel(newLevel);
  }, []);

  const livesUpdate = useCallback((newLives: number) => {
    setLives(newLives);
    if (newLives <= 0) {
      setTimeout(() => setIsPlaying(false), 1000); // allow death anim to play
    }
  }, []);

  const onSushiCaught = useCallback(() => {
    setSushiCaught((c) => c + 1);
    setAccuracy(rollHitAccuracy());
  }, []);

  const openInstructions = useCallback(() => setShowInstructions(true), []);
  const closeInstructions = useCallback(() => setShowInstructions(false), []);
  const openStory = useCallback(() => setShowStory(true), []);
  const closeStory = useCallback(() => setShowStory(false), []);

  return {
    // state
    isPlaying,
    difficulty,
    showInstructions,
    showStory,
    hasSeenStory,
    currentScore,
    level,
    lives,
    timeElapsed,
    sushiCaught,
    accuracy,
    levelProgress,

    // gameplay pacing (for GameCanvas)
    tickMs,         // update cadence for movement/logic
    spawnDelayMs,   // spawn cadence
    rotationScale,  // multiply any angle delta by this

    // setters / actions
    setDifficulty,
    setShowInstructions, // still exposed for your Dialog component if needed
    togglePlay,
    startFromStory,
    restart,
    scoreUpdate,
    levelUpdate,
    livesUpdate,
    onSushiCaught,
    openInstructions,
    closeInstructions,
    openStory,
    closeStory,
  } as const;
}