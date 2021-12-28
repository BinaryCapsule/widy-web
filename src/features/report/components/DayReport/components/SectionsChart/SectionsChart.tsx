import React from 'react';
import { DayReportDto } from '../../../../api/useDayReportQuery';

interface Props {
  data?: DayReportDto;
}

export const SectionsChart: React.FC<Props> = ({ data }) => {
  if (!data) {
    return null;
  }

  return <div>Todo</div>;
};
