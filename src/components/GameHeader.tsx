import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Play, Pause, RotateCcw, HelpCircle, BookOpen } from "lucide-react";
import sushiGif from "../assets/sushi_bounce.gif"; // adjust path if needed

export function GameHeaderTitle() {
  return (
    <h1 className="text-lg font-bold flex items-center gap-2">
      <img
        src={sushiGif}
        alt="Sushi logo"
        className="w-6 h-6 select-none pointer-events-none"
      />
      Sushi Go Round
    </h1>
  );
}

interface GameHeaderProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onRestart: () => void;
  onShowInstructions: () => void;
  onShowStory: () => void;
  currentScore: number;
  level: number;
}

export function GameHeader({ 
  isPlaying, 
  onTogglePlay, 
  onRestart, 
  onShowInstructions, 
  onShowStory,
  currentScore, 
  level, 
}: GameHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 text-white p-2 rounded-lg shadow-sm border-2 border-slate-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          
          <GameHeaderTitle />
          <div className="flex gap-2 items-center">
            <Badge variant="secondary" className="bg-amber-600/80 text-slate-100 border-amber-500 text-xs font-bold">
              Round {level}
            </Badge>
            <Badge variant="secondary" className="bg-emerald-600/80 text-slate-100 border-emerald-500 text-xs font-bold">
              {currentScore.toLocaleString()}
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={onTogglePlay}
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 h-8 px-2"
          >
            {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onRestart}
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 h-8 px-2"
          >
            <RotateCcw className="h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onShowStory}
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 h-8 px-2"
          >
            <BookOpen className="h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onShowInstructions}
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 h-8 px-2"
          >
            <HelpCircle className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}