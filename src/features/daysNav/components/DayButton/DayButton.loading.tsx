import { Skeleton, Wrapper, WrapperProps } from '@binarycapsule/ui-capsules';
import React from 'react';
import { Content, StyledDayButton } from './DayButton.styles';

export const DayButtonLoading: React.FC<WrapperProps> = props => {
  return (
    <Wrapper {...props}>
      <StyledDayButton>
        <Content isToday={false}>
          <Skeleton height={12} width={100} circular />
        </Content>
      </StyledDayButton>
    </Wrapper>
  );
};
