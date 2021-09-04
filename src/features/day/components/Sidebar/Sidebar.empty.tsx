import React from 'react';
import { SidebarContent, SidebarWrapper } from './Sidebar.styles';
import { Flex, Text } from '@binarycapsule/ui-capsules';
import { IllustrationTodoList } from '../../../../img/IllustrationTodoList';

export const SidebarEmpty = () => {
  return (
    <SidebarWrapper>
      <SidebarContent>
        <Flex flexDirection="column" alignItems="center" mt="48">
          <IllustrationTodoList />

          <Text fontWeight={500} color="neutral.500" mt="24">
            Select a task to see more info here
          </Text>
        </Flex>
      </SidebarContent>
    </SidebarWrapper>
  );
};
