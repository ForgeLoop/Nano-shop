import apiClient from '@/services/api';

interface Category {
  id: string | number;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  [key: string]: any;
}

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

interface CategoriesResponse {
  categories: Category[];
}

export type { Category };

export const categoryService = {
  getAllCategories: async (): Promise<Category[]> => {
    const response = await apiClient.get<ApiResponse<CategoriesResponse>>('/api/categories');
    return response.data.data.categories;
  },

  getCategoryById: async (id: string | number): Promise<Category> => {
    const response = await apiClient.get(`/api/categories/${id}`);
    return response.data;
  },

  createCategory: async (categoryData: Partial<Category>): Promise<Category> => {
    const response = await apiClient.post('/api/categories', categoryData);
    return response.data;
  },

  updateCategory: async (id: string | number, categoryData: Partial<Category>): Promise<Category> => {
    const response = await apiClient.put(`/api/categories/${id}`, categoryData);
    return response.data;
  },

  deleteCategory: async (id: string | number): Promise<void> => {
    const response = await apiClient.delete(`/api/categories/${id}`);
    return response.data;
  }
};