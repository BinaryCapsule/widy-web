import React from 'react';
import { NavHeading, NavItems, StyledNavbar, StyledNavLink } from './Navbar.styles';
import { Brand } from '../../../daysNav/components/Brand/Brand';
import { useQueryString } from '../../../../hooks/useQueryString';
import { useNavbarStore } from '../../stores/navbarStore';
import { CloseButton } from '../../../daysNav/DaysNav.styles';

export const Navbar = () => {
  const queryString = useQueryString();

  const dayId = queryString.get('dayId');

  const getRoute = (pageId: string) => `/settings/${pageId}${dayId ? `?dayId=${dayId}` : ''}`;

  const isOpen = useNavbarStore(state => state.isOpen);
  const setNavbarOpen = useNavbarStore(state => state.setIsOpen);

  return (
    <StyledNavbar isOpen={isOpen}>
      <CloseButton
        icon="x"
        variant="ghostGray"
        size="small"
        onClick={() => setNavbarOpen(false)}
        aria-label="Close"
      />

      <Brand css={{ mb: '$5' }} />

      <nav>
        <NavHeading>Settings</NavHeading>

        <NavItems>
          <li>
            <StyledNavLink to={getRoute('scopes')} activeClassName="active">
              Scopes
            </StyledNavLink>
          </li>
        </NavItems>
      </nav>
    </StyledNavbar>
  );
};
