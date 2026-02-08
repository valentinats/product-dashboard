import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addProductSchema,
  type AddProductFormData,
} from "../utils/productValidation";

interface EditableProductRowProps {
  onSave: (data: AddProductFormData) => void;
  onCancel: () => void;
}

export function EditableProductRow({
  onSave,
  onCancel,
}: EditableProductRowProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddProductFormData>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      title: "",
      price: "",
      brand: "",
      sku: "",
    },
  });

  const inputClassName =
    "w-full px-2 py-1 border border-gray-30 rounded focus:outline-none focus:border-accent text-sm text-black text-center";
  const errorClassName = "text-red-500 text-xs mt-1 text-center";

  return (
    <tr className="border-b border-gray-20 bg-gray-5">
      <td className="pl-4 py-3">
        <div className="flex items-center gap-4">
          <div className="w-[22px]" />
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
      <td className="px-4 py-3">
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
      <td className="px-4 py-3">
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
      <td className="px-4 py-3 text-center text-gray-40">—</td>
      <td className="px-4 py-3">
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
      <td className="px-4 py-3 text-center text-gray-40">—</td>
      <td className="py-3 pr-4">
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
