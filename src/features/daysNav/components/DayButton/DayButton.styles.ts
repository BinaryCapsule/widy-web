import styled from '@emotion/styled/macro';

export const StyledDayButton = styled.div`
  height: 42px;
  border-radius: 4px;
  border: ${({ theme }) => `1px solid ${theme.colors.neutral['100']}`};
  background: ${({ theme }) => theme.colors.bg};
  font-size: 13px;
  font-weight: 500;
  color: ${props => props.theme.colors.neutral['700']};
  padding: 0 8px 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  flex-shrink: 0;
  user-select: none;

  &:hover {
    border: 1px solid ${props => props.theme.colors.blue['700']};
  }
`;

export const Content = styled.div<{ isToday: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: ${({ isToday }) => isToday && '4px'};
`;

export const StyledInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  &:focus {
    & ~ .day-button {
      outline: none;
      box-shadow: 0 0 0 4px ${props => props.theme.colors.blue['100']};
    }
  }

  &:checked {
    ~ .day-button {
      border: ${({ theme }) => `1px solid ${theme.colors.blue['700']}`};
      background: ${({ theme }) => theme.colors.blue['50']};
    }
  }
`;
