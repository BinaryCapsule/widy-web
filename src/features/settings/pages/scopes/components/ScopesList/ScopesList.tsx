import { Box } from '@binarycapsule/ui-capsules';
import React, { useState } from 'react';
import { Scope } from '../Scope/Scope';
import { ScopeDto, useScopesQuery } from '../../../../../day/api/useScopesQuery';
import { UpsertScope } from '../../../../../day/components/UpsertScope/UpsertScope';
import { SectionEmpty } from '../../../../../day/components/Section/Section.empty';
import { useUpsertScopeMutation } from '../../../../../day/api/useUpsertScopeMutation';

interface Props {
  filter: string;
}

export const ScopesList: React.FC<Props> = ({ filter }) => {
  const { isLoading, isError, data } = useScopesQuery();

  const [scope, setScope] = useState<ScopeDto | null>(null);

  const { mutateAsync: upsertScope } = useUpsertScopeMutation();

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!data) {
    return null;
  }

  const archiveScope = async (scopeId: number) => {
    try {
      await upsertScope({ scopeId, body: { isArchived: true } });
    } catch (error) {
      console.error(error);
    }
  };

  const filteredScopes = data.filter(({ name, shortCode }) => {
    if (filter) {
      const lowerCaseFilter = filter.toLowerCase();
      return (
        name.toLowerCase().includes(lowerCaseFilter) ||
        shortCode.toLowerCase().includes(lowerCaseFilter)
      );
    }
    return true;
  });

  if (filteredScopes.length === 0) {
    return <SectionEmpty>No scopes found</SectionEmpty>;
  }

  return (
    <Box css={{ border: '1px solid $neutral300', borderRadius: '$medium', overflow: 'hidden' }}>
      {filteredScopes.map(scope => (
        <Scope key={scope.id} scope={scope} onEdit={setScope} onArchive={archiveScope} />
      ))}

      {scope && <UpsertScope scope={scope} onClose={() => setScope(null)} />}
    </Box>
  );
};
