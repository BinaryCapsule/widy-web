import React from 'react';
import { useTheme } from 'styled-components';
import { Box, Button, Flex, Icon, Text } from '@binarycapsule/ui-capsules';

interface Props {
  onRetry(): void;
}

export const DaysListError: React.FC<Props> = ({ onRetry }) => {
  const theme = useTheme();

  return (
    <Flex $direction="column" style={{ alignItems: 'center' }}>
      <Flex $align="center">
        <Icon icon="exclamation_c" style={{ color: theme.colors.error600, marginRight: 8 }} />
        <Text color="error600" style={{ fontWeight: 500 }}>
          Something went wrong
        </Text>
      </Flex>

      <Box style={{ alignSelf: 'center', marginTop: 12 }}>
        <Button onClick={onRetry} variant="ghostGray" leftIcon="refresh" size="small">
          Retry
        </Button>
      </Box>
    </Flex>
  );
};
