import React from 'react';
import { CSSProp, Flex, Icon } from '@binarycapsule/ui-capsules';
import { useHistory } from 'react-router-dom';
import { StyledTomorrowButton } from './TomorrowButton.styles';
import { useDayRouteParams } from '../../../day/hooks/useDayRouteParams';

export const TomorrowButton: React.FC<CSSProp> = ({ css }) => {
  const history = useHistory();
  const { dayId } = useDayRouteParams();

  return (
    <StyledTomorrowButton
      isSelected={dayId === 'tomorrow'}
      onClick={() => history.push('/day/tomorrow')}
      css={css}
    >
      <Flex as="span" align="center">
        <Icon icon="calendar" variant="outline" size={16} css={{ mr: '$1' }} />
        <span>Next</span>
      </Flex>

      <Icon icon="chev_right" size={16} />
    </StyledTomorrowButton>
  );
};
