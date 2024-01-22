import React, { ComponentPropsWithoutRef, useMemo } from 'react';
import { Text } from '@binarycapsule/ui-capsules';
import { useScopesQuery } from '../../api/useScopesQuery';
import { TaskDto } from '../../api/useDayQuery';

interface Props extends Pick<ComponentPropsWithoutRef<'div'>, 'style'> {
  task: TaskDto;
}

export const TaskScope: React.FC<Props> = ({ task, style }) => {
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
    <Text variant="smallCaps" style={{ fontWeight: 500, fontSize: '13px', ...style }}>
      {taskScope.shortCode}
    </Text>
  );
};
