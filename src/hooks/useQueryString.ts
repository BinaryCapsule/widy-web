import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

export const useQueryString = () => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
};
