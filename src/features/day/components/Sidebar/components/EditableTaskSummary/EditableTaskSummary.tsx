import React, { ComponentPropsWithoutRef } from 'react';
import { Box, EditableInput } from '@binarycapsule/ui-capsules';
import { useUpdateTaskMutation } from '../../../../api/useUpdateTaskMutation';

interface Props extends Pick<ComponentPropsWithoutRef<'div'>, 'style'> {
  taskId: number;
  summary: string;
}

export const EditableTaskSummary: React.FC<Props> = ({ taskId, summary, style }) => {
  const { mutateAsync: updateTask } = useUpdateTaskMutation();

  const handleInputChange = async (summary: string) => {
    try {
      await updateTask({ taskId, payload: { summary } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box style={style}>
      <EditableInput size="large" value={summary} action={handleInputChange} />
    </Box>
  );
};
