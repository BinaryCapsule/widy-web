import React from 'react';
import {
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  styled,
} from '@binarycapsule/ui-capsules';
import { useAuth0 } from '@auth0/auth0-react';
import { BoardTitle } from '../BoardTitle/BoardTitle';

export const Wrapper = styled('header', {
  paddingTop: 48,
  position: 'sticky',
  alignItems: 'center',
  background: '$bg',
  top: 0,
  zIndex: 1,
});

const Trigger = styled(Button, {
  '&[data-reach-menu-button][aria-expanded="true"]': {
    bg: '$neutral200',
  },
});

export const BoardHeader = () => {
  const { logout } = useAuth0();

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  return (
    <Wrapper as="header">
      <Flex align="center" justify="between">
        <BoardTitle />

        <Flex>
          <Button
            leftIcon="chart_pie"
            iconVariant="outline"
            variant="ghostGray"
            onClick={() => {}}
            css={{ mr: '$1' }}
          >
            Report
          </Button>

          <Menu>
            <MenuButton
              as={Trigger}
              variant="ghostGray"
              leftIcon="user_circle"
              rightIcon="chev_down"
            />
            <MenuList>
              <MenuItem onSelect={() => {}}>
                <Flex align="center">
                  <Icon
                    icon="cog"
                    size={18}
                    variant="outline"
                    css={{ color: '$neutral500', mr: '$2' }}
                  />
                  Settings
                </Flex>
              </MenuItem>
              <MenuItem onSelect={logoutWithRedirect}>
                <Flex align="center">
                  <Icon
                    icon="logout"
                    size={18}
                    variant="outline"
                    css={{ color: '$neutral500', mr: '$2' }}
                  />
                  Log out
                </Flex>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Wrapper>
  );
};
