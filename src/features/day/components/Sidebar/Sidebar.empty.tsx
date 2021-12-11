import React from 'react';
import { SidebarWrapper } from './Sidebar.styles';
import { Flex, Text } from '@binarycapsule/ui-capsules';
import { IllustrationTodoList } from '../../../../img/IllustrationTodoList';

export const SidebarEmpty = () => {
  return (
    <SidebarWrapper>
      <Flex direction="column" align="center" css={{ mt: '$8' }}>
        <IllustrationTodoList />

        <Text
          css={{
            fontWeight: 500,
            color: '$neutral500',
            mt: '$5',
          }}
        >
          Select a task to see more info here
        </Text>
      </Flex>
    </SidebarWrapper>
  );
};
