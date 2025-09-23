import apiClient from '@/services/api';

interface Product {
  id: number;
  id_client: number;
  id_category: number;
  name: string;
  price: number;
  description: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

interface ProductsResponse {
  products: Product[];
}

export type { Product };

export const productService = {
  getAllProducts: async (): Promise<Product[]> => {
    const response = await apiClient.get<ApiResponse<ProductsResponse>>('/api/products');
    return response.data.data.products;
  },

  getProductById: async (id: string | number): Promise<Product> => {
    const response = await apiClient.get(`/api/products/${id}`);
    return response.data;
  },

  createProduct: async (productData: Partial<Product>): Promise<Product> => {
    const response = await apiClient.post('/products', productData);
    return response.data;
  },

  updateProduct: async (id: string | number, productData: Partial<Product>): Promise<Product> => {
    const response = await apiClient.put(`/api/products/${id}`, productData);
    return response.data;
  },

  deleteProduct: async (id: string | number): Promise<void> => {
    const response = await apiClient.delete(`/products/${id}`);
    return response.data;
  }
};