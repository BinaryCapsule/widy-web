import React, { ComponentPropsWithoutRef } from 'react';
import { Box, Skeleton } from '@binarycapsule/ui-capsules';
import { Content, StyledDayButton } from './DayButton.styles';

interface Props extends Pick<ComponentPropsWithoutRef<'div'>, 'style'> {}

export const DayButtonLoading = ({ style }: Props) => {
  return (
    <Box style={style}>
      <StyledDayButton>
        <Content $isToday={false}>
          <Skeleton
            $circular
            css={{
              height: 12,
              width: 100,
            }}
          />
        </Content>
      </StyledDayButton>
    </Box>
  );
};
