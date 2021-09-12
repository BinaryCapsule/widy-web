import React from 'react';
import { useDayQuery } from '../../api/useDayQuery';
import { SectionsLoading } from './Sections.loading';
import { Section } from '../Section/Section';
import { useDaysQuery } from '../../../daysNav/api/useDaysQuery';

export const Sections: React.FC = () => {
  const { data, isLoading, isError } = useDayQuery();

  const { isLoading: isLoadingDays, isError: isLoadingDaysError } = useDaysQuery();

  if (isLoading || isLoadingDays) {
    return <SectionsLoading />;
  }

  if (isError || isLoadingDaysError) {
    // TODO ➜ Sections error state
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
        return <Section key={sectionId} sectionId={sectionId} />;
      })}
    </div>
  );
};
