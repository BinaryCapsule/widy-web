import React from 'react';
import { Box, Skeleton } from '@binarycapsule/ui-capsules';
import times from 'lodash/times';

interface Props {
  count?: number;
}

export const SectionsLoading: React.FC<Props> = ({ count = 3 }) => {
  return (
    <>
      {times(count).map(key => (
        <Box key={key} css={{ mb: '$3' }}>
          <Skeleton
            circular
            css={{
              height: 12,
              width: 100,
              mb: '$3',
            }}
          />

          {times(3).map(key => (
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
      ))}
    </>
  );
};
