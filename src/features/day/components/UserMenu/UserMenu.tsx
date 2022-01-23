import React, { useMemo } from 'react';
import {
  Box,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useTheme,
} from '@binarycapsule/ui-capsules';
import { MenuTrigger } from './components/MenuTrigger/MenuTrigger';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';
import { useDayRouteParams } from '../../hooks/useDayRouteParams';

export const UserMenu = () => {
  const { logout, user } = useAuth0();

  const history = useHistory();

  const { dayId } = useDayRouteParams();

  const { isDark, setTheme } = useTheme();

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  const userInfo = useMemo(() => {
    if (!user) {
      return null;
    }

    const primary = user.name && user.name !== user.email ? user.name : user.nickname;
    const secondary = user.email || user.nickname;

    return {
      primary,
      secondary,
    };
  }, [user]);

  return (
    <Menu>
      <MenuButton as={MenuTrigger} picture={user?.picture} />

      <MenuList>
        {userInfo && (
          <Box css={{ padding: '6px 12px', mt: -8 }}>
            {userInfo.primary && (
              <Text as="p" size={2} css={{ fontWeight: 500 }}>
                {userInfo.primary}
              </Text>
            )}

            {userInfo.secondary && (
              <Text as="p" size={1} css={{ color: '$neutral500' }}>
                {userInfo.secondary}
              </Text>
            )}
          </Box>
        )}

        <MenuItem
          onSelect={() => history.push(`/settings/scopes${dayId ? `?dayId=${dayId}` : ''}`)}
        >
          <Flex align="center">
            <Icon icon="cog" size={18} variant="outline" css={{ color: '$neutral500', mr: '$2' }} />
            Settings
          </Flex>
        </MenuItem>

        <MenuItem onSelect={() => setTheme(isDark ? 'light' : 'dark')}>
          <Flex align="center">
            <Icon
              icon={isDark ? 'sun' : 'moon'}
              size={18}
              variant="outline"
              css={{ color: '$neutral500', mr: '$2' }}
            />
            {isDark ? 'Light theme' : 'Dark theme'}
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
