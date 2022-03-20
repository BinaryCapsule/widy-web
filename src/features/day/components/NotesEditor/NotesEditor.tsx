import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Editor, EditorRef } from '@binarycapsule/editor';
import { Box, CSSProp, Text } from '@binarycapsule/ui-capsules';
import debounce from 'lodash.debounce';
import { useUpdateTaskMutation } from '../../api/useUpdateTaskMutation';
import { EditorWrapper } from './NotesEditor.styles';

interface NotesEditorProps extends CSSProp {
  taskId: number;
  notes: string;
}

const NotesEditor: React.FC<NotesEditorProps> = ({ taskId, notes, css }) => {
  const editorRef = React.useRef<EditorRef>(null);

  const { mutateAsync: updateTask } = useUpdateTaskMutation();

  const [editorKey, setEditorKey] = useState(Date.now());

  const updateEditor = useCallback(() => {
    setEditorKey(Date.now());
  }, []);

  // Update value when changing the selected task
  useEffect(() => {
    updateEditor();
  }, [taskId, updateEditor]);

  const saveEditorValue = async (notes: string) => {
    try {
      await updateTask({ taskId, payload: { notes: notes || '' } });
    } catch (err) {
      console.error(err);

      updateEditor();
    }
  };

  const debouncedSaveEditor = useRef(debounce(saveEditorValue, 500)).current;

  return (
    <Box css={css}>
      <Text variant="label" css={{ mb: '$1' }}>
        Notes
      </Text>

      <EditorWrapper>
        <Editor
          key={editorKey}
          ref={editorRef}
          defaultValue={notes}
          onChange={debouncedSaveEditor}
        />
      </EditorWrapper>
    </Box>
  );
};

export default NotesEditor;
