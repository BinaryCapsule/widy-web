import React from 'react';
import { Flex, Wrapper as BaseWrapper } from '@binarycapsule/ui-capsules';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import styled from '@emotion/styled/macro';
import { BoardTitle } from '../BoardTitle/BoardTitle';

export const Wrapper = styled(BaseWrapper)`
  padding-top: 48px;
  position: sticky;
  align-items: center;
  background: ${({ theme }) => theme.colors.bg};
  top: 0;
  z-index: 1;
`;

interface Props {}

export const BoardHeader: React.FC<Props> = () => {
  const history = useHistory();

  const { logout } = useAuth0();

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  return (
    <Wrapper as="header">
      <Flex justifyContent="space-between">
        <BoardTitle />

        <Flex>
          <button onClick={() => history.push('/')}>Go to Home</button>
          <button onClick={logoutWithRedirect}>Log out</button>
        </Flex>
      </Flex>
    </Wrapper>
  );
};
