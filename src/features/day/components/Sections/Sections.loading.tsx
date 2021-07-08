import React from 'react';
import { Skeleton, Wrapper } from '@binarycapsule/ui-capsules';
import times from 'lodash/times';

export const SectionsLoading: React.FC = () => {
  return (
    <>
      {times(2).map(key => (
        <Wrapper key={key} my="32">
          <Skeleton width={100} height={12} circular mb="12" />
          {times(3).map(key => (
            <Skeleton key={key} height={32} circular mb="12" />
          ))}
        </Wrapper>
      ))}
    </>
  );
};
