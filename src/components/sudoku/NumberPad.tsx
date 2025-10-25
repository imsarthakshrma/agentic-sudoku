'use client';

interface NumberPadProps {
  onNumberClick: (num: number) => void;
  isNotesMode: boolean;
}

export function NumberPad({ onNumberClick, isNotesMode }: NumberPadProps) {
  return (
    <div className="w-full max-w-[500px] mx-auto">
      <div className="grid grid-cols-9 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => onNumberClick(num)}
            className="aspect-square border border-[var(--border)] rounded-md hover:bg-[var(--cell-highlight)] active:scale-95 transition-all duration-150 text-lg font-medium flex items-center justify-center"
          >
            {num}
          </button>
        ))}
      </div>
      {isNotesMode && (
        <div className="text-center mt-2 text-sm text-[var(--foreground)] opacity-50">
          Notes mode active
        </div>
      )}
    </div>
  );
}
