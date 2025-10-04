import { useGameState } from "./hooks/useGameState";
import { GameCanvas } from "./components/GameCanvas";
import {GameHeader} from "./components/GameHeader";
import {Scoreboard} from "./components/Scoreboard";
import { GameControls } from "./components/GameControls";
import { StoryIntroduction } from "./components/StoryIntroduction";
import { InstructionsDialog } from "./components/dialogs/InstructionsDialog";


export default function App() {
  const {
    // gameplay + overlays
    isPlaying,
    difficulty,
    showInstructions,
    showStory,

    // stats
    currentScore,
    level,
    lives,
    timeElapsed,
    sushiCaught,
    accuracy,
    levelProgress,

    // actions
    setDifficulty,
    togglePlay,
    restart,
    scoreUpdate,
    levelUpdate,
    livesUpdate,
    onSushiCaught,
    startFromStory,
    openInstructions,
    closeInstructions,
    openStory,
    closeStory,
  } = useGameState();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-2">
      <div className="max-w-full mx-auto space-y-2">
        <GameHeader
          isPlaying={isPlaying}
          onTogglePlay={togglePlay}
          onRestart={restart}
          onShowInstructions={openInstructions}
          onShowStory={openStory}
          currentScore={currentScore}
          level={level}
          lives={lives}
        />

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-2">
          <div className="lg:col-span-5">
       <GameCanvas
              isPlaying={isPlaying}
              onScoreUpdate={scoreUpdate}
              onLevelUpdate={levelUpdate}
              onLivesUpdate={livesUpdate}
              onSushiCaught={onSushiCaught}
            />
          </div>

          <aside className="lg:col-span-1 space-y-2">
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
}