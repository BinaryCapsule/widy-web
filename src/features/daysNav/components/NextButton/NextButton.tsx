import React from 'react';
import { CSSProp, Flex, Icon } from '@binarycapsule/ui-capsules';
import { useHistory } from 'react-router-dom';
import { StyledNextButton } from './NextButton.styles';
import { useDayRouteParams } from '../../../day/hooks/useDayRouteParams';

export const NextButton: React.FC<CSSProp> = ({ css }) => {
  const history = useHistory();
  const { dayId } = useDayRouteParams();

  return (
    <StyledNextButton
      isSelected={dayId === 'tomorrow'}
      onClick={() => history.push('/day/tomorrow')}
      css={css}
    >
      <Flex as="span" align="center">
        <Icon icon="calendar" variant="outline" size={14} css={{ mr: '$1' }} />
        <span>Next</span>
      </Flex>

      <Icon icon="chev_right" size={16} />
    </StyledNextButton>
  );
};
