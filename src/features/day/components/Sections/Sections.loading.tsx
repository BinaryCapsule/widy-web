import React from 'react';
import { Box, Skeleton } from '@binarycapsule/ui-capsules';
import { times } from '../../../../utils/misc';

interface Props {
  count?: number;
}

export const SectionsLoading: React.FC<Props> = ({ count = 3 }) => {
  return (
    <>
      {times(count).map(key => (
        <Box key={key} css={{ mb: '$3' }}>
          <Skeleton
            $circular
            style={{
              height: 12,
              width: 100,
              marginBottom: 12,
            }}
          />

          {times(3).map(key => (
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
      ))}
    </>
  );
};
