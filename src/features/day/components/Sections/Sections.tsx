import React from 'react';
import { useDayQuery } from '../../api/useDayQuery';
import { SectionsLoading } from './Sections.loading';
import { Section } from '../Section/Section';
import { useDayRouteParams } from '../../hooks/useDayRouteParams';

export const Sections: React.FC = () => {
  const { dayId } = useDayRouteParams();

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
        return <Section key={sectionId} sectionId={sectionId} />;
      })}
    </div>
  );
};
