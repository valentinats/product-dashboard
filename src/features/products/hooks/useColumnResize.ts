import { useState, useCallback, useEffect } from "react";

export interface ColumnWidths {
  title: number;
  brand: number;
  sku: number;
  rating: number;
  price: number;
  stock: number;
  actions: number;
}

interface ResizeState {
  column: keyof ColumnWidths | null;
  startX: number;
  startWidth: number;
}

const MIN_COLUMN_WIDTH = 80;

export function useColumnResize(
  initialWidths: ColumnWidths,
  onWidthsChange?: (widths: ColumnWidths) => void,
) {
  const [columnWidths, setColumnWidths] = useState<ColumnWidths>(initialWidths);
  const [resizeState, setResizeState] = useState<ResizeState>({
    column: null,
    startX: 0,
    startWidth: 0,
  });

  const startResize = useCallback(
    (column: keyof ColumnWidths, clientX: number) => {
      setResizeState({
        column,
        startX: clientX,
        startWidth: columnWidths[column],
      });
    },
    [columnWidths],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!resizeState.column) return;

      const delta = e.clientX - resizeState.startX;
      const newWidth = Math.max(
        MIN_COLUMN_WIDTH,
        resizeState.startWidth + delta,
      );

      setColumnWidths((prev) => {
        const updated = { ...prev, [resizeState.column!]: newWidth };
        return updated;
      });
    },
    [resizeState],
  );

  const handleMouseUp = useCallback(() => {
    if (resizeState.column) {
      onWidthsChange?.(columnWidths);
    }
    setResizeState({ column: null, startX: 0, startWidth: 0 });
  }, [resizeState.column, columnWidths, onWidthsChange]);

  useEffect(() => {
    if (resizeState.column) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };
    }
  }, [resizeState.column, handleMouseMove, handleMouseUp]);

  return {
    columnWidths,
    isResizing: resizeState.column !== null,
    startResize,
    setColumnWidths,
  };
}
