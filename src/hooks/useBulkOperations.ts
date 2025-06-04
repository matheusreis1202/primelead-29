
import { useState, useCallback } from 'react';

export const useBulkOperations = <T extends { id?: string; name: string }>(items: T[]) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const isSelected = useCallback((item: T) => {
    const id = item.id || item.name;
    return selectedIds.has(id);
  }, [selectedIds]);

  const toggleSelection = useCallback((item: T) => {
    const id = item.id || item.name;
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const selectAll = useCallback(() => {
    const allIds = items.map(item => item.id || item.name);
    setSelectedIds(new Set(allIds));
  }, [items]);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const getSelectedItems = useCallback(() => {
    return items.filter(item => {
      const id = item.id || item.name;
      return selectedIds.has(id);
    });
  }, [items, selectedIds]);

  const isAllSelected = selectedIds.size === items.length && items.length > 0;
  const isPartiallySelected = selectedIds.size > 0 && selectedIds.size < items.length;

  return {
    selectedIds,
    isSelected,
    toggleSelection,
    selectAll,
    clearSelection,
    getSelectedItems,
    selectedCount: selectedIds.size,
    isAllSelected,
    isPartiallySelected
  };
};
