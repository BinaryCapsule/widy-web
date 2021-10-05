import styled from '@emotion/styled/macro';
import { margin } from 'styled-system';
import { MarginProps } from '@binarycapsule/ui-capsules/dist/styledProps';

interface StyledTomorrowButtonProps extends MarginProps {
  selected: boolean;
}

export const StyledTomorrowButton = styled.button<StyledTomorrowButtonProps>`
  height: 32px;
  border-radius: 4px;
  border: ${({ theme }) => `1px dashed ${theme.colors.pink['200']}`};
  background: ${({ theme, selected }) => (selected ? theme.colors.pink['50'] : theme.colors.bg)};
  font-size: 13px;
  font-weight: 500;
  color: ${props => props.theme.colors.pink['700']};
  padding: 0 8px 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  flex-shrink: 0;
  user-select: none;

  &:hover {
    border: 1px dashed ${props => props.theme.colors.pink['700']};
  }

  ${margin}
`;
