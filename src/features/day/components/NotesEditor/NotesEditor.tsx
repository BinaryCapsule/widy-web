import React, { useCallback, useEffect, useState } from 'react';
import { Editor, EditorRef } from '@binarycapsule/editor';
import { Wrapper, WrapperProps, Text } from '@binarycapsule/ui-capsules';
import useDebounce from 'react-use/lib/useDebounce';
import { useUpdateTaskMutation } from '../../api/useUpdateTaskMutation';
import { EditorWrapper } from './NotesEditor.styles';

interface NotesEditorProps extends WrapperProps {
  taskId: number;
  notes: string;
}

export const NotesEditor: React.FC<NotesEditorProps> = ({ taskId, notes, ...rest }) => {
  const editorRef = React.useRef<EditorRef>(null);

  const { mutateAsync: updateTask } = useUpdateTaskMutation();

  const [editorKey, setEditorKey] = useState(Date.now());

  const [value, setValue] = useState(notes);

  const updateEditor = useCallback(() => {
    setEditorKey(Date.now());
  }, []);

  // Update value when changing the selected task
  useEffect(() => {
    updateEditor();
  }, [taskId, updateEditor]);

  useDebounce(
    async () => {
      const notes = editorRef.current?.value;

      try {
        await updateTask({ taskId, payload: { notes: notes || '' } });
      } catch (err) {
        console.error(err);

        updateEditor();
      }
    },
    500,
    [value],
  );

  return (
    <Wrapper {...rest}>
      <Text variant="label" mb="4">
        Notes
      </Text>

      <EditorWrapper>
        <Editor
          key={editorKey}
          ref={editorRef}
          defaultValue={notes}
          onChange={val => setValue(val)}
        />
      </EditorWrapper>
    </Wrapper>
  );
};