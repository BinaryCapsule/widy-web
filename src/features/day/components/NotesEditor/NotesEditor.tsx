import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@binarycapsule/editor';
import { Box, CSSProp, Text } from '@binarycapsule/ui-capsules';
import debounce from 'lodash.debounce';
import { useUpdateTaskMutation } from '../../api/useUpdateTaskMutation';
import { EditorWrapper } from './NotesEditor.styles';

interface NotesEditorProps extends CSSProp {
  taskId: number;
  notes: string;
}

const NotesEditor: React.FC<NotesEditorProps> = ({ taskId, notes, css }) => {
  const { mutateAsync: updateTask } = useUpdateTaskMutation();

  const [editorKey, setEditorKey] = useState(Date.now());

  // Update value when changing the selected task
  useEffect(() => {
    setEditorKey(Date.now());
  }, [taskId]);

  const saveEditorValue = async (taskId: number, notes: string) => {
    try {
      await updateTask({ taskId, payload: { notes: notes || '' } });
    } catch (err) {
      console.error(err);

      setEditorKey(Date.now());
    }
  };

  const debouncedSaveEditor = useRef(debounce(saveEditorValue, 300)).current;

  return (
    <Box css={css}>
      <Text variant="label" css={{ mb: '$1' }}>
        Notes
      </Text>

      <EditorWrapper>
        <Editor
          key={editorKey}
          defaultValue={notes}
          onChange={notes => debouncedSaveEditor(taskId, notes)}
        />
      </EditorWrapper>
    </Box>
  );
};

export default NotesEditor;
