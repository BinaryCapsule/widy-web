import React from 'react';
import { Box, Flex, Spinner, Text } from '@binarycapsule/ui-capsules';
import { DayReportHeader } from './components/DayReportHeader/DayReportHeader';
import { DayReportLoading } from './DayReport.loading';
import { Stats } from './components/Stats/Stats';
import { SectionsChart } from './components/SectionsChart/SectionsChart';
import { TasksTable } from './components/TasksTable/TasksTable';
import { useDayReport } from './useDayReport';
import { IllustrationBoss } from '../../../../img/BossIllustration';

export const DayReport = () => {
  const { isLoading, isFetching, data } = useDayReport();

  return (
    <Box>
      <DayReportHeader />

      {isLoading && <DayReportLoading />}

      {data && data.totalTime === 0 ? (
        <Flex direction="column" align="center" style={{ marginTop: 24 }}>
          <IllustrationBoss size={300} />

          <Text color="neutral500">You have not tracked any time on this day</Text>
        </Flex>
      ) : (
        <Box style={{ marginTop: 24, position: 'relative' }}>
          {isFetching && !isLoading && (
            <Box style={{ position: 'absolute', top: -32, right: 6 }}>
              <Spinner variant="dark" />
            </Box>
          )}

          <Stats data={data} />

          <SectionsChart data={data} />

          <TasksTable data={data} />
        </Box>
      )}
    </Box>
  );
};
