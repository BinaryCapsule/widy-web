import React from 'react';
import { Button, Flex } from '@binarycapsule/ui-capsules';
import { BoardTitle } from '../BoardTitle/BoardTitle';
import { useHistory } from 'react-router-dom';
import { useDayRouteParams } from '../../hooks/useDayRouteParams';
import { PageHeader } from '../../../../components/PageHeader/PageHeader';
import { UserMenu } from '../UserMenu/UserMenu';
import { useDaysNavStore } from '../../../daysNav/stores/daysNavStore';
import { MenuButton } from './BoardHeader.styles';

export const BoardHeader = () => {
  const { dayId } = useDayRouteParams();

  const history = useHistory();

  const setDaysNavOpen = useDaysNavStore(state => state.setIsOpen);

  return (
    <PageHeader>
      <MenuButton
        icon="menu"
        variant="ghostGray"
        size="small"
        iconVariant="outline"
        onClick={() => setDaysNavOpen(true)}
        aria-label="Open days nav"
      />

      <BoardTitle />

      <Flex $align="center">
        {dayId && dayId !== 'tomorrow' && (
          <Button
            leftIcon="chart_pie"
            iconVariant="outline"
            variant="ghostGray"
            onClick={() => history.push(`/report/${dayId}`)}
            style={{ marginRight: 8 }}
          >
            Report
          </Button>
        )}

        <UserMenu />
      </Flex>
    </PageHeader>
  );
};
