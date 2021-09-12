import React from 'react';
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  RadioPicker,
} from '@binarycapsule/ui-capsules';
import { ErrorMessage } from '@hookform/error-message';
import { FormValues } from './LaunchTaskModal.meta';
import { HelpText } from '@binarycapsule/ui-capsules/dist/HelpText/HelpText';
import { useLaunchTaskModal } from './useLaunchTaskModal';

interface Props {
  onClose(): void;
}

export const LaunchTaskModal: React.FC<Props> = ({ onClose }) => {
  const { data } = useLaunchTaskModal();

  if (!data) {
    return null;
  }

  const { sectionOpts, selectedSectionId, formBag } = data;

  const onLaunchTask = ({ sectionId }: FormValues) => {
    console.log('section', sectionId);
    // TODO ➜ When launching a task we need to do the optimistic update and start the
    //  task at the same time. Also, if there is any other task active, we need to stop it
  };

  return (
    <Modal isOpen onRequestClose={onClose} contentLabel="Launch task" size="small">
      <form onSubmit={formBag.handleSubmit(onLaunchTask)}>
        <ModalHeader>Select section</ModalHeader>
        <ModalCloseButton onClick={onClose} />

        <ModalBody>
          <Box display="flex" flexDirection="column">
            {sectionOpts.map(({ id, label }, index) => (
              <RadioPicker
                key={id}
                checked={id === selectedSectionId}
                label={label}
                onChange={() => formBag.setValue('sectionId', id)}
                mb={index !== sectionOpts.length - 1 ? '16' : 0}
              />
            ))}
          </Box>

          <ErrorMessage
            errors={formBag.formState.errors}
            name="sectionId"
            render={({ message }) => <HelpText variant="error">{message}</HelpText>}
          />
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" variantColor="neutral" onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit">Launch Task</Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
