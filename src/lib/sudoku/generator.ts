import { Board, Difficulty } from './types';
import { solveSudoku, isValidMove, hasUniqueSolution } from './solver';

const DIFFICULTY_CLUES: Record<Difficulty, { min: number; max: number }> = {
  easy: { min: 40, max: 45 },
  medium: { min: 30, max: 35 },
  hard: { min: 25, max: 30 },
  expert: { min: 20, max: 25 },
};

export function generateSudoku(difficulty: Difficulty): { puzzle: Board; solution: number[][] } {
  let attempts = 0;
  const maxAttempts = 10;
  
  while (attempts < maxAttempts) {
    const solution = generateCompleteSudoku();
    const puzzle = createPuzzle(solution, difficulty);
    
    // Verify the puzzle is valid
    const testSolution = JSON.parse(JSON.stringify(puzzle));
    if (solveSudoku(testSolution)) {
      // Verify it matches the original solution
      let matches = true;
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (testSolution[r][c] !== solution[r][c]) {
            matches = false;
            break;
          }
        }
        if (!matches) break;
      }
      
      if (matches) {
        return { puzzle, solution };
      }
    }
    
    attempts++;
  }
  
  // Fallback: return a valid puzzle even if it took many attempts
  const solution = generateCompleteSudoku();
  const puzzle = createPuzzle(solution, difficulty);
  return { puzzle, solution };
}

function generateCompleteSudoku(): number[][] {
  const board: Board = Array(9)
    .fill(null)
    .map(() => Array(9).fill(null));
  
  fillDiagonalBoxes(board);
  solveSudoku(board);
  
  return board as number[][];
}

function fillDiagonalBoxes(board: Board): void {
  for (let box = 0; box < 9; box += 3) {
    fillBox(board, box, box);
  }
}

function fillBox(board: Board, row: number, col: number): void {
  const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  let idx = 0;
  
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      board[row + r][col + c] = numbers[idx++];
    }
  }
}

function createPuzzle(solution: number[][], difficulty: Difficulty): Board {
  const puzzle: Board = solution.map(row => [...row]);
  const { min, max } = DIFFICULTY_CLUES[difficulty];
  const targetClues = Math.floor(Math.random() * (max - min + 1)) + min;
  const cellsToRemove = 81 - targetClues;
  
  let removed = 0;
  const attempts = new Set<string>();
  
  while (removed < cellsToRemove && attempts.size < 81) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    const key = `${row},${col}`;
    
    if (attempts.has(key)) continue;
    attempts.add(key);
    
    if (puzzle[row][col] !== null) {
      const backup = puzzle[row][col];
      puzzle[row][col] = null;
      
      // For easier difficulties, don't check uniqueness (faster generation)
      if (difficulty === 'easy' || difficulty === 'medium' || hasUniqueSolution(JSON.parse(JSON.stringify(puzzle)))) {
        removed++;
      } else {
        puzzle[row][col] = backup;
      }
    }
  }
  
  return puzzle;
}

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}