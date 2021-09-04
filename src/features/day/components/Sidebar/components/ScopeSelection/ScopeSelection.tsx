import React, { useState } from 'react';
import { Box, Text } from '@binarycapsule/ui-capsules';
import { ScopeSelect } from '../../../ScopeSelect/ScopeSelect';
import { MarginProps } from '@binarycapsule/ui-capsules/dist/styledProps';
import { useScopesOptions } from '../../../../api/useScopesQuery';
import { useUpdateTaskMutation } from '../../../../api/useUpdateTaskMutation';
import { TaskDto } from '../../../../api/useDayQuery';
import { UpsertScope } from '../../../UpsertScope/UpsertScope';
import { UpsertScopeResponse } from '../../../../api/useUpsertScopeMutation';

interface Props extends MarginProps {
  task: TaskDto;
}

export const ScopeSelection: React.FC<Props> = ({ task, ...rest }) => {
  const [isScopesModalOpen, setIsScopesModalOpen] = useState(false);

  const scopesOptions = useScopesOptions();

  const { mutateAsync: updateTask } = useUpdateTaskMutation();

  const handleScopeChange = async (scope: Partial<UpsertScopeResponse> | null) => {
    try {
      await updateTask({ taskId: task.id, payload: { scopeId: scope?.id || null } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Box {...rest}>
        <Text color="neutral.700" fontWeight={500} fontSize="small" mt="16" mb="4">
          Scope
        </Text>

        <ScopeSelect
          value={scopesOptions.find(scopeOpt => scopeOpt.value === task.scopeId) || null}
          onChange={opt => handleScopeChange(opt ? { id: opt.value } : null)}
          onCreateScope={() => setIsScopesModalOpen(true)}
        />
      </Box>

      {isScopesModalOpen && (
        <UpsertScope
          onClose={() => setIsScopesModalOpen(false)}
          onUpsertScope={handleScopeChange}
        />
      )}
    </>
  );
};
