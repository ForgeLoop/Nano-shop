import apiClient from '@/services/api';

interface Category {
  id: string | number;
  name: string;
  description?: string;
  [key: string]: any;
}

export const categoryService = {
  getAllCategories: async (): Promise<Category[]> => {
    const response = await apiClient.get('/categories');
    return response.data;
  },

  getCategoryById: async (id: string | number): Promise<Category> => {
    const response = await apiClient.get(`/categories/${id}`);
    return response.data;
  },

  createCategory: async (categoryData: Partial<Category>): Promise<Category> => {
    const response = await apiClient.post('/categories', categoryData);
    return response.data;
  },

  updateCategory: async (id: string | number, categoryData: Partial<Category>): Promise<Category> => {
    const response = await apiClient.put(`/categories/${id}`, categoryData);
    return response.data;
  },

  deleteCategory: async (id: string | number): Promise<void> => {
    const response = await apiClient.delete(`/categories/${id}`);
    return response.data;
  }
};