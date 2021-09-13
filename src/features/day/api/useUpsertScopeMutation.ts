import { useAuthFetch } from '../../../utils/useAuthFetch';
import { useMutation, useQueryClient } from 'react-query';
import { httpBody } from '../../../utils/httpBody';
import { queryKeys } from './queryKeys';

interface UpsertScopeBody {
  name: string;
  shortCode: string;
}

interface UpsertScopeParams {
  scopeId?: number;
  body: UpsertScopeBody;
}

export interface UpsertScopeResponse {
  id: number;
  name: string;
  shortCode: string;
  isArchived: boolean;
}

export const useUpsertScopeMutation = () => {
  const { authFetch } = useAuthFetch();

  const queryClient = useQueryClient();

  const upsertScope = async ({ scopeId, body }: UpsertScopeParams) => {
    return authFetch(`/api/scopes${scopeId ? `/${scopeId}` : ''}`, {
      method: scopeId ? 'PATCH' : 'POST',
      ...httpBody(body),
    });
  };

  return useMutation<UpsertScopeResponse, Error, UpsertScopeParams>(upsertScope, {
    onSuccess() {
      queryClient.invalidateQueries(queryKeys.scopes());
    },
  });
};
