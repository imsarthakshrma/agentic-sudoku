'use client';

interface TimerProps {
  elapsedTime: number;
  difficulty: string;
  isComplete: boolean;
}

export function Timer({ elapsedTime, difficulty, isComplete }: TimerProps) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-[500px] mx-auto flex justify-between items-center text-sm">
      <div className="text-[var(--foreground)] opacity-60 uppercase tracking-wider">
        {difficulty}
      </div>
      <div className="font-mono text-lg">
        {formatTime(elapsedTime)}
      </div>
      {isComplete && (
        <div className="text-[var(--foreground)] opacity-60">
          ✓ Complete
        </div>
      )}
    </div>
  );
}
