import { memo } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Play, Pause, RotateCcw, HelpCircle, BookOpen } from "lucide-react";
import sushiGif from "../assets/sushi_bounce.gif";

export type GameTopBarProps = {
  accuracy: number;
  isPlaying: boolean;
  level: number;
  levelProgress: number;
  onRestart: () => void;
  onShowInstructions: () => void;
  onShowStory: () => void;
  onTogglePlay: () => void;
  sushiCaught: number;
  timeElapsed: string;
};

const btn =
  "h-8 px-2 rounded-lg bg-white/80 hover:bg-white text-purple-800 border-2 border-purple-300";
const icon = "h-3 w-3";
const Pill = ({ label, value }: { label: string; value: string | number }) => (
  <div className="min-w-[64px] px-2 py-1 rounded-full bg-white border-2 border-purple-300 text-purple-800 text-xs font-medium flex items-center justify-center gap-1 shrink-0">
    <span className="opacity-90">{label}</span>
    <span className="tabular-nums">{value}</span>
  </div>
);

export const GameTopBar = memo(function GameTopBar({
  accuracy,
  isPlaying,
  level,
  levelProgress,
  onRestart,
  onShowInstructions,
  onShowStory,
  onTogglePlay,
  sushiCaught,
  timeElapsed,
}: GameTopBarProps) {
  const pct = Math.max(0, Math.min(100, levelProgress));
  const actions = [
    {
      k: "pp",
      a: onTogglePlay,
      l: "Play/Pause",
      i: isPlaying ? <Pause className={icon} /> : <Play className={icon} />,
    },
    { k: "rs", a: onRestart, l: "Restart", i: <RotateCcw className={icon} /> },
    { k: "st", a: onShowStory, l: "Story", i: <BookOpen className={icon} /> },
    {
      k: "in",
      a: onShowInstructions,
      l: "Instructions",
      i: <HelpCircle className={icon} />,
    },
  ];

  return (
    <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-3 space-y-3">
      <div className="flex items-center justify-between gap-3 flex-nowrap">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={sushiGif}
            alt=""
            className="w-6 h-6 select-none pointer-events-none shrink-0"
          />
          <h1 className="text-lg font-bold text-purple-800 whitespace-nowrap">
            Sushi Go Round
          </h1>
          <Badge className="text-xs font-semibold rounded-full bg-purple-100 text-purple-800 border-2 border-purple-300 shrink-0">
            Round {level}
          </Badge>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {actions.map(({ k, a, l, i }) => (
            <Button
              key={k}
              aria-label={l}
              variant="outline"
              size="sm"
              onClick={a}
              className={btn}
            >
              {i}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs flex-nowrap">
        <span className="text-purple-800 font-medium whitespace-nowrap">
          Level Progress
        </span>
        <div
          className="relative h-2 rounded-full bg-purple-100 border-2 border-purple-200 overflow-hidden flex-1"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="absolute inset-y-0 left-0 rounded-r-full bg-gradient-to-r from-purple-400 to-pink-400"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Pill label="⏱" value={timeElapsed} />
          <Pill label="🍣" value={sushiCaught} />
          <Pill label="⚡" value={`${Math.round(accuracy)}%`} />
        </div>
      </div>
    </div>
  );
});
