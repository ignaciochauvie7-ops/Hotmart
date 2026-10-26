import categories from '../data/categories.json';
import products from '../data/products.json';
import type { Category, Product } from '../types/product';

export function getProducts(): Product[] {
  return products as Product[];
}

export function getActiveCategories(): Category[] {
  const typedProducts = getProducts();
  const slugsWithProducts = new Set(typedProducts.map((product) => product.categoria));

  return (categories as Category[]).filter((category) =>
    slugsWithProducts.has(category.slug),
  );
}

export function getCategorySections() {
  const typedProducts = getProducts();

  return getActiveCategories().map((category) => ({
    category,
    products: typedProducts.filter((product) => product.categoria === category.slug),
  }));
}
