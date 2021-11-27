import React from 'react';
import { Button, Flex, Menu, MenuItem, Wrapper as BaseWrapper } from '@binarycapsule/ui-capsules';
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

  const { logout } = useAuth0();

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  return (
    <Wrapper as="header">
      <Flex alignItems="center" justifyContent="space-between">
        {dayId === 'tomorrow' ? <div /> : <BoardTitle />}

        <Flex>
          <Button
            leftIcon="chart_pie"
            iconVariant="outline"
            variant="ghost"
            variantColor="neutral"
            onClick={() => {}}
            mr="4"
          >
            Report
          </Button>

          <Menu
            placement="left"
            trigger={
              <Button
                leftIcon="user_circle"
                rightIcon="chev_down"
                variant="ghost"
                variantColor="neutral"
                aria-label="User menu"
              />
            }
          >
            <MenuItem text="Settings" leftIcon="cog" onClick={() => {}} />

            <MenuItem
              text="Log out"
              leftIcon="logout"
              onClick={logoutWithRedirect}
              closeOnAction={false}
            />
          </Menu>
        </Flex>
      </Flex>
    </Wrapper>
  );
};
