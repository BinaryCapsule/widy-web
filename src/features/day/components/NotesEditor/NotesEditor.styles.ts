import { Box, styled } from '@binarycapsule/ui-capsules';

export const EditorWrapper = styled(Box, {
  width: '100%',
  height: '100%',
  flex: 1,
  border: '1px solid $neutral400',
  borderRadius: 4,
  overflow: 'hidden',
  minHeight: 250,
  display: 'flex',
  flexDirection: 'column',

  '&:hover': {
    background: '$neutral50',
  },

  '.ProseMirror': {
    flex: 1,
  },
});
