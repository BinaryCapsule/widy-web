import { Box } from '@binarycapsule/ui-capsules';
import styled from '@emotion/styled/macro';

export const EditorWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  flex: 1,
  border: `1px solid ${theme.colors.neutral['400']}`,
  borderRadius: 4,
  overflow: 'hidden',
  minHeight: 250,
  display: 'flex',
  flexDirection: 'column',

  '&:hover': {
    background: theme.colors.neutral['50'],
  },

  '.ProseMirror': {
    flex: 1,
  },
}));
