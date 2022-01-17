import { useAuthFetch } from '../../../utils/useAuthFetch';
import { useMutation, useQueryClient } from 'react-query';
import { httpBody } from '../../../utils/httpBody';
import { queryKeys } from './queryKeys';
import { ScopeDto } from './useScopesQuery';

interface UpsertScopeBody {
  name?: string;
  shortCode?: string;
  isArchived?: boolean;
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

  const scopesQK = queryKeys.scopes();

  const upsertScope = async ({ scopeId, body }: UpsertScopeParams) => {
    return authFetch(`/api/scopes${scopeId ? `/${scopeId}` : ''}`, {
      method: scopeId ? 'PATCH' : 'POST',
      ...httpBody(body),
    });
  };

  return useMutation<UpsertScopeResponse, Error, UpsertScopeParams>(upsertScope, {
    async onMutate({ scopeId, body }) {
      await queryClient.cancelQueries(scopesQK);

      queryClient.setQueryData<ScopeDto[] | undefined>(scopesQK, old => {
        if (body && body.isArchived) {
          return old ? old.filter(oldScope => oldScope.id !== scopeId) : old;
        }

        return old;
      });
    },

    onSuccess(scope, { scopeId }) {
      queryClient.setQueryData<ScopeDto[] | undefined>(scopesQK, old => {
        if (scopeId) {
          return old ? old.map(oldScope => (oldScope.id === scopeId ? scope : oldScope)) : old;
        }

        return old ? [scope, ...old] : old;
      });
    },

    onSettled() {
      queryClient.invalidateQueries(queryKeys.scopes());
    },
  });
};
