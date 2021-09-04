import styled from '@emotion/styled/macro';

export const SidebarWrapper = styled.aside`
  min-width: 360px;
  flex-grow: 1;
  background: ${({ theme }) => theme.colors.yellow['50']};
  padding: 48px 32px;
`;

export const SidebarContent = styled.div`
  max-width: 500px;
`;
