import { useState, useEffect } from "react";
import { GameHeader } from "./components/GameHeader";
import { Scoreboard } from "./components/Scoreboard";
import { GameCanvas } from "./components/GameCanvas";
import { GameControls } from "./components/GameControls";
import { StoryIntroduction } from "./components/StoryIntroduction";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";
import { Button } from "./components/ui/button";

export default function App() {
  // Game state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [sushiCaught, setSushiCaught] = useState(0);
  const [accuracy, setAccuracy] = useState(95);
  const [levelProgress, setLevelProgress] = useState(0);

  // Settings state
  const [difficulty, setDifficulty] = useState(2);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showStory, setShowStory] = useState(true);
  const [hasSeenStory, setHasSeenStory] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Level progress calculation
  useEffect(() => {
    const scoreThreshold = level * 500;
    const prevThreshold = (level - 1) * 500;
    const progress = Math.min(
      100,
      ((currentScore - prevThreshold) /
        (scoreThreshold - prevThreshold)) *
        100,
    );
    setLevelProgress(Math.max(0, progress));
  }, [currentScore, level]);

  const handleTogglePlay = () => {
    // Show story if first time playing
    if (!isPlaying && !hasSeenStory) {
      setShowStory(true);
      return;
    }
    setIsPlaying(!isPlaying);
  };

  const handleStartGameFromStory = () => {
    setHasSeenStory(true);
    setIsPlaying(true);
    setShowStory(false);
  };

  const handleRestart = () => {
    setIsPlaying(false);
    setCurrentScore(0);
    setLevel(1);
    setLives(3);
    setTimeElapsed(0);
    setSushiCaught(0);
    setAccuracy(95);
    setLevelProgress(0);
  };

  const handleShowStory = () => {
    setShowStory(true);
  };

  const handleScoreUpdate = (score: number) => {
    setCurrentScore(score);
  };

  const handleLevelUpdate = (newLevel: number) => {
    setLevel(newLevel);
  };

  const handleLivesUpdate = (newLives: number) => {
    setLives(newLives);
    // Stop game when lives reach 0
    if (newLives <= 0) {
      setTimeout(() => {
        setIsPlaying(false);
      }, 1000);
    }
  };

  const handleSushiCaught = () => {
    setSushiCaught((prev) => prev + 1);
    // Simulate accuracy calculation
    const newAccuracy = Math.max(
      70,
      Math.min(100, 95 + Math.random() * 10 - 5),
    );
    setAccuracy(Math.round(newAccuracy));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-2">
      <div className="max-w-full mx-auto space-y-2">
        {/* Minimal Header */}
        <GameHeader
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
          onRestart={handleRestart}
          onShowInstructions={() => setShowInstructions(true)}
          onShowStory={handleShowStory}
          currentScore={currentScore}
          level={level}
          lives={lives}
        />

        {/* Main Game Area - Game takes maximum space */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-2">
          {/* Game Canvas - Takes most space */}
          <div className="lg:col-span-5">
            <GameCanvas
              isPlaying={isPlaying}
              onScoreUpdate={handleScoreUpdate}
              onLevelUpdate={handleLevelUpdate}
              onLivesUpdate={handleLivesUpdate}
              onSushiCaught={handleSushiCaught}
            />
          </div>

          {/* Compact Sidebar - Minimal space */}
          <div className="lg:col-span-1 space-y-2">
            <Scoreboard
              currentScore={currentScore}
              level={level}
              timeElapsed={timeElapsed}
              sushiCaught={sushiCaught}
              accuracy={accuracy}
              levelProgress={levelProgress}
            />
            <GameControls
              difficulty={difficulty}
              onDifficultyChange={setDifficulty}
              onShowInstructions={() => setShowInstructions(true)}
            />
          </div>
        </div>
      </div>

      {/* Instructions Dialog */}
      <Dialog
        open={showInstructions}
        onOpenChange={setShowInstructions}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              🍣 How to Play Sushi Go Round
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <p>
              <strong>Objective:</strong> Control Lickitung in the center as sushi 
              spins around you in circular patterns. Time your tongue extensions perfectly 
              to catch delicious sushi as it passes by and rack up massive scores!
            </p>

            <div className="space-y-2">
              <h4 className="font-semibold">Controls:</h4>
              <ul className="space-y-1 ml-4">
                <li>• Arrow Keys: Rotate Lickitung's direction</li>
                <li>• Spacebar: Extend tongue to lick</li>
                <li>• P: Pause game</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Game Tips:</h4>
              <ul className="space-y-1 ml-4">
                <li>• Sushi spins faster each round</li>
                <li>• Avoid spoiled sushi (dark purple ones)</li>
                <li>• Catch multiple pieces in one lick for combos</li>
                <li>• Watch for spinning patterns and timing</li>
              </ul>
            </div>

            <Button
              onClick={() => setShowInstructions(false)}
              className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800"
            >
              Ready to Spin! 🍣
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Story Introduction */}
      <StoryIntroduction
        isOpen={showStory}
        onClose={() => setShowStory(false)}
        onStartGame={handleStartGameFromStory}
      />
    </div>
  );
}