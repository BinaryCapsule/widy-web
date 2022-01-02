import React from 'react';
import { Button, Flex } from '@binarycapsule/ui-capsules';
import { BoardTitle } from '../BoardTitle/BoardTitle';
import { useHistory } from 'react-router-dom';
import { useDayRouteParams } from '../../hooks/useDayRouteParams';
import { PageHeader } from '../../../../components/PageHeader/PageHeader';
import { UserMenu } from '../UserMenu/UserMenu';

export const BoardHeader = () => {
  const { dayId } = useDayRouteParams();

  const history = useHistory();

  return (
    <PageHeader>
      <BoardTitle />

      <Flex align="center">
        {dayId && dayId !== 'tomorrow' && (
          <Button
            leftIcon="chart_pie"
            iconVariant="outline"
            variant="ghostGray"
            onClick={() => history.push(`/report/${dayId}`)}
            css={{ mr: '$2' }}
          >
            Report
          </Button>
        )}

        <UserMenu />
      </Flex>
    </PageHeader>
  );
};
