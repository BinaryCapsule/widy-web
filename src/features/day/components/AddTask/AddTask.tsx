import React, { useState } from 'react';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Text,
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
    } catch {
      // Ignore
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
            <Text color="neutral.700" fontWeight={600} fontSize="body" mb="4">
              What will you be working on?
            </Text>

            <Input
              {...register('summary')}
              size="large"
              autoFocus
              placeholder="Task summary"
              error={errors.summary?.message}
            />

            <Text color="neutral.700" fontWeight={600} fontSize="body" mt="24" mb="4">
              Task scope
            </Text>

            <Controller
              name="scope"
              control={control}
              render={({ field }) => (
                <ScopeSelect
                  value={field.value}
                  onChange={opt => setValue('scope', opt)}
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
