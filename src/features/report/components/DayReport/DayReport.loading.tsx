import React from 'react';
import { Flex, Spinner, Text } from '@binarycapsule/ui-capsules';

export const DayReportLoading = () => {
  return (
    <Flex direction="column" align="center" style={{ margin: '32px auto 0' }}>
      <Spinner variant="dark" />

      <Text variant="smallCaps">Getting Report</Text>
    </Flex>
  );
};
