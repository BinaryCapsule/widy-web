import React from 'react';
import {
  Alert,
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from '@binarycapsule/ui-capsules';
import { UpsertScopeResponse, useUpsertScopeMutation } from '../../api/useUpsertScopeMutation';
import { ScopeDto } from '../../api/useScopesQuery';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormValues, validationSchema } from './UpsertScope.meta';

interface Props {
  scope?: ScopeDto;
  onClose(): void;
  onUpsertScope(scope: UpsertScopeResponse): void;
}

export const UpsertScope: React.FC<Props> = ({ scope, onUpsertScope, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      shortCode: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const { mutateAsync: upsertScope, isLoading, error } = useUpsertScopeMutation();

  const onSubmit = async ({ name, shortCode }: FormValues) => {
    try {
      const newScope = await upsertScope({
        scopeId: scope ? scope.id : undefined,
        body: { name, shortCode },
      });

      onUpsertScope(newScope);

      onClose();
    } catch {
      // Ignore
    }
  };

  return (
    <Modal isOpen onRequestClose={onClose} contentLabel="Create scope modal" size="small">
      <ModalHeader>{scope ? 'Edit scope' : 'Create new scope'}</ModalHeader>

      <ModalCloseButton onClick={onClose} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          {error && <Alert variant="error" message={error.message} mb="12" />}

          <Box mb="12">
            <Input
              label="Name"
              {...register('name')}
              placeholder="Scope name"
              variant={errors.name ? 'error' : undefined}
              helpText={errors.name?.message}
              autoFocus
            />
          </Box>

          <Input
            label="Short Code"
            {...register('shortCode')}
            placeholder="Scope code"
            variant={errors.shortCode ? 'error' : undefined}
            helpText={errors.shortCode?.message}
          />
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" variantColor="neutral" onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit" isLoading={isLoading}>
            {scope ? 'Save Changes' : 'Create Scope'}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
