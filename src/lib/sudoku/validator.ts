import { Board, GameBoard, Position } from './types';

export function validateBoard(board: GameBoard): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const value = board[row][col].value;
      if (value !== null && !isValidPlacement(board, row, col, value)) {
        return false;
      }
    }
  }
  return true;
}

export function isValidPlacement(
  board: GameBoard,
  row: number,
  col: number,
  num: number
): boolean {
  // Check row
  for (let c = 0; c < 9; c++) {
    if (c !== col && board[row][c].value === num) {
      return false;
    }
  }
  
  // Check column
  for (let r = 0; r < 9; r++) {
    if (r !== row && board[r][col].value === num) {
      return false;
    }
  }
  
  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if ((r !== row || c !== col) && board[r][c].value === num) {
        return false;
      }
    }
  }
  
  return true;
}

export function getConflicts(board: GameBoard, row: number, col: number): Position[] {
  const conflicts: Position[] = [];
  const value = board[row][col].value;
  
  if (value === null) return conflicts;
  
  // Check row
  for (let c = 0; c < 9; c++) {
    if (c !== col && board[row][c].value === value) {
      conflicts.push({ row, col: c });
    }
  }
  
  // Check column
  for (let r = 0; r < 9; r++) {
    if (r !== row && board[r][col].value === value) {
      conflicts.push({ row: r, col });
    }
  }
  
  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if ((r !== row || c !== col) && board[r][c].value === value) {
        conflicts.push({ row: r, col: c });
      }
    }
  }
  
  return conflicts;
}

export function isBoardComplete(board: GameBoard): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col].value === null) {
        return false;
      }
    }
  }
  return validateBoard(board);
}

export function getPossibleValues(board: GameBoard, row: number, col: number): number[] {
  if (board[row][col].value !== null) return [];
  
  const possible: number[] = [];
  
  for (let num = 1; num <= 9; num++) {
    if (isValidPlacement(board, row, col, num)) {
      possible.push(num);
    }
  }
  
  return possible;
}