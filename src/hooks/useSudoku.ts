'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { GameBoard, Difficulty, Position, Cell, HistoryEntry, Board } from '@/lib/sudoku/types';
import { generateSudoku } from '@/lib/sudoku/generator';
import { isValidPlacement, isBoardComplete, getConflicts } from '@/lib/sudoku/validator';

export function useSudoku() {
  const [board, setBoard] = useState<GameBoard>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<Position | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [isNotesMode, setIsNotesMode] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const createEmptyBoard = useCallback((): GameBoard => {
    return Array(9).fill(null).map(() =>
      Array(9).fill(null).map(() => ({
        value: null,
        isInitial: false,
        notes: new Set<number>(),
      }))
    );
  }, []);

  const cloneBoard = useCallback((board: GameBoard): GameBoard => {
    return board.map(row =>
      row.map(cell => ({
        value: cell.value,
        isInitial: cell.isInitial,
        notes: new Set(cell.notes),
      }))
    );
  }, []);

  const initializeBoard = useCallback((puzzle: Board, sol: number[][]) => {
    const newBoard: GameBoard = createEmptyBoard();
    
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (puzzle[row][col] !== null) {
          newBoard[row][col] = {
            value: puzzle[row][col],
            isInitial: true,
            notes: new Set(),
          };
        }
      }
    }
    
    setBoard(newBoard);
    setSolution(sol);
    setHistory([{ board: JSON.parse(JSON.stringify(newBoard)), timestamp: Date.now() }]);
    setHistoryIndex(0);
    setIsComplete(false);
  }, [createEmptyBoard]);

  const newGame = useCallback((diff: Difficulty) => {
    setDifficulty(diff);
    const { puzzle, solution } = generateSudoku(diff);
    initializeBoard(puzzle, solution);
    setStartTime(Date.now());
    setElapsedTime(0);
    setIsPaused(false);
    setSelectedCell(null);
  }, [initializeBoard]);

  const setCellValue = useCallback((row: number, col: number, value: number | null) => {
    if (board[row][col].isInitial) return;

    const newBoard = cloneBoard(board);
    
    if (isNotesMode && value !== null) {
      if (newBoard[row][col].notes.has(value)) {
        newBoard[row][col].notes.delete(value);
      } else {
        newBoard[row][col].notes.add(value);
      }
    } else {
      newBoard[row][col].value = value;
      newBoard[row][col].notes.clear();
    }

    setBoard(newBoard);
    
    // Add to history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ board: JSON.parse(JSON.stringify(newBoard)), timestamp: Date.now() });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);

    // Check if complete
    if (isBoardComplete(newBoard)) {
      setIsComplete(true);
      setIsPaused(true);
    }
  }, [board, isNotesMode, history, historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setBoard(JSON.parse(JSON.stringify(history[historyIndex - 1].board)));
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setBoard(JSON.parse(JSON.stringify(history[historyIndex + 1].board)));
    }
  }, [history, historyIndex]);

  const clearCell = useCallback(() => {
    if (selectedCell) {
      setCellValue(selectedCell.row, selectedCell.col, null);
    }
  }, [selectedCell, setCellValue]);

  const getHint = useCallback(() => {
    if (!selectedCell || isComplete) return;
    
    const { row, col } = selectedCell;
    if (board[row][col].isInitial) return;
    
    setCellValue(row, col, solution[row][col]);
  }, [selectedCell, board, solution, setCellValue, isComplete]);

  const togglePause = useCallback(() => {
    setIsPaused(!isPaused);
  }, [isPaused]);

  // Timer effect
  useEffect(() => {
    if (!isPaused && !isComplete && board.length > 0) {
      timerRef.current = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPaused, isComplete, startTime, board]);

  // Initialize game on mount
  useEffect(() => {
    newGame('medium');
  }, []);

  return {
    board,
    selectedCell,
    setSelectedCell,
    difficulty,
    isNotesMode,
    setIsNotesMode,
    elapsedTime,
    isPaused,
    isComplete,
    newGame,
    setCellValue,
    undo,
    redo,
    clearCell,
    getHint,
    togglePause,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
    getConflicts: (row: number, col: number) => getConflicts(board, row, col),
    isValidPlacement: (row: number, col: number, value: number) => 
      isValidPlacement(board, row, col, value),
  };
}