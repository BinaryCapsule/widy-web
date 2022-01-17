import React from 'react';
import { times } from '../../../../utils/misc';
import { Box, Skeleton } from '@binarycapsule/ui-capsules';

export const NextLoading = () => {
  return (
    <Box css={{ my: '$5' }}>
      <Skeleton
        circular
        css={{
          height: 32,
          width: 100,
          mb: '$3',
          ml: 'auto',
        }}
      />

      {times(5).map(key => (
        <Skeleton
          key={key}
          circular
          css={{
            height: 32,
            mb: '$3',
          }}
        />
      ))}
    </Box>
  );
};
