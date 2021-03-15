import React from 'react';
import { useTheme } from '@emotion/react';
import { Flex } from '@binarycapsule/ui-capsules';
import { IconWidy, IconWidyText } from '../../../../icons/Widy';
import { MarginProps } from '@binarycapsule/ui-capsules/dist/styledProps';

export const Brand: React.FC<MarginProps> = props => {
  const theme = useTheme();

  return (
    <Flex alignItems="flex-end" {...props}>
      <IconWidy size={30} yesterdayColor={theme.colors.blue['600']} mr="8" />

      <IconWidyText size={60} textColor={theme.colors.blue['600']} />
    </Flex>
  );
};
