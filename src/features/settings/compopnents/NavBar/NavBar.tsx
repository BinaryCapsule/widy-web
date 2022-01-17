import React from 'react';
import { NavBarStyles, NavHeading, NavItems, StyledNavLink } from './NavBar.styles';
import { Brand } from '../../../daysNav/components/Brand/Brand';
import { useQueryString } from '../../../../hooks/useQueryString';

export const NavBar = () => {
  const queryString = useQueryString();

  const dayId = queryString.get('dayId');

  const getRoute = (pageId: string) => `/settings/${pageId}${dayId ? `?dayId=${dayId}` : ''}`;

  return (
    <NavBarStyles>
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
    </NavBarStyles>
  );
};
