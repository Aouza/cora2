import { useState, useEffect } from "react";
import { isProductionEnvironment } from "../db/config";

interface UseEmptyStateProps {
  initialData?: any[];
  dataKey?: string;
}

export function useEmptyState({
  initialData = [],
  dataKey,
}: UseEmptyStateProps = {}) {
  const [data, setData] = useState<any[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const isEmpty = data.length === 0;
  const isProduction = isProductionEnvironment();

  // Em produção, sempre começa vazio
  useEffect(() => {
    if (isProduction) {
      setData([]);
    }
  }, [isProduction]);

  const addItem = (item: any) => {
    setData((prev) => [...prev, item]);
  };

  const removeItem = (id: string | number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItem = (id: string | number, updates: any) => {
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const clearData = () => {
    setData([]);
  };

  const loadData = async (fetchFunction: () => Promise<any[]>) => {
    setIsLoading(true);
    try {
      const result = await fetchFunction();
      setData(result);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isEmpty,
    isLoading,
    isProduction,
    addItem,
    removeItem,
    updateItem,
    clearData,
    loadData,
    setData,
  };
}
