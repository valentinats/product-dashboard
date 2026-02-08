import type { ProductsResponse } from "../types/product";

const BASE_URL = "https://dummyjson.com";

export type SortField = "rating" | "price" | null;
export type SortOrder = "asc" | "desc";

export async function fetchProducts(
  skip: number = 0,
  limit: number = 20,
  search: string = "",
  sortBy: SortField = null,
  order: SortOrder = "desc",
): Promise<ProductsResponse> {
  const params = new URLSearchParams();
  params.set("skip", String(skip));
  params.set("limit", String(limit));

  if (sortBy) {
    params.set("sortBy", sortBy);
    params.set("order", order);
  }

  const baseEndpoint = search
    ? `${BASE_URL}/products/search?q=${encodeURIComponent(search)}&`
    : `${BASE_URL}/products?`;

  const url = baseEndpoint + params.toString();

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Ошибка при загрузке товаров");
  }

  return response.json();
}
