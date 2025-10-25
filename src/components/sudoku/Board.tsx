'use client';

import { GameBoard, Position } from '@/lib/sudoku/types';
import { Cell } from './Cell';

interface BoardProps {
  board: GameBoard;
  selectedCell: Position | null;
  onCellClick: (row: number, col: number) => void;
  getConflicts: (row: number, col: number) => Position[];
}

export function Board({ board, selectedCell, onCellClick, getConflicts }: BoardProps) {
  if (board.length === 0) {
    return (
      <div className="w-full max-w-[500px] aspect-square flex items-center justify-center">
        <div className="text-[var(--foreground)] opacity-50">Loading...</div>
      </div>
    );
  }

  const isHighlighted = (row: number, col: number): boolean => {
    if (!selectedCell) return false;
    return (
      selectedCell.row === row ||
      selectedCell.col === col ||
      (Math.floor(selectedCell.row / 3) === Math.floor(row / 3) &&
        Math.floor(selectedCell.col / 3) === Math.floor(col / 3))
    );
  };

  const isSameNumber = (row: number, col: number): boolean => {
    if (!selectedCell || board[row][col].value === null) return false;
    const selectedValue = board[selectedCell.row][selectedCell.col].value;
    return selectedValue !== null && board[row][col].value === selectedValue;
  };

  const isConflict = (row: number, col: number): boolean => {
    const conflicts = getConflicts(row, col);
    return conflicts.length > 0;
  };

  const getBorderClasses = (row: number, col: number): string => {
    const classes = [];
    
    // Thicker borders for 3x3 boxes - using border-box sizing
    if (row % 3 === 0 && row !== 0) classes.push('border-t-[3px]');
    if (col % 3 === 0 && col !== 0) classes.push('border-l-[3px]');
    
    classes.push('border-[var(--board-border)]');
    
    return classes.join(' ');
  };

  return (
    <div className="w-full max-w-[500px] mx-auto">
      <div 
        className="grid grid-cols-9 gap-0 border-2 border-[var(--board-border)] bg-[var(--cell-bg)]"
        style={{ aspectRatio: '1/1' }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`} className={`aspect-square ${getBorderClasses(rowIndex, colIndex)}`}>
              <Cell
                value={cell.value}
                isInitial={cell.isInitial}
                isSelected={
                  selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                }
                isHighlighted={isHighlighted(rowIndex, colIndex)}
                isConflict={isConflict(rowIndex, colIndex)}
                isSameNumber={isSameNumber(rowIndex, colIndex)}
                notes={cell.notes}
                onClick={() => onCellClick(rowIndex, colIndex)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
