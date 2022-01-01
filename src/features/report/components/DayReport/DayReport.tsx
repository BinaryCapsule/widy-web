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
    <Box css={{ position: 'relative' }}>
      <DayReportHeader />

      {isFetching && !isLoading && (
        <Box css={{ position: 'absolute' }}>
          <Spinner variant="dark" />
        </Box>
      )}

      {isLoading && <DayReportLoading />}

      {data && data.totalTime === 0 ? (
        <Flex direction="column" align="center" css={{ mt: '$6' }}>
          <IllustrationBoss size={300} />

          <Text css={{ color: '$neutral500' }}>You have not tracked any time on this day</Text>
        </Flex>
      ) : (
        <>
          <Stats data={data} />

          <SectionsChart data={data} />

          <TasksTable data={data} />
        </>
      )}
    </Box>
  );
};
