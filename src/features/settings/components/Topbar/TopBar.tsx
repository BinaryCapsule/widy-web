import { Button, Flex } from '@binarycapsule/ui-capsules';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useQueryString } from '../../../../hooks/useQueryString';
import { PageTitle } from '../../../../components/PageTitle/PageTitle';
import { useNavbarStore } from '../../stores/navbarStore';
import { MenuButton } from './Topbar.styles';

interface Props {
  title: string;
  subTitle?: string;
}

export const TopBar: React.FC<Props> = ({ title, subTitle }) => {
  const history = useHistory();

  const queryString = useQueryString();

  const dayId = queryString.get('dayId');

  const setNavbarOpen = useNavbarStore(state => state.setIsOpen);

  return (
    <Flex as="header" css={{ position: 'relative' }}>
      <MenuButton
        icon="menu"
        variant="ghostGray"
        size="small"
        iconVariant="outline"
        onClick={() => setNavbarOpen(true)}
        aria-label="Open days nav"
      />

      <PageTitle subTitle={subTitle}>{title}</PageTitle>

      <Button
        leftIcon="arrow_c_left"
        variant="ghostGray"
        iconVariant="outline"
        onClick={() => history.push(`/day${dayId ? `/${dayId}` : ''}`)}
        css={{ ml: 'auto' }}
      >
        Exit
      </Button>
    </Flex>
  );
};
