import React, { useMemo } from 'react';
import { Text } from '@binarycapsule/ui-capsules';
import { useScopesQuery } from '../../api/useScopesQuery';
import { TaskDto } from '../../api/useDayQuery';
import { MarginProps } from '@binarycapsule/ui-capsules/dist/styledProps';

interface Props extends MarginProps {
  task: TaskDto;
}

export const TaskScope: React.FC<Props> = ({ task, ...rest }) => {
  const { data: scopes } = useScopesQuery();

  const taskScope = useMemo(() => {
    if (!scopes) {
      return null;
    }

    const foundScope = scopes.find(({ id }) => task.scopeId === id);

    return foundScope || null;
  }, [scopes, task.scopeId]);

  if (!taskScope) {
    return null;
  }

  return (
    <Text variant="smallCaps" {...rest}>
      {taskScope.shortCode}
    </Text>
  );
};
