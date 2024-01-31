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
        <Box key={key} style={{ marginBottom: 12 }}>
          <Skeleton
            isRound
            width={100}
            height={12}
            style={{
              marginBottom: 12,
            }}
          />

          {times(3).map(key => (
            <Skeleton
              key={key}
              isRound
              height={32}
              style={{
                marginBottom: 12,
              }}
            />
          ))}
        </Box>
      ))}
    </>
  );
};
