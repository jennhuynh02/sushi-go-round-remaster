import { useGameState } from "./hooks/useGameState";
import GameCanvas from "./components/GameCanvas";
import { GameTopControls, GameTopStats } from "./components/GameTopBar";
import { GameControls } from "./components/GameControls";
import { StoryIntroduction } from "./components/StoryIntroduction";
import { InstructionsDialog } from "./components/dialogs/InstructionsDialog";

const App = () => {
  const {
    isPlaying, difficulty, showInstructions, showStory,
    currentScore, level, formattedTime, sushiCaught, accuracy, levelProgress,
    setDifficulty, togglePlay, restart, scoreUpdate, levelUpdate,
    onSushiCaught, startFromStory, openInstructions, closeInstructions, openStory, closeStory,
  } = useGameState();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-2">
      <div className="max-w-full mx-auto space-y-2">
        <div className="rounded-lg border-2 border-slate-500 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 text-white p-2 space-y-2">
          <GameTopControls
            currentScore={currentScore}
            isPlaying={isPlaying}
            level={level}
            onRestart={restart}
            onShowInstructions={openInstructions}
            onShowStory={openStory}
            onTogglePlay={togglePlay}
          />
          <GameTopStats
            accuracy={accuracy}
            levelProgress={levelProgress}
            sushiCaught={sushiCaught}
            timeElapsed={formattedTime}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-2">
          <div className="lg:col-span-5">
            <GameCanvas
              isPlaying={isPlaying}
              onScoreUpdate={scoreUpdate}
              onLevelUpdate={levelUpdate}
              onSushiCaught={onSushiCaught}
            />
          </div>
          <aside className="lg:col-span-1">
            <GameControls
              difficulty={difficulty}
              onDifficultyChange={setDifficulty}
              onShowInstructions={openInstructions}
            />
          </aside>
        </div>
      </div>

      <InstructionsDialog
        open={showInstructions}
        onOpenChange={(o) => (o ? openInstructions() : closeInstructions())}
        onClose={closeInstructions}
      />
      <StoryIntroduction isOpen={showStory} onClose={closeStory} onStartGame={startFromStory} />
    </div>
  );
};
export default App;