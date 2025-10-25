export type CellValue = number | null;
export type Board = CellValue[][];

export interface Cell {
    value: CellValue;
    isInitial: boolean;
    notes: Set<number>;
}

export type GameBoard = Cell[][];

export interface Position {
    row: number;
    col: number;
}

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export interface GameState {
    board: GameBoard;
    solution: Board;
    difficulty: Difficulty;
    startTime: number;
    elapsedTime: number;
    isComplete: boolean;
    isPaused: boolean;
}

export interface HistoryEntry {
    board: GameBoard;
    timestamp: number;
}