import styled from '@emotion/styled/macro';

export const SidebarWrapper = styled.aside`
  min-width: 360px;
  flex-grow: 1;
  background: ${({ theme }) => theme.colors.yellow['50']};
  padding: 38px 32px;
  border-left: ${({ theme }) => `1px solid ${theme.colors.yellow['100']}`};
`;

export const SidebarContent = styled.div`
  max-width: 500px;
`;
