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
import { useHistory } from 'react-router-dom';
import { useDayRouteParams } from '../../hooks/useDayRouteParams';
import { PageHeader } from '../../../../components/PageHeader/PageHeader';

const Trigger = styled(Button, {
  '&[data-reach-menu-button][aria-expanded="true"]': {
    bg: '$neutral200',
  },
});

export const BoardHeader = () => {
  const { logout } = useAuth0();

  const { dayId } = useDayRouteParams();

  const history = useHistory();

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  return (
    <PageHeader>
      <BoardTitle />

      <Flex>
        {dayId && dayId !== 'tomorrow' && (
          <Button
            leftIcon="chart_pie"
            iconVariant="outline"
            variant="ghostGray"
            onClick={() => history.push(`/report/${dayId}`)}
            css={{ mr: '$1' }}
          >
            Report
          </Button>
        )}

        <Menu>
          <MenuButton
            as={Trigger}
            variant="ghostGray"
            leftIcon="user_circle"
            rightIcon="chev_down"
          />
          <MenuList>
            <MenuItem
              onSelect={() => {
                /* noop */
              }}
            >
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
    </PageHeader>
  );
};
