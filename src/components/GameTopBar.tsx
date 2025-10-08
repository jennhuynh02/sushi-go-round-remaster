import { memo } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Play, Pause, RotateCcw, HelpCircle, BookOpen } from "lucide-react";
import sushiGif from "../assets/sushi_bounce.gif";

export type ControlsProps = {
  currentScore: number;
  isPlaying: boolean;
  level: number;
  onRestart: () => void;
  onShowInstructions: () => void;
  onShowStory: () => void;
  onTogglePlay: () => void;
};

export const GameTopControls = memo(function GameTopControls({
  isPlaying, onTogglePlay, onRestart, onShowInstructions, onShowStory,
  currentScore, level,
}: ControlsProps) {
  return (
    <div className="flex items-center justify-between gap-3">
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
        <Button variant="outline" size="sm" onClick={onTogglePlay}
          aria-label="Play/Pause"
          className="bg-white/10 border-white/30 text-white hover:bg-white/20 h-8 px-2">
          {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
        </Button>
        <Button variant="outline" size="sm" onClick={onRestart} aria-label="Restart"
          className="bg-white/10 border-white/30 text-white hover:bg-white/20 h-8 px-2">
          <RotateCcw className="h-3 w-3" />
        </Button>
        <Button variant="outline" size="sm" onClick={onShowStory} aria-label="Story"
          className="bg-white/10 border-white/30 text-white hover:bg-white/20 h-8 px-2">
          <BookOpen className="h-3 w-3" />
        </Button>
        <Button variant="outline" size="sm" onClick={onShowInstructions} aria-label="Instructions"
          className="bg-white/10 border-white/30 text-white hover:bg-white/20 h-8 px-2">
          <HelpCircle className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}, (a, b) =>
  a.isPlaying === b.isPlaying &&
  a.currentScore === b.currentScore &&
  a.level === b.level
);


export type StatsProps = {
  accuracy: number;        // 0..100
  levelProgress: number;   // 0..100
  sushiCaught: number;
  timeElapsed: string;     // "m:ss"
};

export const GameTopStats = memo(function GameTopStats({
  accuracy,
  levelProgress,
  sushiCaught,
  timeElapsed,
}: StatsProps) {
  const pct = Math.max(0, Math.min(100, levelProgress));

  return (
    <div className="mt-2 rounded-lg border border-white/10 bg-white/5 p-2">
      <div className="flex items-center gap-3 text-xs">
        <span className="whitespace-nowrap text-slate-200/90">Level Progress</span>

        <div className="relative h-2 flex-1 rounded-full bg-white/10 overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-r-full bg-emerald-500"
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="flex items-center gap-2">
          <StatPill label="⏱" value={timeElapsed} />
          <StatPill label="🍣" value={sushiCaught} />
          <StatPill label="⚡" value={`${Math.round(accuracy)}%`} />
        </div>
      </div>
    </div>
  );
});

function StatPill({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="min-w-[64px] px-2 py-1 rounded-full bg-white/10 border border-white/10 text-slate-100/95 flex items-center justify-center gap-1">
      <span className="opacity-90">{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}