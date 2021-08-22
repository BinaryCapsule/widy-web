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
  Toaster,
} from '@binarycapsule/ui-capsules';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormValues, suggestions, validationSchema } from './RegisterTime.meta';
import { useUpdateTaskMutation } from '../../api/useUpdateTaskMutation';
import { TaskDto } from '../../api/useDayQuery';

interface Props {
  task: TaskDto;
  onRequestClose(): void;
}

export const RegisterTime: React.FC<Props> = ({ task, onRequestClose }) => {
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

      Toaster.error({ title: 'Oops, something went wrong' });
    }
  };

  return (
    <Modal isOpen size="small" contentLabel="Register Time">
      <ModalHeader>Register time</ModalHeader>

      <ModalCloseButton onClick={onRequestClose} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <Flex>
            <Flex alignItems="center">
              <Flex width={68}>
                <Input {...register('hours')} autoFocus type="number" />
              </Flex>

              <Text ml="8">h</Text>
            </Flex>

            <Flex alignItems="center" ml="16">
              <Flex width={68}>
                <Input {...register('minutes')} type="number" />
              </Flex>

              <Text ml="8">min</Text>
            </Flex>
          </Flex>

          {errors.hours?.message && (
            <Text fontSize="small" color="error.500" mt="4">
              {errors.hours.message}
            </Text>
          )}

          {errors.minutes?.message && (
            <Text fontSize="small" color="error.500" mt="4">
              {errors.minutes.message}
            </Text>
          )}

          <Text fontWeight={500} mt="24" mb="4">
            Suggestions
          </Text>

          <Flex flexWrap="wrap">
            {suggestions.map(({ label, hours, minutes }) => (
              <Button
                key={label}
                variant="outline"
                onClick={() => {
                  setValue('hours', hours);
                  setValue('minutes', minutes);
                }}
                m="4"
              >
                {label}
              </Button>
            ))}
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" variantColor="neutral" onClick={onRequestClose}>
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
