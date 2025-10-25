import { Board, CellValue } from './types';

export function solveSudoku(board: Board): boolean {
  const emptyCell = findEmptyCell(board);
  
  if (!emptyCell) {
    return true; // Puzzle solved
  }
  
  const [row, col] = emptyCell;
  
  for (let num = 1; num <= 9; num++) {
    if (isValidMove(board, row, col, num)) {
      board[row][col] = num;
      
      if (solveSudoku(board)) {
        return true;
      }
      
      board[row][col] = null; // Backtrack
    }
  }
  
  return false;
}

export function findEmptyCell(board: Board): [number, number] | null {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === null) {
        return [row, col];
      }
    }
  }
  return null;
}

export function isValidMove(
  board: Board,
  row: number,
  col: number,
  num: number
): boolean {
  // Check row
  for (let c = 0; c < 9; c++) {
    if (board[row][c] === num) {
      return false;
    }
  }
  
  // Check column
  for (let r = 0; r < 9; r++) {
    if (board[r][col] === num) {
      return false;
    }
  }
  
  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if (board[r][c] === num) {
        return false;
      }
    }
  }
  
  return true;
}

export function hasUniqueSolution(board: Board): boolean {
  const solutions: number[] = [];
  countSolutions(JSON.parse(JSON.stringify(board)), solutions);
  return solutions.length === 1;
}

function countSolutions(board: Board, solutions: number[], max: number = 2): void {
  if (solutions.length >= max) return;
  
  const emptyCell = findEmptyCell(board);
  
  if (!emptyCell) {
    solutions.push(1);
    return;
  }
  
  const [row, col] = emptyCell;
  
  for (let num = 1; num <= 9; num++) {
    if (isValidMove(board, row, col, num)) {
      board[row][col] = num;
      countSolutions(board, solutions, max);
      board[row][col] = null;
    }
  }
}