import styled from '@emotion/styled/macro';

export const DaysNavWrapper = styled.div`
  width: 254px;
  height: 100%;
  flex-shrink: 0;
  padding: 48px 24px 24px;
  background: ${props => props.theme.colors.neutral['50']};
  border-right: 1px solid ${({ theme }) => theme.colors.neutral['100']};
  display: flex;
  flex-direction: column;
`;
