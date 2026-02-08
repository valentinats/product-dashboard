import { useState, useMemo, useCallback } from "react";
import { ProductsHeader } from "@/features/products/components/ProductsHeader";
import { ProductsTable } from "@/features/products/components/ProductsTable";
import { Pagination } from "@/features/products/components/Pagination";
import { ProgressBar } from "@/shared/components/ui/ProgressBar";
import { Toast } from "@/features/notifications/components/Toast";
import { useNotifications } from "@/features/notifications/context/NotificationContext";
import {
  useProducts,
  ITEMS_PER_PAGE,
} from "@/features/products/hooks/useProducts";
import type { Product } from "@/features/products/types/product";
import type {
  AddProductFormData,
  EditProductFormData,
} from "@/features/products/utils/productValidation";
import BtnIcon from "@/shared/components/ui/assets/addBtn.svg";
import RatingIcon from "@/shared/components/ui/assets/rating-sort.svg";
import PriceIcon from "@/shared/components/ui/assets/price-sort.svg";

export function ProductsPage() {
  const {
    products,
    total,
    isLoading,
    error,
    page,
    setPage,
    setSearch,
    sortBy,
    toggleSort,
  } = useProducts();

  const { addNotification } = useNotifications();
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [localProducts, setLocalProducts] = useState<Product[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const totalPages = useMemo(() => Math.ceil(total / ITEMS_PER_PAGE), [total]);

  const handleProductAdd = useCallback(
    (data: AddProductFormData) => {
      const newProduct: Product = {
        id: Date.now(),
        title: data.title,
        price: Number(data.price.replace(",", ".")),
        brand: data.brand,
        sku: data.sku,
        category: "uncategorized",
        description: "",
        discountPercentage: 0,
        rating: 0,
        stock: 0,
        tags: [],
        weight: 0,
        dimensions: { width: 0, height: 0, depth: 0 },
        warrantyInformation: "",
        shippingInformation: "",
        availabilityStatus: "In Stock",
        reviews: [],
        returnPolicy: "",
        minimumOrderQuantity: 1,
        meta: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          barcode: "",
          qrCode: "",
        },
        images: [],
        thumbnail: "",
      };

      setLocalProducts((prev) => [newProduct, ...prev]);
      setIsAddingProduct(false);
      addNotification("Товар успешно добавлен");
      setToastMessage("Товар успешно добавлен");
      setShowToast(true);
    },
    [addNotification],
  );

  const handleProductUpdate = useCallback(
    (id: number, data: EditProductFormData) => {
      const existingLocal = localProducts.find((p) => p.id === id);
      const existingApi = products.find((p) => p.id === id);
      const original = existingLocal || existingApi;

      if (original) {
        const updated: Product = {
          ...original,
          title: data.title,
          price: Number(data.price.replace(",", ".")),
          brand: data.brand,
          sku: data.sku,
        };
        setLocalProducts((prev) => [
          updated,
          ...prev.filter((p) => p.id !== id),
        ]);
      }
      addNotification("Товар успешно обновлен");
      setToastMessage("Товар успешно обновлен");
      setShowToast(true);
    },
    [localProducts, products, addNotification],
  );

  const allProducts = useMemo(() => {
    const localIds = new Set(localProducts.map((p) => p.id));
    const filteredApiProducts = products.filter((p) => !localIds.has(p.id));
    return [...localProducts, ...filteredApiProducts];
  }, [localProducts, products]);

  return (
    <div className="min-h-screen bg-gray-0">
      <ProductsHeader onSearch={setSearch} />
      <ProgressBar isLoading={isLoading} />

      <main className="px-8 mb-5">
        <div className="bg-white rounded-[10px]">
          <div className="flex items-center justify-between px-[30px] pt-[30px] pb-10">
            <span className="text-xl font-bold text-gray-60">Все позиции</span>
            <div className="flex gap-2">
              <button
                onClick={() => toggleSort("rating")}
                className={`w-[42px] p-[10px] border rounded-md ${sortBy === "rating" ? "border-accent" : "border-gray-90"}`}
              >
                <img
                  src={RatingIcon}
                  alt="rating sort icon"
                  className="w-full"
                />
              </button>
              <button
                onClick={() => toggleSort("price")}
                className={`w-[42px] p-[10px] border rounded-md ${sortBy === "price" ? "border-accent" : "border-gray-90"}`}
              >
                <img src={PriceIcon} alt="price sort icon" className="w-full" />
              </button>
              <button
                onClick={() => setIsAddingProduct(true)}
                className="h-[42px] flex flex-row gap-4 items-center px-5 py-[10px] bg-accent text-white rounded-md text-sm font-semibold"
              >
                <img src={BtnIcon} alt="button icon" />
                Добавить
              </button>
            </div>
          </div>

          {error && <div className="p-4 text-red-600 text-center">{error}</div>}

          {!error && (
            <ProductsTable
              products={allProducts}
              isAddingProduct={isAddingProduct}
              onProductAdd={handleProductAdd}
              onCancelAdd={() => setIsAddingProduct(false)}
              onProductUpdate={handleProductUpdate}
            />
          )}

          {!error && total > 0 && (
            <div className="px-[30px]">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                totalItems={total}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={setPage}
              />
            </div>
          )}
        </div>
      </main>

      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
