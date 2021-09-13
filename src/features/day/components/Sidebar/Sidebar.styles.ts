import styled from '@emotion/styled/macro';

export const SidebarWrapper = styled.aside`
  min-width: 360px;
  flex: 1;
  background: ${({ theme }) => theme.colors.yellow['50']};
  padding: 38px 32px;
  border-left: ${({ theme }) => `1px solid ${theme.colors.yellow['100']}`};
`;
