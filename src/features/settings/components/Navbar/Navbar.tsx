import React from 'react';
import { NavHeading, NavItems, StyledNavbar, StyledNavLink } from './Navbar.styles';
import { Brand } from '../../../daysNav/components/Brand/Brand';
import { useQueryString } from '../../../../hooks/useQueryString';
import { useNavbarStore } from '../../stores/navbarStore';
import { CloseButton } from '../../../daysNav/DaysNav.styles';
import { Overlay } from '../../../../components/Overlay/Overlay';

export const Navbar = () => {
  const queryString = useQueryString();

  const dayId = queryString.get('dayId');

  const getRoute = (pageId: string) => `/settings/${pageId}${dayId ? `?dayId=${dayId}` : ''}`;

  const isOpen = useNavbarStore(state => state.isOpen);
  const setNavbarOpen = useNavbarStore(state => state.setIsOpen);

  return (
    <>
      {isOpen && (
        <Overlay onClick={() => setNavbarOpen(false)} css={{ '@md': { display: 'none' } }} />
      )}

      <StyledNavbar isOpen={isOpen}>
        <CloseButton
          icon="x"
          variant="ghostGray"
          size="small"
          onClick={() => setNavbarOpen(false)}
          aria-label="Close"
        />

        <Brand style={{ marginBottom: 20 }} />

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
    </>
  );
};
