import { useRef, useEffect, useCallback } from "react";

interface GameCanvasProps {
  isPlaying: boolean;
  onScoreUpdate: (score: number) => void;
  onLevelUpdate: (level: number) => void;
  onLivesUpdate: (lives: number) => void;
  onSushiCaught: () => void;
}

interface Sushi {
  id: number;
  angle: number;
  radius: number;
  type: 'salmon' | 'tuna' | 'maki' | 'dragon' | 'spoiled';
  value: number;
  speed: number;
  size: number;
}

interface GameState {
  score: number;
  level: number;
  lives: number;
  sushi: Sushi[];
  lickitungAngle: number;
  tongueExtended: boolean;
  tongueLength: number;
  comboMultiplier: number;
  comboCount: number;
  lastComboTime: number;
}

// Sushi types and their properties
const sushiTypes = {
  salmon: { color: '#3B82F6', value: 10, weight: 0.4 },
  tuna: { color: '#EC4899', value: 15, weight: 0.3 },
  maki: { color: '#FACC15', value: 25, weight: 0.2 },
  dragon: { color: '#EF4444', value: 35, weight: 0.08 },
  spoiled: { color: '#4C1D95', value: -50, weight: 0.02 }
};


export function GameCanvas({
  isPlaying,
  onScoreUpdate,
  onLevelUpdate,
  onLivesUpdate,
  onSushiCaught
}: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameStateRef = useRef<GameState>({
    score: 0,
    level: 1,
    lives: 3,
    sushi: [],
    lickitungAngle: 0,
    tongueExtended: false,
    tongueLength: 0,
    comboMultiplier: 1,
    comboCount: 0,
    lastComboTime: 0
  });

  const centerX = 300;
  const centerY = 300;
  const keysPressed = useRef<Set<string>>(new Set());


  // Generate random sushi
  const createSushi = useCallback((id: number): Sushi => {
    const rand = Math.random();
    let sushiType: keyof typeof sushiTypes = 'salmon';
    let cumulative = 0;

    for (const [type, props] of Object.entries(sushiTypes)) {
      cumulative += props.weight;
      if (rand <= cumulative) {
        sushiType = type as keyof typeof sushiTypes;
        break;
      }
    }

    return {
      id,
      angle: Math.random() * Math.PI * 2,
      radius: 120 + Math.random() * 100,
      type: sushiType,
      value: sushiTypes[sushiType].value,
      speed: 0.02 + (gameStateRef.current.level - 1) * 0.005,
      size: 8 + Math.random() * 4
    };
  }, []);

  // Spawn sushi based on level
  const spawnSushi = useCallback(() => {
    const sushiCount = Math.min(8 + gameStateRef.current.level * 2, 20);
    const newSushi: Sushi[] = [];

    for (let i = 0; i < sushiCount; i++) {
      newSushi.push(createSushi(i));
    }

    gameStateRef.current.sushi = newSushi;
  }, [createSushi]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      keysPressed.current.add(event.key.toLowerCase());

      if (event.key === ' ') {
        event.preventDefault();
        gameStateRef.current.tongueExtended = true;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      keysPressed.current.delete(event.key.toLowerCase());

      if (event.key === ' ') {
        gameStateRef.current.tongueExtended = false;
        gameStateRef.current.tongueLength = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Collision detection
  const checkCollisions = useCallback(() => {
    if (!gameStateRef.current.tongueExtended) return;

    const tongueEndX = centerX + Math.cos(gameStateRef.current.lickitungAngle) * gameStateRef.current.tongueLength;
    const tongueEndY = centerY + Math.sin(gameStateRef.current.lickitungAngle) * gameStateRef.current.tongueLength;

    let totalScore = 0;
    const currentTime = Date.now();

    gameStateRef.current.sushi = gameStateRef.current.sushi.filter(sushi => {
      const sushiX = centerX + Math.cos(sushi.angle) * sushi.radius;
      const sushiY = centerY + Math.sin(sushi.angle) * sushi.radius;

      const distance = Math.sqrt((tongueEndX - sushiX) ** 2 + (tongueEndY - sushiY) ** 2);

      if (distance < sushi.size + 5) {
        const score = sushi.value * gameStateRef.current.comboMultiplier;
        totalScore += score;

        if (sushi.type === 'spoiled') {
          gameStateRef.current.lives--;
          gameStateRef.current.comboMultiplier = 1;
          gameStateRef.current.comboCount = 0;
          onLivesUpdate(gameStateRef.current.lives);
        } else {
          // Combo system
          if (currentTime - gameStateRef.current.lastComboTime < 1000) {
            gameStateRef.current.comboCount++;
            gameStateRef.current.comboMultiplier = Math.min(5, 1 + gameStateRef.current.comboCount * 0.5);
          } else {
            gameStateRef.current.comboCount = 1;
            gameStateRef.current.comboMultiplier = 1;
          }
          gameStateRef.current.lastComboTime = currentTime;
        }

        onSushiCaught();
        return false; // Remove sushi
      }
      return true; // Keep sushi
    });

    if (totalScore > 0) {
      gameStateRef.current.score += totalScore;
      onScoreUpdate(gameStateRef.current.score);

      // Level progression
      const newLevel = Math.floor(gameStateRef.current.score / 500) + 1;
      if (newLevel > gameStateRef.current.level) {
        gameStateRef.current.level = newLevel;
        onLevelUpdate(newLevel);
        spawnSushi();
      }
    }

    // Respawn sushi if too few
    if (gameStateRef.current.sushi.length < 5) {
      const newSushi = createSushi(Date.now());
      gameStateRef.current.sushi.push(newSushi);
    }
  }, [onSushiCaught, onScoreUpdate, onLevelUpdate, onLivesUpdate, spawnSushi, createSushi]);

  // Main game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 600;
    canvas.height = 600;

    const gameLoop = () => {
      if (!isPlaying) return;

      // Handle input
      if (keysPressed.current.has('arrowleft')) {
        gameStateRef.current.lickitungAngle -= 0.08;
      }
      if (keysPressed.current.has('arrowright')) {
        gameStateRef.current.lickitungAngle += 0.08;
      }

      // Extend tongue
      if (gameStateRef.current.tongueExtended) {
        gameStateRef.current.tongueLength = Math.min(150, gameStateRef.current.tongueLength + 8);
      }

      // Update sushi
      gameStateRef.current.sushi.forEach(sushi => {
        sushi.angle += sushi.speed;
        if (sushi.angle > Math.PI * 2) sushi.angle -= Math.PI * 2;
      });

      // Check collisions
      checkCollisions();

      // Clear canvas with dark dungeon gradient
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 300);
      gradient.addColorStop(0, '#374151');
      gradient.addColorStop(0.5, '#1F2937');
      gradient.addColorStop(1, '#111827');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw arena border (stone-like)
      ctx.strokeStyle = '#6B7280';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 290, 0, Math.PI * 2);
      ctx.stroke();

      // Draw inner circle (darker)
      ctx.strokeStyle = '#4B5563';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 100, 0, Math.PI * 2);
      ctx.stroke();

      // Draw sushi
      gameStateRef.current.sushi.forEach(sushi => {
        const x = centerX + Math.cos(sushi.angle) * sushi.radius;
        const y = centerY + Math.sin(sushi.angle) * sushi.radius;

        ctx.fillStyle = sushiTypes[sushi.type].color;
        ctx.beginPath();
        ctx.arc(x, y, sushi.size, 0, Math.PI * 2);
        ctx.fill();

        // Sushi highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(x - sushi.size * 0.3, y - sushi.size * 0.3, sushi.size * 0.4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Lickitung
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(gameStateRef.current.lickitungAngle);

      // Body (darker Lickitung for dungeon theme)
      ctx.fillStyle = '#D1D5DB';
      ctx.beginPath();
      ctx.arc(0, 0, 30, 0, Math.PI * 2);
      ctx.fill();

      // Eyes
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(-10, -10, 4, 0, Math.PI * 2);
      ctx.arc(10, -10, 4, 0, Math.PI * 2);
      ctx.fill();

      // Tongue
      if (gameStateRef.current.tongueExtended) {
        ctx.fillStyle = '#DC2626';
        ctx.fillRect(-3, 0, 6, gameStateRef.current.tongueLength);

        // Tongue tip
        ctx.beginPath();
        ctx.arc(0, gameStateRef.current.tongueLength, 6, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      // Draw UI
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(10, 10, 200, 60);
      ctx.fillStyle = '#F3F4F6';
      ctx.font = 'bold 16px monospace';
      ctx.fillText('Sushi Go Round', 20, 30);
      ctx.font = '12px monospace';
      ctx.fillText(`Combo: x${gameStateRef.current.comboMultiplier.toFixed(1)}`, 20, 50);
      ctx.fillText(`Score: ${gameStateRef.current.score}`, 20, 65);

      requestAnimationFrame(gameLoop);
    };

    if (isPlaying) {
      if (gameStateRef.current.sushi.length === 0) {
        spawnSushi();
      }
      gameLoop();
    }
  }, [isPlaying, checkCollisions, spawnSushi]);

  // Reset game state when not playing
  useEffect(() => {
    if (!isPlaying) {
      gameStateRef.current = {
        score: 0,
        level: 1,
        lives: 3,
        sushi: [],
        lickitungAngle: 0,
        tongueExtended: false,
        tongueLength: 0,
        comboMultiplier: 1,
        comboCount: 0,
        lastComboTime: 0
      };
    }
  }, [isPlaying]);

  return (
    <div className="relative w-full">
      <canvas
        ref={canvasRef}
        className="w-full h-auto border-4 border-slate-600 rounded-lg shadow-xl bg-gradient-to-br from-slate-800 to-slate-900"
        style={{ aspectRatio: '1', maxHeight: '90vh' }}
        tabIndex={0}
      />
      {!isPlaying && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 to-slate-800/90 rounded-lg flex items-center justify-center">
          <div className="text-white text-center border-2 border-slate-500 bg-slate-800/95 p-6 rounded-lg">
            <div className="text-2xl mb-2">🍣 Sushi Go Round 🍣</div>
            <div className="text-sm mb-2">Master the Spinning Dojo!</div>
            <div className="text-xs text-slate-300">Press Play to start your sushi adventure!</div>
            <div className="text-xs text-slate-400 mt-2">Use ← → to rotate, Spacebar to catch</div>
          </div>
        </div>
      )}
    </div>
  );
}