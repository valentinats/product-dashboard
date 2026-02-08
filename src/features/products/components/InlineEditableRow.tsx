import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Product } from "../types/product";
import {
  addProductSchema,
  type EditProductFormData,
} from "../utils/productValidation";
import { StockIndicator } from "./StockIndicator";
import { formatPrice } from "../utils/formatPrice";
import { Checkbox } from "@/shared/components/ui/Checkbox";
import { RowActionDropdown } from "./RowActionDropdown";
import PlusIcon from "@/shared/components/ui/assets/plus-icon.svg";
import MoreIcon from "@/shared/components/ui/assets/more-icon.svg";

export interface ColumnWidths {
  title: number;
  brand: number;
  sku: number;
  rating: number;
  price: number;
  stock: number;
  actions: number;
}

interface InlineEditableRowProps {
  product: Product;
  isEditing: boolean;
  isSelected: boolean;
  onSelect: () => void;
  onSave: (data: EditProductFormData) => void;
  onCancel: () => void;
  onEditRequest: () => void;
  isMenuOpen: boolean;
  onMenuToggle: () => void;
  onMenuClose: () => void;
  columnWidths?: ColumnWidths;
}

export function InlineEditableRow({
  product,
  isEditing,
  isSelected,
  onSelect,
  onSave,
  onCancel,
  onEditRequest,
  isMenuOpen,
  onMenuToggle,
  onMenuClose,
  columnWidths,
}: InlineEditableRowProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProductFormData>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      title: product.title,
      price: String(product.price).replace(".", ","),
      brand: product.brand || "",
      sku: product.sku,
    },
  });

  const inputClassName =
    "w-full px-2 py-1 border border-gray-30 rounded focus:outline-none focus:border-accent text-sm text-black text-center";
  const errorClassName = "text-red-500 text-xs mt-1 text-center";

  if (isEditing) {
    return (
      <tr className="border-b border-gray-20 bg-blue-50">
        <td
          className="pl-4 py-3"
          style={columnWidths ? { width: columnWidths.title } : undefined}
        >
          <div className="flex items-center gap-4">
            <Checkbox
              className="w-[22px] h-[22px] rounded-[4px] border-[1px] border-gray-100"
              checked={isSelected}
              onChange={onSelect}
            />
            {product.thumbnail ? (
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-gray-20 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-gray-40"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
            <div className="flex-1">
              <input
                {...register("title")}
                placeholder="Наименование товара"
                className={inputClassName}
              />
              {errors.title && (
                <p className={errorClassName}>{errors.title.message}</p>
              )}
            </div>
          </div>
        </td>
        <td
          className="px-4 py-3"
          style={columnWidths ? { width: columnWidths.brand } : undefined}
        >
          <input
            {...register("brand")}
            placeholder="Вендор"
            className={`${inputClassName} text-center`}
          />
          {errors.brand && (
            <p className={`${errorClassName} text-center`}>
              {errors.brand.message}
            </p>
          )}
        </td>
        <td
          className="px-4 py-3"
          style={columnWidths ? { width: columnWidths.sku } : undefined}
        >
          <input
            {...register("sku")}
            placeholder="Артикул"
            className={`${inputClassName} text-center`}
          />
          {errors.sku && (
            <p className={`${errorClassName} text-center`}>
              {errors.sku.message}
            </p>
          )}
        </td>
        <td
          className="px-4 py-3 text-center text-gray-40"
          style={columnWidths ? { width: columnWidths.rating } : undefined}
        >
          <span
            className={`${product.rating < 3 ? "text-red-500" : "text-gray-60"}`}
          >
            {product.rating.toFixed(1)}
          </span>
          <span>/5</span>
        </td>
        <td
          className="px-4 py-3"
          style={columnWidths ? { width: columnWidths.price } : undefined}
        >
          <input
            {...register("price")}
            placeholder="0,00"
            className={`${inputClassName} text-center font-robotoMono`}
          />
          {errors.price && (
            <p className={`${errorClassName} text-center`}>
              {errors.price.message}
            </p>
          )}
        </td>
        <td
          className="px-4 py-3"
          style={columnWidths ? { width: columnWidths.stock } : undefined}
        >
          <StockIndicator stock={product.stock} />
        </td>
        <td
          className="py-3 pr-4"
          style={columnWidths ? { width: columnWidths.actions } : undefined}
        >
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={handleSubmit(onSave)}
              className="h-8 px-4 bg-green-500 text-white rounded-md"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="h-8 px-4 bg-gray-20 text-gray-60 rounded-md"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-b border-gray-20 text-gray-60 text-base text-center relative group cursor-pointer">
      <td
        className="pl-4 py-3"
        style={columnWidths ? { width: columnWidths.title } : undefined}
      >
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-g-dark-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="flex items-center gap-4">
          <Checkbox
            className="w-[22px] h-[22px] rounded-[4px] border-[1px] border-gray-100"
            checked={isSelected}
            onChange={onSelect}
          />
          {product.thumbnail && (
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-12 h-12 rounded-lg object-cover"
            />
          )}
          <div className="text-left">
            <p className="font-bold">{product.title}</p>
            <p className="text-gray-40 text-sm capitalize">
              {product.category}
            </p>
          </div>
        </div>
      </td>
      <td
        className="font-openSans font-bold"
        style={columnWidths ? { width: columnWidths.brand } : undefined}
      >
        {product.brand || "—"}
      </td>
      <td
        className="font-openSans"
        style={columnWidths ? { width: columnWidths.sku } : undefined}
      >
        {product.sku}
      </td>
      <td
        className="font-openSans"
        style={columnWidths ? { width: columnWidths.rating } : undefined}
      >
        <span
          className={`${product.rating < 3 ? "text-red-500" : "text-gray-60"}`}
        >
          {product.rating.toFixed(1)}
        </span>
        <span>/5</span>
      </td>
      <td
        className="leading-[110%] font-robotoMono"
        style={columnWidths ? { width: columnWidths.price } : undefined}
      >
        {formatPrice(product.price)}
      </td>
      <td style={columnWidths ? { width: columnWidths.stock } : undefined}>
        <StockIndicator stock={product.stock} />
      </td>
      <td
        className="relative"
        style={columnWidths ? { width: columnWidths.actions } : undefined}
      >
        <button className="h-7 px-4 mr-8 bg-accent rounded-3xl">
          <img src={PlusIcon} alt="add item icon" />
        </button>
        <button className="h-8" onClick={onMenuToggle}>
          <img src={MoreIcon} alt="menu icon" />
        </button>
        <RowActionDropdown
          isOpen={isMenuOpen}
          onClose={onMenuClose}
          onEdit={onEditRequest}
        />
      </td>
    </tr>
  );
}
