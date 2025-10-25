'use client';

import { memo } from 'react';

interface CellProps {
  value: number | null;
  isInitial: boolean;
  isSelected: boolean;
  isHighlighted: boolean;
  isConflict: boolean;
  isSameNumber: boolean;
  notes: Set<number>;
  onClick: () => void;
}

export const Cell = memo(function Cell({
  value,
  isInitial,
  isSelected,
  isHighlighted,
  isConflict,
  isSameNumber,
  notes,
  onClick,
}: CellProps) {
  const getCellClasses = () => {
    const classes = [
      'relative w-full h-full flex items-center justify-center',
      'border-[0.5px] transition-all duration-150 cursor-pointer',
      'select-none box-border',
    ];

    // Background colors
    if (isConflict) {
      classes.push('bg-red-50 dark:bg-red-950/20');
    } else if (isSelected) {
      classes.push('bg-[var(--cell-selected)]');
    } else if (isSameNumber && value !== null) {
      classes.push('bg-[var(--cell-same)]');
    } else if (isHighlighted) {
      classes.push('bg-[var(--cell-highlight)]');
    } else if (isInitial) {
      classes.push('bg-[var(--cell-initial)]');
    } else {
      classes.push('bg-[var(--cell-bg)]');
    }

    // Border color
    classes.push('border-[var(--border)]');

    return classes.join(' ');
  };

  const getValueClasses = () => {
    const classes = ['text-2xl font-medium'];
    
    if (isInitial) {
      classes.push('font-semibold text-[var(--foreground)]');
    } else if (isConflict) {
      classes.push('text-[var(--cell-conflict)]');
    } else {
      classes.push('text-[var(--foreground)] opacity-80');
    }

    return classes.join(' ');
  };

  return (
    <div className={getCellClasses()} onClick={onClick}>
      {value !== null ? (
        <span className={getValueClasses()}>{value}</span>
      ) : notes.size > 0 ? (
        <div className="grid grid-cols-3 gap-0 w-full h-full p-0.5 text-[9px] text-[var(--foreground)] opacity-40">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <div key={num} className="flex items-center justify-center">
              {notes.has(num) ? num : ''}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
});
