import React from 'react';
import { Box, Button, Flex, Icon, Text } from '@binarycapsule/ui-capsules';

interface Props {
  onRetry(): void;
}

export const DaysListError: React.FC<Props> = ({ onRetry }) => {
  return (
    <Flex flexDirection="column">
      <Flex alignItems="center">
        <Icon icon="exclamation_c" mr="8" color="error.600" />
        <Text fontWeight={500} color="red.600">
          Something went wrong...
        </Text>
      </Flex>

      <Box alignSelf="center" mt="12">
        <Button
          onClick={onRetry}
          variant="ghost"
          variantColor="neutral"
          leftIcon="refresh"
          size="small"
        >
          Retry
        </Button>
      </Box>
    </Flex>
  );
};
