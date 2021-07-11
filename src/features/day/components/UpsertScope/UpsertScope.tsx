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
  Text,
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
            <Text variant="label">Name</Text>

            <Input
              {...register('name')}
              placeholder="Scope name"
              error={errors.name?.message}
              autoFocus
            />
          </Box>

          <Box>
            <Text variant="label">Short Code</Text>
            <Text variant="helper" mb="4">
              Choose a short code to identify this scope.
            </Text>

            <Box>
              <Input
                {...register('shortCode')}
                placeholder="Scope code"
                error={errors.name?.message}
              />
            </Box>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" variantColor="neutral" size="large" onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit" size="large" isLoading={isLoading}>
            {scope ? 'Save Changes' : 'Create Scope'}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
