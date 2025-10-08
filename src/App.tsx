import GameCanvas from "./components/GameCanvas";
import { GameControls } from "./components/GameControls";
import { GameTopBar } from "./components/GameTopBar";
import { StoryIntroduction } from "./components/StoryIntroduction";
import { InstructionsDialog } from "./components/dialogs/InstructionsDialog";
import { useGameState } from "./hooks/useGameState";

const App = () => {
  const {
    accuracy,
    closeInstructions,
    closeStory,
    difficulty,
    formattedTime,
    isPlaying,
    level,
    levelProgress,
    levelUpdate,
    onSushiCaught,
    openInstructions,
    openStory,
    restart,
    scoreUpdate,
    setDifficulty,
    showInstructions,
    showStory,
    startFromStory,
    sushiCaught,
    togglePlay,
  } = useGameState();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c7b4f8] via-[#d7b9ff] to-[#e7c5ff] p-3">
      <div className="max-w-full mx-auto space-y-3">
        <div className="rounded-xl border-2 border-purple-200/40 bg-gradient-to-br from-[#f3e8ff]/90 to-[#fce7f3]/90 p-3 shadow-sm">
          <GameTopBar
            accuracy={accuracy}
            isPlaying={isPlaying}
            level={level}
            levelProgress={levelProgress}
            onRestart={restart}
            onShowInstructions={openInstructions}
            onShowStory={openStory}
            onTogglePlay={togglePlay}
            sushiCaught={sushiCaught}
            timeElapsed={formattedTime}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-3">
          <div className="lg:col-span-5 rounded-xl border-2 border-purple-400/40 bg-[#1a102e] p-2">
            <GameCanvas
              isPlaying={isPlaying}
              onLevelUpdate={levelUpdate}
              onScoreUpdate={scoreUpdate}
              onSushiCaught={onSushiCaught}
            />
          </div>

          <aside className="lg:col-span-1 rounded-xl border-2 border-purple-300/40 bg-gradient-to-br from-[#e9d5ff]/50 to-[#fce7f3]/50 p-2">
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
      <StoryIntroduction
        isOpen={showStory}
        onClose={closeStory}
        onStartGame={startFromStory}
      />
    </div>
  );
};

export default App;
