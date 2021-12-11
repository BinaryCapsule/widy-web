import { Box, CSSProp, Skeleton } from '@binarycapsule/ui-capsules';
import React from 'react';
import { Content, StyledDayButton } from './DayButton.styles';

export const DayButtonLoading: React.FC<CSSProp> = ({ css }) => {
  return (
    <Box css={css}>
      <StyledDayButton>
        <Content isToday={false}>
          <Skeleton
            circular
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
