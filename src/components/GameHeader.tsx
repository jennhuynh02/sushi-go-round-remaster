import { memo } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Play, Pause, RotateCcw, HelpCircle, BookOpen } from "lucide-react";
import sushiGif from "../assets/sushi_bounce.gif";

type Props = {
  currentScore: number;
  isPlaying: boolean;
  level: number;
  onRestart: () => void;
  onShowInstructions: () => void;
  onShowStory: () => void;
  onTogglePlay: () => void;
};

function GameHeaderBase({
  currentScore,
  isPlaying,
  level,
  onRestart,
  onShowInstructions,
  onShowStory,
  onTogglePlay,
}: Props) {
  return (
    <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 text-white p-2 rounded-lg border-2 border-slate-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold flex items-center gap-2">
            <img src={sushiGif} alt="" className="w-6 h-6 select-none pointer-events-none" />
            <span>Sushi Go Round</span>
          </h1>
          <div className="flex gap-2 items-center">
            <Badge className="bg-amber-600/80 text-slate-100 border border-amber-500 text-xs font-bold">
              Round {level}
            </Badge>
            <Badge className="bg-emerald-600/80 text-slate-100 border border-emerald-500 text-xs font-bold">
              {currentScore.toLocaleString()}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline" size="sm" onClick={onTogglePlay} aria-label="Play/Pause"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 h-8 px-2"
          >
            {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          </Button>
          <Button
            variant="outline" size="sm" onClick={onRestart} aria-label="Restart"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 h-8 px-2"
          >
            <RotateCcw className="h-3 w-3" />
          </Button>
          <Button
            variant="outline" size="sm" onClick={onShowStory} aria-label="Story"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 h-8 px-2"
          >
            <BookOpen className="h-3 w-3" />
          </Button>
          <Button
            variant="outline" size="sm" onClick={onShowInstructions} aria-label="Instructions"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 h-8 px-2"
          >
            <HelpCircle className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// Only re-render when these change:
export const GameHeader = memo(
  GameHeaderBase,
  (a, b) =>
    a.isPlaying === b.isPlaying &&
    a.currentScore === b.currentScore &&
    a.level === b.level
);