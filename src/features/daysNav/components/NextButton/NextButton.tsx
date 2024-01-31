import React, { ComponentPropsWithoutRef } from 'react';
import { Flex, Icon } from '@binarycapsule/ui-capsules';
import { useHistory } from 'react-router-dom';
import { StyledNextButton } from './NextButton.styles';
import { useDayRouteParams } from '../../../day/hooks/useDayRouteParams';

interface Props extends Pick<ComponentPropsWithoutRef<'div'>, 'style'> {}

export const NextButton = ({ style }: Props) => {
  const history = useHistory();
  const { dayId } = useDayRouteParams();

  return (
    <StyledNextButton
      $isSelected={dayId === 'tomorrow'}
      onClick={() => history.push('/day/tomorrow')}
      style={style}
    >
      <Flex as="span" align="center">
        <Icon icon="calendar" variant="outline" size={14} style={{ marginRight: 4 }} />
        <span>Next</span>
      </Flex>

      <Icon icon="chev_right" size={16} />
    </StyledNextButton>
  );
};
