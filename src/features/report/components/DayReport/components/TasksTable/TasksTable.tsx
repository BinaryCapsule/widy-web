import React from 'react';
import { Card, Icon, styled } from '@binarycapsule/ui-capsules';
import { DayReportDto } from '../../../../api/useDayReportQuery';
import { Table } from '../../../../../../components/Table/Table';
import { formatTotalTime } from '../../../../../../utils/time';
import { useTasksTable } from './useTasksTable';

const centerStyles = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: 20,
  height: 20,
  margin: 'auto',
};

const ScopeCell = styled('td', {
  fontWeight: '600 !important',
});

const TaskCell = styled('td', {
  paddingLeft: '$6 !important',
});

interface Props {
  data?: DayReportDto;
}

export const TasksTable: React.FC<Props> = ({ data: dayReport }) => {
  const data = useTasksTable({ data: dayReport });

  if (!data) {
    return null;
  }

  return (
    <Card css={{ margin: '16px 0' }}>
      <Table>
        <colgroup>
          <col width="100%" />
          <col width="0%" />
          <col width="0%" />
        </colgroup>

        <caption style={{ textAlign: 'left', padding: 16 }}>Tasks</caption>

        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Task/Scope</th>

            <th style={{ textAlign: 'center' }}>Completed</th>

            <th style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>Time</th>
          </tr>
        </thead>

        <tbody>
          {data.map(({ id, tasks, scopeTitle, time }) => (
            <React.Fragment key={id}>
              <tr>
                <ScopeCell>{scopeTitle}</ScopeCell>

                <ScopeCell />

                <ScopeCell css={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                  {time !== undefined ? formatTotalTime(time) : ''}
                </ScopeCell>
              </tr>

              {tasks.map(({ id, summary, isDone, time }) => (
                <tr key={id}>
                  <TaskCell>{summary}</TaskCell>

                  <TaskCell style={{ textAlign: 'center', position: 'relative' }}>
                    {isDone && (
                      <Icon icon="check_c" css={{ ...centerStyles, color: '$success500' }} />
                    )}
                  </TaskCell>

                  <TaskCell style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                    {formatTotalTime(time)}
                  </TaskCell>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};
