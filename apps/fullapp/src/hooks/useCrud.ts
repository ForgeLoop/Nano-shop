import { useState, useCallback } from 'react';

interface UseCrudOptions<T> {
  initialData?: T | null;
  onSuccess?: (result: T) => void;
  onError?: (error: any) => void;
}

interface UseCrudReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (...params: any[]) => Promise<T | undefined>;
  reset: () => void;
  isSuccess: boolean;
  isEmpty: boolean;
}

export const useCrud = <T = any>(
  apiFunction: (...args: any[]) => Promise<T>,
  options: UseCrudOptions<T> = {}
): UseCrudReturn<T> => {
  const { initialData = null, onSuccess, onError } = options;
  
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (...params: any[]): Promise<T | undefined> => {
    if (loading) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiFunction(...params);
      setData(result);
      onSuccess?.(result);
      return result;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Something went wrong';
      setError(errorMessage);
      onError?.(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, onSuccess, onError]);

  const reset = useCallback(() => {
    setData(initialData);
    setError(null);
    setLoading(false);
  }, [initialData]);

  return {
    data,
    loading,
    error,
    execute,
    reset,
    isSuccess: !loading && !error && data !== null,
    isEmpty: !loading && !error && (data === null || (Array.isArray(data) && data.length === 0))
  };
};