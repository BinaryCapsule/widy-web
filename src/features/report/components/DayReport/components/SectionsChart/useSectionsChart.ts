import { DayReportDto } from '../../../../api/useDayReportQuery';
import { SERIES_COLORS } from '../../../../../../common/constants';
import { useTheme } from 'styled-components';

export const timePerSection = (data: DayReportDto) => {
  const { tasks, sections } = data;

  return tasks.reduce((acc, { sectionId, time }) => {
    if (acc[sectionId]) {
      // eslint-disable-next-line no-param-reassign
      acc[sectionId].time += time;
      acc[sectionId].taskCount += 1;
    } else {
      const section = sections.find(({ id }) => id === sectionId);

      // eslint-disable-next-line no-param-reassign
      acc[sectionId] = {
        title: section?.title || '',
        time,
        taskCount: 1,
      };
    }
    return acc;
  }, {} as Record<string, { title: string; time: number; taskCount: number }>);
};

interface SectionsChartParam {
  data?: DayReportDto;
}

export const useSectionsChart = ({ data }: SectionsChartParam) => {
  const theme = useTheme();

  if (!data) {
    return null;
  }

  const sectionsTime = timePerSection(data);

  return Object.values(sectionsTime).map(({ title, time, taskCount }, index) => ({
    label: title,
    value: time,
    color: theme.colors[SERIES_COLORS[index % SERIES_COLORS.length]],
    taskCount,
  }));
};
