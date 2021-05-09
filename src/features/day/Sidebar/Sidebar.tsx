import React from 'react';
import styled from '@emotion/styled/macro';

export const SidebarWrapper = styled.div`
  min-width: 360px;
  flex-grow: 1;
  background: ${({ theme }) => theme.colors.yellow['50']};
`;

interface Props {}

export const Sidebar: React.FC<Props> = () => {
  return <SidebarWrapper>Hello Sidebar</SidebarWrapper>;
};
