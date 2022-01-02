import React from 'react';
import {
  Box,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@binarycapsule/ui-capsules';
import { MenuTrigger } from './components/MenuTrigger/MenuTrigger';
import { useAuth0 } from '@auth0/auth0-react';

export const UserMenu = () => {
  const { logout, user } = useAuth0();

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  return (
    <Menu>
      <MenuButton as={MenuTrigger} picture={user?.picture} />

      <MenuList>
        {user?.name && (
          <Box css={{ padding: '6px 12px', mt: -8 }}>
            <Text size={1} css={{ fontWeight: 500 }}>
              {user.name}
            </Text>
          </Box>
        )}

        <MenuItem
          onSelect={() => {
            /* noop */
          }}
        >
          <Flex align="center">
            <Icon icon="cog" size={18} variant="outline" css={{ color: '$neutral500', mr: '$2' }} />
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
  );
};
