import React from 'react';
import { Box, EditableInput } from '@binarycapsule/ui-capsules';
import { useUpdateTaskMutation } from '../../../../api/useUpdateTaskMutation';
import { MarginProps } from '@binarycapsule/ui-capsules/dist/styledProps';

interface Props extends MarginProps {
  taskId: number;
  summary: string;
}

export const EditableTaskSummary: React.FC<Props> = ({ taskId, summary, ...rest }) => {
  const { mutateAsync: updateTask } = useUpdateTaskMutation();

  const handleInputChange = async (summary: string) => {
    try {
      await updateTask({ taskId, payload: { summary } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box {...rest}>
      <EditableInput size="large" value={summary} action={handleInputChange} />
    </Box>
  );
};
