import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Keyboard, Gamepad2 } from "lucide-react";

interface GameControlsProps {
  difficulty: number;
  onDifficultyChange: (difficulty: number) => void;
  onShowInstructions: () => void;
}

export function GameControls({

  onShowInstructions
}: GameControlsProps) {

  return (
    <div className="space-y-2">
      {/* Compact Settings */}
      <Card className="p-3 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardContent className="space-y-2 p-0">
          <div className="flex items-center gap-1">
            <Gamepad2 className="h-3 w-3 text-purple-600" />
            <span className="text-xs font-medium text-purple-800">Battle Guide</span>
          </div>
          <ul className="list-disc ml-1 text-xs text-purple-700 space-y-1">
            <li>🎯 Catch sushi 🍣 as it moves around the conveyor.</li>
            <li>💥 Avoid bombs 💣 and chilis 🌶️ — they lower your score!</li>
            <li>⚡ Levels get faster over time; difficulty increases automatically ⌛️ — stay alive as long as you can to climb rounds.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Compact Controls */}
      <Card className="p-3 border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-yellow-50">
        <CardContent className="space-y-2 p-0">
          <div className="flex items-center gap-1">
            <Keyboard className="h-3 w-3 text-pink-600" />
            <span className="text-xs font-medium text-pink-800">Gamer Controls</span>
          </div>
          <div className="space-y-1 text-xs text-pink-700">
            <div className="flex justify-between">
              <span>Move Monster:</span>
              <span className="font-mono bg-purple-100 text-purple-800 px-1 rounded text-xs">↑↓←→</span>
            </div>
            <div className="flex justify-between">
              <span>Eat Sushi:</span>
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
            🗺️ Battle Guide
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}