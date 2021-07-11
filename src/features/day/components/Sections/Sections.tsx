import React from 'react';
import { useDayQuery } from '../../api/useDayQuery';
import { SectionsLoading } from './Sections.loading';
import { Section } from '../Section/Section';

export const Sections: React.FC = () => {
  const { data, isFetching, isError } = useDayQuery();

  if (isFetching) {
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
        return <Section key={sectionId} sectionId={sectionId} />;
      })}
    </div>
  );
};
