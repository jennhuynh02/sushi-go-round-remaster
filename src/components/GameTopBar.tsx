import { memo } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Play, Pause, RotateCcw, HelpCircle, BookOpen } from "lucide-react";
import sushiGif from "../assets/sushi_bounce.gif";

type Props = {
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

const icon = "h-3 w-3";
const btn =
  "h-8 px-2 rounded-lg bg-white/80 hover:bg-white text-purple-800 border-2 border-purple-300";
const pill =
  "min-w-[64px] px-2 py-1 rounded-full bg-white border-2 border-purple-300 text-purple-800 text-xs font-medium flex items-center justify-center gap-1 shrink-0";

const Pill = ({ label, value }: { label: string; value: string | number }) => (
  <div className={pill}>
    <span className="opacity-90">{label}</span>
    <span className="tabular-nums">{value}</span>
  </div>
);

const Progress = ({ pct }: { pct: number }) => (
  <div
    className="relative h-2 flex-1 min-w-0 rounded-full bg-purple-100 border-2 border-purple-200 overflow-hidden"
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
}: Props) {
  const pct = Math.max(0, Math.min(100, levelProgress));
  const actions = [
    {
      k: "pp",
      on: onTogglePlay,
      a: "Play/Pause",
      i: isPlaying ? <Pause className={icon} /> : <Play className={icon} />,
    },
    { k: "rs", on: onRestart, a: "Restart", i: <RotateCcw className={icon} /> },
    { k: "st", on: onShowStory, a: "Story", i: <BookOpen className={icon} /> },
    {
      k: "in",
      on: onShowInstructions,
      a: "Instructions",
      i: <HelpCircle className={icon} />,
    },
  ];
  const stats = [
    { k: "t", l: "⏱", v: timeElapsed },
    { k: "s", l: "🍣", v: sushiCaught },
    { k: "a", l: "⚡", v: `${Math.round(accuracy)}%` },
  ];

  return (
    <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-3 space-y-3">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex justify-between md:flex-1 min-w-0">
          <div className="flex items-center gap-3 shrink-0">
            <img
              src={sushiGif}
              alt=""
              className="w-6 h-6 select-none pointer-events-none"
            />
            <h1 className="text-lg font-bold text-purple-800">
              Sushi Go Round
            </h1>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {actions.map((x) => (
              <Button
                key={x.k}
                aria-label={x.a}
                variant="outline"
                size="sm"
                onClick={x.on}
                className={btn}
              >
                {x.i}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs md:flex-1 min-w-0">
          <Badge className="text-xs font-semibold rounded-full bg-purple-100 text-purple-800 border-2 border-purple-300">
            Round {level}
          </Badge>
          <span className="text-purple-800 font-medium shrink-0">
            Level Progress
          </span>
          <Progress pct={pct} />
          <div className="flex items-center gap-2 shrink-0">
            {stats.map((s) => (
              <Pill key={s.k} label={s.l} value={s.v} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
