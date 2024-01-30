import React from 'react';
import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Text,
  toast,
} from '@binarycapsule/ui-capsules';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormValues, suggestions, validationSchema } from './RegisterTime.meta';
import { useUpdateTaskMutation } from '../../api/useUpdateTaskMutation';
import { TaskDto } from '../../api/useDayQuery';
import { GENERIC_ERROR_MSG } from '../../../../common/constants';

interface Props {
  task: TaskDto;
  onRequestClose(): void;
}

export const RegisterTime = ({ task, onRequestClose }: Props) => {
  const { mutateAsync: updateTask, isLoading } = useUpdateTaskMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { hours: 0, minutes: 0 },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async ({ hours, minutes }: FormValues) => {
    try {
      const time = hours * 3600 + minutes * 60;

      if (isNaN(time)) {
        throw new Error('time is NaN');
      }

      await updateTask({ taskId: task.id, payload: { time } });

      onRequestClose();
    } catch (err) {
      console.error(err);

      toast.error({ title: GENERIC_ERROR_MSG });
    }
  };

  return (
    <Modal isOpen size="small" contentLabel="Register Time" onClose={onRequestClose}>
      <ModalHeader>Register time</ModalHeader>

      <ModalCloseButton onClick={onRequestClose} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <Flex>
            <Flex align="center">
              <Flex style={{ width: 68 }}>
                <Input {...register('hours')} type="number" />
              </Flex>

              <Text style={{ marginLeft: 8 }}>h</Text>
            </Flex>

            <Flex align="center" style={{ marginLeft: 16 }}>
              <Flex style={{ width: 68 }}>
                <Input {...register('minutes')} type="number" />
              </Flex>

              <Text style={{ marginLeft: 8 }}>min</Text>
            </Flex>
          </Flex>

          {errors.hours?.message && (
            <Text size="sm" color="error500" style={{ marginTop: 4 }}>
              {errors.hours.message}
            </Text>
          )}

          {errors.minutes?.message && (
            <Text size="sm" color="error500" style={{ marginTop: 4 }}>
              {errors.minutes.message}
            </Text>
          )}

          <Text variant="label" style={{ marginTop: 20, marginBottom: 4 }}>
            Suggestions
          </Text>

          <Flex wrap="wrap">
            {suggestions.map(({ label, hours, minutes }) => (
              <Button
                key={label}
                variant="secondary"
                size="small"
                onClick={() => {
                  setValue('hours', hours);
                  setValue('minutes', minutes);
                }}
                style={{ margin: 4 }}
              >
                {label}
              </Button>
            ))}
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghostGray" onClick={onRequestClose}>
            Cancel
          </Button>

          <Button type="submit" isLoading={isLoading}>
            Register time
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
