import React from 'react';
import { Box, Text } from '@binarycapsule/ui-capsules';
import { NoDaysIllustration } from '../../img/NoDaysIllustration';

export const DayEmpty = () => {
  return (
    <Box css={{ textAlign: 'center' }}>
      <Box css={{ maxWidth: 800, margin: '40px auto' }}>
        <NoDaysIllustration />
      </Box>

      <Text as="h1" size={5} css={{ fontWeight: 500, mb: '$2' }}>
        <span role="img" aria-label="tada">
          🎉
        </span>{' '}
        Welcome to WIDY{' '}
        <span role="img" aria-label="tada">
          🎉
        </span>
      </Text>

      <Text as="p" css={{ mb: '$1' }}>
        WIDY will help you to track your daily work.
      </Text>

      <Text>
        <span role="img" aria-label="point-left">
          👈
        </span>{' '}
        Click the &quot;+ Add Day&quot; button to get started.
      </Text>
    </Box>
  );
};
