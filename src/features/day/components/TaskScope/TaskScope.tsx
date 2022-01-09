import React, { useMemo } from 'react';
import { CSSProp, Text } from '@binarycapsule/ui-capsules';
import { useScopesQuery } from '../../api/useScopesQuery';
import { TaskDto } from '../../api/useDayQuery';

interface Props extends CSSProp {
  task: TaskDto;
}

export const TaskScope: React.FC<Props> = ({ task, css }) => {
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
    <Text variant="smallCaps" css={{ fontWeight: 500, fontSize: '13px', ...css }}>
      {taskScope.shortCode}
    </Text>
  );
};
