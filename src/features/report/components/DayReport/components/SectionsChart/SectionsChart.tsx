import React from 'react';
import { Box, Card, Text } from '@binarycapsule/ui-capsules';
import { StackedBar } from '../../../../../../components/charts/StackedBar/StackedBar';
import { Table } from '../../../../../../components/Table/Table';
import { Dot } from '../../../../../../components/Dot/Dot';
import { useSectionsChart } from './useSectionsChart';
import { DayReportDto } from '../../../../api/useDayReportQuery';
import { formatTotalTime } from '../../../../../../utils/time';

interface Props {
  data?: DayReportDto;
}

export const SectionsChart: React.FC<Props> = ({ data: dayReport }) => {
  const data = useSectionsChart({ data: dayReport });

  if (!data) {
    return null;
  }

  return (
    <Card css={{ my: '$4' }}>
      <Box css={{ padding: '$4' }}>
        <Text as="p" size="md" css={{ fontWeight: 600, mb: '$2' }}>
          Sections
        </Text>

        <StackedBar data={data} formatter={val => formatTotalTime(val)} />
      </Box>

      <Table>
        <colgroup>
          <col width="100%" />
          <col width="0%" />
        </colgroup>

        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Section</th>
            <th style={{ textAlign: 'right' }}>Time</th>
          </tr>
        </thead>

        <tbody>
          {data.map(({ color, value, label }) => (
            <tr key={label}>
              <td style={{ textAlign: 'left', display: 'flex', alignItems: 'center' }}>
                <Dot backgroundColor={color} css={{ mr: '$2' }} />
                {label}
              </td>

              <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>{formatTotalTime(value)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};
