import React from 'react';
import { Box, Text } from '@binarycapsule/ui-capsules';
import { NoDaysIllustration } from '../../img/NoDaysIllustration';

export const DayEmpty = () => {
  return (
    <Box style={{ textAlign: 'center' }}>
      <Box style={{ maxWidth: 800, margin: '40px auto' }}>
        <NoDaysIllustration />
      </Box>

      <Text as="h1" size="2xl" style={{ fontWeight: 500, marginBottom: 4 }}>
        <span role="img" aria-label="tada">
          🎉
        </span>{' '}
        Welcome to WIDY{' '}
        <span role="img" aria-label="tada">
          🎉
        </span>
      </Text>

      <Text as="p" style={{ marginBottom: 4 }}>
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
