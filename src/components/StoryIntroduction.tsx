import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ChevronRight, Star, Trophy, Zap } from "lucide-react";

interface StoryIntroductionProps {
  isOpen: boolean;
  onClose: () => void;
  onStartGame: () => void;
}

export function StoryIntroduction({ isOpen, onClose, onStartGame }: StoryIntroductionProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const storyPages = [
    {
      title: "Welcome to Sushi Go Round!",
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-6xl mb-4">🍣</div>
            <h3 className="text-xl font-bold text-slate-700">The Spinning Sushi Challenge</h3>
          </div>
          <p className="text-sm leading-relaxed">
            Welcome, Trainer! You've entered the mysterious underground sushi dojo, 
            where the legendary <strong>Sushi Go Round</strong> challenge awaits brave adventurers!
          </p>
          <Card className="bg-gradient-to-r from-slate-700 to-slate-600 border-2 border-slate-500">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 text-sm text-slate-100">
                <Trophy className="h-4 w-4" />
                <span className="font-semibold">Dojo Status: OPEN</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      title: "Meet Your Champion: Lickitung!",
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-6xl mb-4">👅</div>
            <h3 className="text-xl font-bold text-slate-700">The Dungeon Companion</h3>
          </div>
          <p className="text-sm leading-relaxed">
            Your trusted partner Lickitung has trained in the deepest dungeons for this moment! Known for its 
            incredible tongue dexterity and sushi-catching abilities, Lickitung is ready to prove 
            it's the ultimate sushi master.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Badge className="bg-slate-600 text-white justify-center py-1">
              Type: Normal
            </Badge>
            <Badge className="bg-slate-700 text-white justify-center py-1">
              Specialty: Sushi Master
            </Badge>
          </div>
          <Card className="bg-gradient-to-r from-slate-600 to-slate-700 border-2 border-slate-500">
            <CardContent className="p-3">
              <div className="text-xs text-slate-100">
                <strong>Fun Fact:</strong> Lickitung's tongue is twice as long as its body and can extend up to 6 feet!
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      title: "The Sushi Go Round Challenge",
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-6xl mb-4">🍣</div>
            <h3 className="text-xl font-bold text-slate-700">The Spinning Dojo</h3>
          </div>
          <p className="text-sm leading-relaxed">
            The challenge takes place in the mysterious <strong>Sushi Go Round Dojo</strong>, 
            where fresh sushi spins around Lickitung in hypnotic patterns that test your reflexes and timing!
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span><strong>Salmon Roll</strong> - Basic sushi (10 points)</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
              <span><strong>Tuna Sashimi</strong> - Fresh and tasty (15 points)</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span><strong>Premium Maki</strong> - High quality (25 points)</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span><strong>Dragon Roll</strong> - Rare delicacy (35 points)</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-purple-800 rounded-full"></div>
              <span><strong>Spoiled Sushi</strong> - AVOID! (-50 points & health)</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Dojo Rules & Victory",
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-6xl mb-4">🥷</div>
            <h3 className="text-xl font-bold text-slate-700">Path of the Sushi Master</h3>
          </div>
          <div className="space-y-3">
            <Card className="bg-slate-700 border-slate-600">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 text-sm text-slate-100">
                  <Zap className="h-4 w-4" />
                  <span className="font-semibold">Objective:</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Guide Lickitung through multiple dojo levels, catching as much sushi as possible 
                  while avoiding spoiled pieces to become the ultimate Sushi Master!
                </p>
              </CardContent>
            </Card>
            <Card className="bg-slate-600 border-slate-500">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 text-sm text-slate-100">
                  <Star className="h-4 w-4" />
                  <span className="font-semibold">Victory Conditions:</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Advance through all dojo levels with the highest score possible. 
                  Each level gets more challenging with faster spinning sushi and new patterns!
                </p>
              </CardContent>
            </Card>
          </div>
          <p className="text-center text-sm font-semibold text-slate-700">
            Are you ready to master the art of Sushi Go Round?
          </p>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentPage < storyPages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleStartGame = () => {
    onStartGame();
    onClose();
    setCurrentPage(0); // Reset for next time
  };

  const handleSkip = () => {
    onClose();
    setCurrentPage(0); // Reset for next time
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 border-4 border-slate-600">
        <DialogHeader>
          <DialogTitle className="text-center text-slate-800 flex items-center justify-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {currentPage + 1}
            </div>
            {storyPages[currentPage].title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Story Content */}
          <div className="min-h-[300px]">
            {storyPages[currentPage].content}
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center gap-1">
            {storyPages.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentPage 
                    ? 'bg-slate-700' 
                    : index < currentPage 
                      ? 'bg-slate-500' 
                      : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSkip}
              className="text-gray-600 border-gray-300 hover:bg-gray-100"
            >
              Skip Story
            </Button>

            <div className="flex gap-2">
              {currentPage > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevious}
                  className="border-slate-400 text-slate-700 hover:bg-slate-200"
                >
                  Previous
                </Button>
              )}
              
              {currentPage < storyPages.length - 1 ? (
                <Button
                  size="sm"
                  onClick={handleNext}
                  className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white"
                >
                  Next <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={handleStartGame}
                  className="bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white font-bold"
                >
                  Enter the Dojo! 🥷
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}