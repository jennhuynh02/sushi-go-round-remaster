import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import { Keyboard, Gamepad2 } from "lucide-react";

interface GameControlsProps {
  difficulty: number;
  onDifficultyChange: (difficulty: number) => void;
  onShowInstructions: () => void;
}

export function GameControls({
  difficulty,
  onDifficultyChange,
  onShowInstructions
}: GameControlsProps) {
  const difficultyLabels = ['Easy', 'Normal', 'Hard', 'Expert'];

  return (
    <div className="space-y-2">
      {/* Compact Settings */}
      <Card className="p-3 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardContent className="space-y-2 p-0">
          <div className="flex items-center gap-1">
            <Gamepad2 className="h-3 w-3 text-purple-600" />
            <span className="text-xs font-medium text-purple-800">Battle Settings</span>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-purple-700">Difficulty: {difficultyLabels[difficulty - 1]}</Label>
            <Slider
              value={[difficulty]}
              onValueChange={(value) => onDifficultyChange(value[0])}
              min={1}
              max={4}
              step={1}
              className="h-4"
            />
            <div className="text-xs text-purple-600">Higher levels spawn berries faster</div>
          </div>
        </CardContent>
      </Card>

      {/* Compact Controls */}
      <Card className="p-3 border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-yellow-50">
        <CardContent className="space-y-2 p-0">
          <div className="flex items-center gap-1">
            <Keyboard className="h-3 w-3 text-pink-600" />
            <span className="text-xs font-medium text-pink-800">Trainer Controls</span>
          </div>
          <div className="space-y-1 text-xs text-pink-700">
            <div className="flex justify-between">
              <span>Move Lickitung:</span>
              <span className="font-mono bg-purple-100 text-purple-800 px-1 rounded text-xs">↑↓←→</span>
            </div>
            <div className="flex justify-between">
              <span>Lick Berry:</span>
              <span className="font-mono bg-purple-100 text-purple-800 px-1 rounded text-xs">Space</span>
            </div>
            <div className="flex justify-between">
              <span>Pause Battle:</span>
              <span className="font-mono bg-purple-100 text-purple-800 px-1 rounded text-xs">P</span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onShowInstructions}
            className="w-full h-6 text-xs border-purple-300 text-purple-700 hover:bg-purple-100"
          >
            👅 Battle Guide
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}