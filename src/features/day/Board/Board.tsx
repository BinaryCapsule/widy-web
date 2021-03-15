import React from 'react';
import styled from '@emotion/styled/macro';
import { useHistory, useParams } from 'react-router-dom';
import { useDayQuery } from '../api/useDayQuery';
import { DayRouteParams } from '../day.types';
import { useAuth0 } from '@auth0/auth0-react';

export const BoardWrapper = styled.div`
  display: flex;
  flex-grow: 999;
  max-width: 760px;
`;

export const Board = () => {
  const { dayId } = useParams<DayRouteParams>();

  const { data, isLoading, isIdle, isError, error } = useDayQuery({ dayId });

  const history = useHistory();

  const { logout } = useAuth0();

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  if (isIdle) {
    return <div>Select a day</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error?.message}</div>;
  }

  if (!data) {
    return null;
  }

  const { entities, result } = data;
  const day = entities.day[result];

  return (
    <BoardWrapper>
      <button onClick={() => history.push('/')}>Go to Home</button>
      <button onClick={logoutWithRedirect}>Log out</button>

      <div>{day.day}</div>
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
    </BoardWrapper>
  );
};
