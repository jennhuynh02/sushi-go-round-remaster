import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

type InstructionsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
};

export function InstructionsDialog({
  open,
  onOpenChange,
  onClose,
}: InstructionsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>🍣 How to Play Sushi Go Round</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm leading-relaxed">
          <p>
            <strong>Objective:</strong> Control Lickitung in the center as sushi
            spins around you in rhythmic patterns. Time your tongue extensions
            to catch sushi as it passes by — aim for combos and accuracy!
          </p>

          <div className="space-y-2">
            <h4 className="font-semibold">🎮 Controls:</h4>
            <ul className="ml-4 list-disc space-y-1">
              <li>Arrow Keys – Rotate Lickitung’s direction</li>
              <li>Spacebar – Extend tongue to lick</li>
              <li>P – Pause / Resume the game</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">💡 Tips:</h4>
            <ul className="ml-4 list-disc space-y-1">
              <li>Each level slightly increases sushi speed</li>
              <li>Avoid spoiled sushi (dark purple)</li>
              <li>Catch multiple sushi in one lick for combo bonuses</li>
              <li>Watch for rhythm — success is all about timing!</li>
            </ul>
          </div>

          <Button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800"
          >
            Ready to Spin! 🍣
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}