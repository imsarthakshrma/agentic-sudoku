'use client';

import { useEffect, useCallback } from 'react';
import { useSudoku } from '@/hooks/useSudoku';
import { useTheme } from '@/hooks/useTheme';
import { Board } from '@/components/sudoku/Board';
import { Controls } from '@/components/sudoku/Controls';
import { NumberPad } from '@/components/sudoku/NumberPad';
import { Timer } from '@/components/sudoku/Timer';

export default function Home() {
  const {
    board,
    selectedCell,
    setSelectedCell,
    difficulty,
    isNotesMode,
    setIsNotesMode,
    elapsedTime,
    isComplete,
    newGame,
    setCellValue,
    undo,
    redo,
    clearCell,
    getHint,
    canUndo,
    canRedo,
    getConflicts,
  } = useSudoku();

  const { theme, toggleTheme } = useTheme();

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCell) return;

      // Number input
      if (e.key >= '1' && e.key <= '9') {
        e.preventDefault();
        setCellValue(selectedCell.row, selectedCell.col, parseInt(e.key));
      }

      // Clear cell
      if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
        e.preventDefault();
        setCellValue(selectedCell.row, selectedCell.col, null);
      }

      // Arrow navigation
      if (e.key.startsWith('Arrow')) {
        e.preventDefault();
        let newRow = selectedCell.row;
        let newCol = selectedCell.col;

        if (e.key === 'ArrowUp') newRow = Math.max(0, newRow - 1);
        if (e.key === 'ArrowDown') newRow = Math.min(8, newRow + 1);
        if (e.key === 'ArrowLeft') newCol = Math.max(0, newCol - 1);
        if (e.key === 'ArrowRight') newCol = Math.min(8, newCol + 1);

        setSelectedCell({ row: newRow, col: newCol });
      }

      // Undo/Redo
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z') {
          e.preventDefault();
          undo();
        }
        if (e.key === 'y') {
          e.preventDefault();
          redo();
        }
      }

      // Toggle notes mode
      if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        setIsNotesMode(!isNotesMode);
      }

      // Hint
      if (e.key === 'h' || e.key === 'H') {
        e.preventDefault();
        getHint();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCell, setSelectedCell, setCellValue, undo, redo, isNotesMode, setIsNotesMode, getHint]);

  const handleNumberClick = useCallback((num: number) => {
    if (selectedCell) {
      setCellValue(selectedCell.row, selectedCell.col, num);
    }
  }, [selectedCell, setCellValue]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-[500px] space-y-6">
        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Sudoku</h1>
          <p className="text-sm text-[var(--foreground)] opacity-50">
            Clean. Minimal. No ads.
          </p>
        </div>

        {/* Timer */}
        <Timer 
          elapsedTime={elapsedTime} 
          difficulty={difficulty} 
          isComplete={isComplete}
        />

        {/* Game Board */}
        <Board
          board={board}
          selectedCell={selectedCell}
          onCellClick={(row, col) => setSelectedCell({ row, col })}
          getConflicts={getConflicts}
        />

        {/* Number Pad */}
        <NumberPad 
          onNumberClick={handleNumberClick}
          isNotesMode={isNotesMode}
        />

        {/* Controls */}
        <Controls
          onUndo={undo}
          onRedo={redo}
          onClear={clearCell}
          onHint={getHint}
          onNewGame={newGame}
          canUndo={canUndo}
          canRedo={canRedo}
          isNotesMode={isNotesMode}
          onToggleNotes={() => setIsNotesMode(!isNotesMode)}
          difficulty={difficulty}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* Footer */}
        <div className="text-center text-xs text-[var(--foreground)] opacity-30 pt-4">
          Use arrow keys to navigate • 1-9 to fill • N for notes • H for hint
        </div>
      </div>
    </div>
  );
}
