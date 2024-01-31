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
    <Card style={{ margin: '16px 0' }}>
      <Box style={{ padding: 16 }}>
        <Text as="p" size="lg" style={{ fontWeight: 600, marginBottom: 8 }}>
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
                <Dot backgroundColor={color} style={{ marginRight: 8 }} />
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
