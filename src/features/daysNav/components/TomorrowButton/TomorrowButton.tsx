import React from 'react';
import { Icon } from '@binarycapsule/ui-capsules';
import { useHistory } from 'react-router-dom';
import { StyledTomorrowButton } from './TomorrowButton.styles';
import { useDayRouteParams } from '../../../day/hooks/useDayRouteParams';
import { MarginProps } from '@binarycapsule/ui-capsules/dist/styledProps';

export const TomorrowButton: React.FC<MarginProps> = props => {
  const history = useHistory();
  const { dayId } = useDayRouteParams();

  return (
    <StyledTomorrowButton
      selected={dayId === 'tomorrow'}
      onClick={() => history.push('/day/tomorrow')}
      {...props}
    >
      <span>Tomorrow</span>

      <Icon icon="chev_right" size={16} />
    </StyledTomorrowButton>
  );
};
