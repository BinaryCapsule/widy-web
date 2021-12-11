import React, { useState } from 'react';
import { Box, CSSProp } from '@binarycapsule/ui-capsules';
import { ScopeSelect } from '../../../ScopeSelect/ScopeSelect';
import { useScopesOptions } from '../../../../api/useScopesQuery';
import { useUpdateTaskMutation } from '../../../../api/useUpdateTaskMutation';
import { TaskDto } from '../../../../api/useDayQuery';
import { UpsertScope } from '../../../UpsertScope/UpsertScope';
import { UpsertScopeResponse } from '../../../../api/useUpsertScopeMutation';

interface Props extends CSSProp {
  task: TaskDto;
}

export const ScopeSelection: React.FC<Props> = ({ task, css }) => {
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
      <Box css={css}>
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
