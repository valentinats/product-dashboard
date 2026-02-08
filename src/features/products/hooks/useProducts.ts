import { useState, useEffect, useCallback } from "react";
import {
  fetchProducts,
  type SortField,
  type SortOrder,
} from "../api/productsApi";
import type { Product } from "../types/product";
import { useDebounce } from "@/shared/hooks/useDebounce";

interface UseProductsResult {
  products: Product[];
  total: number;
  isLoading: boolean;
  error: string | null;
  page: number;
  setPage: (page: number) => void;
  search: string;
  setSearch: (search: string) => void;
  sortBy: SortField;
  sortOrder: SortOrder;
  toggleSort: (field: SortField) => void;
}

const ITEMS_PER_PAGE = 20;

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortField>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const debouncedSearch = useDebounce(search, 300);

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const skip = (page - 1) * ITEMS_PER_PAGE;
      const data = await fetchProducts(
        skip,
        ITEMS_PER_PAGE,
        debouncedSearch,
        sortBy,
        sortOrder,
      );
      setProducts(data.products);
      setTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка загрузки");
    } finally {
      setIsLoading(false);
    }
  }, [page, debouncedSearch, sortBy, sortOrder]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleSetSearch = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const toggleSort = useCallback(
    (field: SortField) => {
      if (sortBy === field) {
        setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
      } else {
        setSortBy(field);
        setSortOrder("desc");
      }
      setPage(1);
    },
    [sortBy],
  );

  return {
    products,
    total,
    isLoading,
    error,
    page,
    setPage,
    search,
    setSearch: handleSetSearch,
    sortBy,
    sortOrder,
    toggleSort,
  };
}

export { ITEMS_PER_PAGE };
