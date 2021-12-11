import React from 'react';
import { Box, Button, Flex, Icon, Text } from '@binarycapsule/ui-capsules';

interface Props {
  onRetry(): void;
}

export const DaysListError: React.FC<Props> = ({ onRetry }) => {
  return (
    <Flex direction="column">
      <Flex align="center">
        <Icon icon="exclamation_c" css={{ color: '$error600', mr: '$2' }} />
        <Text css={{ fontWeight: 500, color: '$error600' }}>Something went wrong...</Text>
      </Flex>

      <Box css={{ alignSelf: 'center', mt: '$3' }}>
        <Button onClick={onRetry} variant="ghostGray" leftIcon="refresh" size="small">
          Retry
        </Button>
      </Box>
    </Flex>
  );
};
