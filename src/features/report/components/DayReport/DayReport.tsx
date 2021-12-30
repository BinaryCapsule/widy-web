import React from 'react';
import { Box, Spinner } from '@binarycapsule/ui-capsules';
import { DayReportHeader } from './components/DayReportHeader/DayReportHeader';
import { useDayReportQuery } from '../../api/useDayReportQuery';
import { DayReportLoading } from './DayReport.loading';
import { Stats } from './components/Stats/Stats';
import { SectionsChart } from './components/SectionsChart/SectionsChart';

export const DayReport = () => {
  const { isLoading, isFetching, data } = useDayReportQuery();

  return (
    <Box css={{ position: 'relative' }}>
      <DayReportHeader />

      {isFetching && !isLoading && (
        <Box css={{ position: 'absolute' }}>
          <Spinner variant="dark" />
        </Box>
      )}

      {isLoading && <DayReportLoading />}

      <Stats data={data} />

      <SectionsChart data={data} />
    </Box>
  );
};
