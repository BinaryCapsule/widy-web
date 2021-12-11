import React from 'react';
import { Box, CSSProp, EditableInput } from '@binarycapsule/ui-capsules';
import { useUpdateTaskMutation } from '../../../../api/useUpdateTaskMutation';

interface Props extends CSSProp {
  taskId: number;
  summary: string;
}

export const EditableTaskSummary: React.FC<Props> = ({ taskId, summary, css }) => {
  const { mutateAsync: updateTask } = useUpdateTaskMutation();

  const handleInputChange = async (summary: string) => {
    try {
      await updateTask({ taskId, payload: { summary } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box css={css}>
      <EditableInput size="large" value={summary} action={handleInputChange} />
    </Box>
  );
};
