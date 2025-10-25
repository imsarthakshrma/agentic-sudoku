'use client';

import { Undo2, Redo2, Trash2, Lightbulb, RotateCcw, Pencil, Moon, Sun } from 'lucide-react';
import { Difficulty } from '@/lib/sudoku/types';
import { Theme } from '@/hooks/useTheme';

interface ControlsProps {
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  onHint: () => void;
  onNewGame: (difficulty: Difficulty) => void;
  canUndo: boolean;
  canRedo: boolean;
  isNotesMode: boolean;
  onToggleNotes: () => void;
  difficulty: Difficulty;
  theme: Theme;
  onToggleTheme: () => void;
}

export function Controls({
  onUndo,
  onRedo,
  onClear,
  onHint,
  onNewGame,
  canUndo,
  canRedo,
  isNotesMode,
  onToggleNotes,
  difficulty,
  theme,
  onToggleTheme,
}: ControlsProps) {
  const buttonClass = (active?: boolean, disabled?: boolean) => {
    const classes = [
      'p-3 border border-[var(--border)] rounded-md transition-all duration-150',
      'hover:bg-[var(--cell-highlight)] active:scale-95',
      'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent',
      'flex items-center justify-center',
    ];
    
    if (active) {
      classes.push('bg-[var(--foreground)] text-[var(--background)]');
    }
    
    return classes.join(' ');
  };

  const difficultyButtonClass = (diff: Difficulty) => {
    const isActive = difficulty === diff;
    return [
      'px-4 py-2 text-sm border border-[var(--border)] rounded-md transition-all duration-150',
      'hover:bg-[var(--cell-highlight)] active:scale-95',
      isActive ? 'bg-[var(--foreground)] text-[var(--background)] font-medium' : '',
    ].join(' ');
  };

  return (
    <div className="w-full max-w-[500px] mx-auto space-y-4">
      {/* Action Buttons */}
      <div className="grid grid-cols-6 gap-2">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className={buttonClass(false, !canUndo)}
          title="Undo (Ctrl+Z)"
        >
          <Undo2 size={20} />
        </button>
        
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className={buttonClass(false, !canRedo)}
          title="Redo (Ctrl+Y)"
        >
          <Redo2 size={20} />
        </button>
        
        <button
          onClick={onClear}
          className={buttonClass()}
          title="Clear cell (Delete)"
        >
          <Trash2 size={20} />
        </button>
        
        <button
          onClick={onToggleNotes}
          className={buttonClass(isNotesMode)}
          title="Toggle notes mode (N)"
        >
          <Pencil size={20} />
        </button>
        
        <button
          onClick={onHint}
          className={buttonClass()}
          title="Get hint (H)"
        >
          <Lightbulb size={20} />
        </button>
        
        <button
          onClick={onToggleTheme}
          className={buttonClass()}
          title="Toggle theme"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>

      {/* New Game Section */}
      <div className="space-y-2">
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => onNewGame('easy')}
            className={difficultyButtonClass('easy')}
          >
            Easy
          </button>
          <button
            onClick={() => onNewGame('medium')}
            className={difficultyButtonClass('medium')}
          >
            Medium
          </button>
          <button
            onClick={() => onNewGame('hard')}
            className={difficultyButtonClass('hard')}
          >
            Hard
          </button>
          <button
            onClick={() => onNewGame('expert')}
            className={difficultyButtonClass('expert')}
          >
            Expert
          </button>
        </div>
        
        <button
          onClick={() => onNewGame(difficulty)}
          className="w-full py-3 border border-[var(--border)] rounded-md hover:bg-[var(--cell-highlight)] active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2"
        >
          <RotateCcw size={18} />
          <span>New Game</span>
        </button>
      </div>
    </div>
  );
}
