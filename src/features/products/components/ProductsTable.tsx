import type { Product } from "../types/product";
import { useState } from "react";
import { EditableProductRow } from "./EditableProductRow";
import { InlineEditableRow, type ColumnWidths } from "./InlineEditableRow";
import { ResizableTableHeader } from "./ResizableTableHeader";
import { useColumnResize } from "../hooks/useColumnResize";
import type {
  AddProductFormData,
  EditProductFormData,
} from "../utils/productValidation";

const DEFAULT_COLUMN_WIDTHS: ColumnWidths = {
  title: 300,
  brand: 120,
  sku: 120,
  rating: 100,
  price: 120,
  stock: 120,
  actions: 150,
};

interface ProductsTableProps {
  products: Product[];
  isAddingProduct?: boolean;
  onProductAdd?: (data: AddProductFormData) => void;
  onCancelAdd?: () => void;
  onProductUpdate?: (id: number, data: EditProductFormData) => void;
}

export function ProductsTable({
  products,
  isAddingProduct,
  onProductAdd,
  onCancelAdd,
  onProductUpdate,
}: ProductsTableProps) {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const { columnWidths, startResize } = useColumnResize(DEFAULT_COLUMN_WIDTHS);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === products.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(products.map((p) => p.id)));
    }
  };

  const isAllSelected =
    products.length > 0 && selectedIds.size === products.length;

  const handleEditRequest = (productId: number) => {
    setEditingProductId(productId);
    setOpenMenuId(null);
  };

  const handleEditSave = (productId: number, data: EditProductFormData) => {
    onProductUpdate?.(productId, data);
    setEditingProductId(null);
  };

  const handleEditCancel = () => {
    setEditingProductId(null);
  };

  const handleMenuToggle = (productId: number) => {
    setOpenMenuId((prev) => (prev === productId ? null : productId));
  };

  const handleMenuClose = () => {
    setOpenMenuId(null);
  };

  return (
    <div className="px-[30px]">
      <table className="w-full" style={{ tableLayout: "fixed" }}>
        <ResizableTableHeader
          columnWidths={columnWidths}
          onResizeStart={startResize}
          isAllSelected={isAllSelected}
          onToggleSelectAll={toggleSelectAll}
        />
        <tbody>
          {isAddingProduct && onProductAdd && onCancelAdd && (
            <EditableProductRow onSave={onProductAdd} onCancel={onCancelAdd} />
          )}
          {products.map((product) => (
            <InlineEditableRow
              key={product.id}
              product={product}
              isEditing={editingProductId === product.id}
              isSelected={selectedIds.has(product.id)}
              onSelect={() => toggleSelect(product.id)}
              onSave={(data) => handleEditSave(product.id, data)}
              onCancel={handleEditCancel}
              onEditRequest={() => handleEditRequest(product.id)}
              isMenuOpen={openMenuId === product.id}
              onMenuToggle={() => handleMenuToggle(product.id)}
              onMenuClose={handleMenuClose}
              columnWidths={columnWidths}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
