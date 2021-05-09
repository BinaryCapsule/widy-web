import React from 'react';
import { useParams } from 'react-router-dom';
import { DayRouteParams } from '../../../day.types';
import { useDayQuery } from '../../../api/useDayQuery';
import { SectionsLoading } from './Sections.loading';

interface Props {}

export const Sections: React.FC<Props> = () => {
  const { dayId } = useParams<DayRouteParams>();

  const { data, isLoading, isError } = useDayQuery({ dayId });

  if (isLoading) {
    return <SectionsLoading />;
  }

  if (isError) {
    return <div>Sections error</div>;
  }

  if (!data) {
    return null;
  }

  const { entities, result } = data;

  const day = entities.day[result];

  return (
    <div>
      {day.sections.map(sectionId => {
        const section = entities.sections[sectionId];

        return (
          <div key={sectionId}>
            <div>
              <b>{section.title}</b>
            </div>
            {section.tasks.length === 0 ? (
              <div>
                <em>No tasks in section "{section.title}"</em>
              </div>
            ) : (
              section.tasks.map(taskId => {
                const { summary } = entities.tasks[taskId];
                return <div key={taskId}>{summary}</div>;
              })
            )}
          </div>
        );
      })}
    </div>
  );
};
