import React, { ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react';
import { Editor } from '@binarycapsule/editor';
import { Box, Text } from '@binarycapsule/ui-capsules';
import debounce from 'lodash.debounce';
import { useUpdateTaskMutation } from '../../api/useUpdateTaskMutation';
import { EditorWrapper } from './NotesEditor.styles';

interface NotesEditorProps extends Pick<ComponentPropsWithoutRef<'div'>, 'style'> {
  taskId: number;
  notes: string;
}

const NotesEditor: React.FC<NotesEditorProps> = ({ taskId, notes, style }) => {
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
    <Box style={style}>
      <Text variant="label" style={{ marginBottom: 4 }}>
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
