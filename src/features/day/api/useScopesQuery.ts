import { useAuthFetch } from '../../../utils/useAuthFetch';
import { queryKeys } from './queryKeys';
import { useQuery } from 'react-query';
import { useMemo } from 'react';
import { PaginationMeta } from '../../../common/types';

export interface ScopeDto {
  id: number;
  name: string;
  shortCode: string;
  isArchived: boolean;
}

export interface ScopesDto {
  items: ScopeDto[];
  meta: PaginationMeta;
}

export const useScopesQuery = () => {
  const { authFetch } = useAuthFetch();

  const fetchScopes = async (): Promise<ScopeDto[]> => {
    const data: ScopesDto = await authFetch('/api/scopes');

    return data.items;
  };

  const queryKey = queryKeys.scopes();

  return useQuery<ScopeDto[], Error>(queryKey, fetchScopes);
};

export interface ScopeOption {
  value: number;
  label: string;
  shortCode: string;
}

export const useScopesOptions = (): ScopeOption[] => {
  const { data: scopes } = useScopesQuery();

  return useMemo(() => {
    if (!scopes) return [];

    return scopes.map(({ id, name, shortCode }) => ({
      value: id,
      label: name,
      shortCode,
    }));
  }, [scopes]);
};
