import React from 'react';
import { times } from '../../../../utils/misc';
import { Box, Skeleton } from '@binarycapsule/ui-capsules';

export const NextLoading = () => {
  return (
    <Box style={{ margin: '20px 0' }}>
      <Skeleton
        $circular
        style={{
          height: 32,
          width: 100,
          marginBottom: 12,
          marginLeft: 'auto',
        }}
      />

      {times(5).map(key => (
        <Skeleton
          key={key}
          $circular
          style={{
            height: 32,
            marginBottom: 12,
          }}
        />
      ))}
    </Box>
  );
};
