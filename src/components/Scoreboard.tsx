import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { Clock, Zap } from "lucide-react";

interface ScoreboardProps {
  currentScore: number;
  level: number;
  timeElapsed: number;
  sushiCaught: number;
  accuracy: number;
  levelProgress: number;
}

export function Scoreboard({
  currentScore,
  level,
  timeElapsed,
  sushiCaught,
  accuracy,
  levelProgress
}: ScoreboardProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="p-3 border-2 border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800">
      <CardContent className="space-y-3 p-0">
        {/* Compact Score Display */}
        <div className="space-y-2">
          <div className="text-center p-2 bg-gradient-to-br from-slate-600 to-slate-700 rounded border-2 border-slate-500">
            <div className="text-lg font-bold text-slate-100">{currentScore.toLocaleString()}</div>
            <div className="text-xs text-slate-300">Sushi Points</div>
          </div>
          <div className="text-center p-2 bg-gradient-to-br from-slate-500 to-slate-600 rounded border-2 border-slate-400">
            <div className="text-lg font-bold text-slate-100">{level}</div>
            <div className="text-xs text-slate-300">Level</div>
          </div>
        </div>
        
        {/* Progress */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-300">
            <span>Level Progress</span>
            <span>{Math.round(levelProgress)}%</span>
          </div>
          <Progress value={levelProgress} className="h-1 bg-slate-600" />
        </div>

        {/* Compact Stats */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-300">
            <Clock className="h-3 w-3 text-slate-400" />
            <span>{formatTime(timeElapsed)}</span>
          </div>
          <div className="flex justify-between text-xs text-slate-300">
            <span>🍣</span>
            <span>{sushiCaught}</span>
          </div>
          <div className="flex justify-between text-xs text-slate-300">
            <Zap className="h-3 w-3 text-amber-500" />
            <span className={accuracy >= 80 ? "text-emerald-400" : "text-amber-400"}>
              {accuracy}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}