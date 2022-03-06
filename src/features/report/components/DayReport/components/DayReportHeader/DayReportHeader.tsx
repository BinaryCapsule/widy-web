import React from 'react';
import { Button } from '@binarycapsule/ui-capsules';
import { PageHeader } from '../../../../../../components/PageHeader/PageHeader';
import { PageTitle } from '../../../../../../components/PageTitle/PageTitle';
import { useReportRouteParams } from '../../../../hooks/useReportRouteParams';
import { useDayRouteNavigate } from '../../../../../day/hooks/useDayRouteNavigate';
import { useDayReportQuery } from '../../../../api/useDayReportQuery';
import { formatDay } from '../../../../../../utils/dates';
import { MenuButton } from './DayReportHeader.styles';
import { useDaysNavStore } from '../../../../../daysNav/stores/daysNavStore';

export const DayReportHeader = () => {
  const { dayId } = useReportRouteParams();

  const { navigate } = useDayRouteNavigate();

  const { data } = useDayReportQuery();

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

      <PageTitle subTitle={data ? formatDay(data.day) : undefined}>Report</PageTitle>

      <Button
        leftIcon="arrow_c_left"
        variant="ghostGray"
        iconVariant="outline"
        onClick={() => navigate({ dayId })}
      >
        Exit Report
      </Button>
    </PageHeader>
  );
};
