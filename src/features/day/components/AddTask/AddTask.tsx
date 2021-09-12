import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from '@binarycapsule/ui-capsules';
import { Controller, useForm } from 'react-hook-form';
import { useCreateTaskMutation } from '../../api/useCreateTaskMutation';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormValues, validationSchema } from './AddTask.meta';
import { useDayQuery } from '../../api/useDayQuery';
import { useTaskRank } from '../../hooks/useTaskRank';
import { ScopeSelect } from '../ScopeSelect/ScopeSelect';
import { UpsertScope } from '../UpsertScope/UpsertScope';
import { UpsertScopeResponse } from '../../api/useUpsertScopeMutation';
import { ScopeOption } from '../../api/useScopesQuery';

interface Props {
  sectionId: number;
  onClose(): void;
}

export const AddTask: React.FC<Props> = ({ sectionId, onClose }) => {
  const [isScopesModalOpen, setIsScopesModalOpen] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      summary: '',
    },
    resolver: yupResolver(validationSchema),
    shouldUnregister: false,
  });

  const { data } = useDayQuery();

  const { mutateAsync: createTask, isLoading: isCreatingTask } = useCreateTaskMutation();

  const { getTaskRank } = useTaskRank();

  if (!data) {
    return null;
  }

  const onCreateTask = async (values: FormValues) => {
    const rank = getTaskRank(sectionId);

    try {
      await createTask({
        sectionId,
        summary: values.summary,
        rank,
        scopeId: values.scope ? values.scope.value : undefined,
      });

      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const onUpsertScope = (scope: UpsertScopeResponse) => {
    const scopeOption = {
      value: scope.id,
      label: scope.name,
      shortCode: scope.shortCode,
    };

    setValue('scope', scopeOption);
  };

  return (
    <>
      <Modal isOpen={!isScopesModalOpen} onRequestClose={onClose} contentLabel="Example Modal">
        <ModalHeader>Add Task</ModalHeader>

        <ModalCloseButton onClick={onClose} />

        <form onSubmit={handleSubmit(onCreateTask)}>
          <ModalBody>
            <Input
              label="What will you be working on?"
              {...register('summary')}
              size="large"
              autoFocus
              placeholder="Task summary"
              variant={errors.summary ? 'error' : undefined}
              helpText={errors.summary?.message}
            />

            <Box mb="16" />

            <Controller
              name="scope"
              control={control}
              render={({ field }) => (
                <ScopeSelect
                  value={field.value}
                  onChange={opt => setValue('scope', opt as ScopeOption)}
                  onCreateScope={() => setIsScopesModalOpen(true)}
                />
              )}
            />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" variantColor="neutral" onClick={onClose}>
              Cancel
            </Button>

            <Button type="submit" isLoading={isCreatingTask}>
              Add Task
            </Button>
          </ModalFooter>
        </form>
      </Modal>

      {isScopesModalOpen && (
        <UpsertScope onClose={() => setIsScopesModalOpen(false)} onUpsertScope={onUpsertScope} />
      )}
    </>
  );
};
