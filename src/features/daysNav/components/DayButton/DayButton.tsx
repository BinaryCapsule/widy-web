import { Box, Icon } from '@binarycapsule/ui-capsules';
import React from 'react';
import { Badge } from '../../../../components/Badge/Badge';
import { Content, StyledDayButton, StyledInput } from './DayButton.styles';

interface Props {
  isSelected: boolean;
  isToday: boolean;
  onClick(): void;
}

export const DayButton: React.FC<Props> = ({ isSelected, isToday, onClick, children }) => {
  return (
    <Box as="label" css={{ my: '$1' }}>
      <StyledInput type="radio" name="day-button" checked={isSelected} onChange={onClick} />

      <StyledDayButton className="day-button">
        <Content isToday={isToday}>
          {isToday && <Badge css={{ color: '$blue50', background: '$blue500' }}>Today</Badge>}

          <span>{children}</span>
        </Content>

        <Icon icon="chev_right" size={16} />
      </StyledDayButton>
    </Box>
  );
};
