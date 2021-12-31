import React from 'react';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from '@binarycapsule/ui-capsules';
import { TaskDto } from '../../api/useDayQuery';
import { useUpdateTaskMutation } from '../../api/useUpdateTaskMutation';
import { useForm } from 'react-hook-form';
import { FormValues, validationSchema } from './RenameTask.meta';
import { yupResolver } from '@hookform/resolvers/yup';

interface Props {
  task: TaskDto;
  onRequestClose(): void;
}

export const RenameTask: React.FC<Props> = ({ task, onRequestClose }) => {
  const { mutateAsync: updateTask } = useUpdateTaskMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { summary: task.summary },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async ({ summary }: FormValues) => {
    try {
      onRequestClose();

      await updateTask({ taskId: task.id, payload: { summary } });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal isOpen onClose={onRequestClose} contentLabel="Rename a task">
      <ModalHeader>Rename task</ModalHeader>

      <ModalCloseButton onClick={onRequestClose} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <Input
            label="Summary"
            {...register('summary')}
            size="large"
            placeholder="Task summary"
            variant={errors.summary ? 'error' : undefined}
            helpText={errors.summary?.message}
          />
        </ModalBody>

        <ModalFooter>
          <Button variant="ghostGray" onClick={onRequestClose}>
            Cancel
          </Button>

          <Button type="submit">Rename</Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
