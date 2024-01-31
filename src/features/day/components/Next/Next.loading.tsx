import React from 'react';
import { times } from '../../../../utils/misc';
import { Box, Skeleton } from '@binarycapsule/ui-capsules';

export const NextLoading = () => {
  return (
    <Box style={{ margin: '20px 0' }}>
      <Skeleton
        isRound
        width={100}
        height={32}
        style={{
          marginBottom: 12,
          marginLeft: 'auto',
        }}
      />

      {times(5).map(key => (
        <Skeleton key={key} isRound height={32} style={{ marginBottom: 12 }} />
      ))}
    </Box>
  );
};
