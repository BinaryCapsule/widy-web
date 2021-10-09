import React from 'react';
import { Flex, Wrapper as BaseWrapper } from '@binarycapsule/ui-capsules';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import styled from '@emotion/styled/macro';
import { BoardTitle } from '../BoardTitle/BoardTitle';
import { useDayRouteParams } from '../../hooks/useDayRouteParams';

export const Wrapper = styled(BaseWrapper)`
  padding-top: 48px;
  position: sticky;
  align-items: center;
  background: ${({ theme }) => theme.colors.bg};
  top: 0;
  z-index: 1;
`;

export const BoardHeader = () => {
  const { dayId } = useDayRouteParams();

  const history = useHistory();

  const { logout } = useAuth0();

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  return (
    <Wrapper as="header">
      <Flex justifyContent="space-between">
        {dayId === 'tomorrow' ? <div /> : <BoardTitle />}

        <Flex>
          <button onClick={() => history.push('/')}>Go to Home</button>
          <button onClick={logoutWithRedirect}>Log out</button>
        </Flex>
      </Flex>
    </Wrapper>
  );
};
