import { Checkbox } from "@/shared/components/ui/Checkbox";
import type { ColumnWidths } from "../hooks/useColumnResize";

interface ResizableTableHeaderProps {
  columnWidths: ColumnWidths;
  onResizeStart: (column: keyof ColumnWidths, clientX: number) => void;
  isAllSelected: boolean;
  onToggleSelectAll: () => void;
}

export function ResizableTableHeader({
  columnWidths,
  onResizeStart,
  isAllSelected,
  onToggleSelectAll,
}: ResizableTableHeaderProps) {
  const handleMouseDown = (
    column: keyof ColumnWidths,
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    e.preventDefault();
    onResizeStart(column, e.clientX);
  };

  const resizeHandleClassName =
    "absolute right-0 top-0 bottom-0 w-1 cursor-col-resize bg-transparent hover:bg-accent transition-colors";

  return (
    <thead>
      <tr className="border-b border-gray-20">
        <th
          className="text-left py-6 px-4 font-bold text-gray-100 text-base relative"
          style={{ width: columnWidths.title }}
        >
          <div className="flex items-center gap-5">
            <Checkbox
              className="w-[22px] h-[22px] rounded-[4px] border-[1px] border-gray-100"
              checked={isAllSelected}
              onChange={onToggleSelectAll}
            />
            <span>Наименование</span>
          </div>
          <div
            className={resizeHandleClassName}
            onMouseDown={(e) => handleMouseDown("title", e)}
          />
        </th>
        <th
          className="py-6 px-4 font-bold text-gray-100 text-base relative"
          style={{ width: columnWidths.brand }}
        >
          Вендор
          <div
            className={resizeHandleClassName}
            onMouseDown={(e) => handleMouseDown("brand", e)}
          />
        </th>
        <th
          className="py-6 px-4 font-bold text-gray-100 text-base relative"
          style={{ width: columnWidths.sku }}
        >
          Артикул
          <div
            className={resizeHandleClassName}
            onMouseDown={(e) => handleMouseDown("sku", e)}
          />
        </th>
        <th
          className="py-6 px-4 font-bold text-gray-100 text-base relative"
          style={{ width: columnWidths.rating }}
        >
          Оценка
          <div
            className={resizeHandleClassName}
            onMouseDown={(e) => handleMouseDown("rating", e)}
          />
        </th>
        <th
          className="py-6 px-4 font-bold text-gray-100 text-base relative"
          style={{ width: columnWidths.price }}
        >
          Цена, ₽
          <div
            className={resizeHandleClassName}
            onMouseDown={(e) => handleMouseDown("price", e)}
          />
        </th>
        <th
          className="py-6 px-4 font-bold text-gray-100 text-base relative"
          style={{ width: columnWidths.stock }}
        >
          Количество
          <div
            className={resizeHandleClassName}
            onMouseDown={(e) => handleMouseDown("stock", e)}
          />
        </th>
        <th
          className="py-6 px-4 font-bold text-gray-100 text-base"
          style={{ width: columnWidths.actions }}
        ></th>
      </tr>
    </thead>
  );
}
