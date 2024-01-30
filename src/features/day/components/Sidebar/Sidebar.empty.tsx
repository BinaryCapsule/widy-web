import React from 'react';
import { useTheme } from 'styled-components';
import { Flex, Text } from '@binarycapsule/ui-capsules';
import { SidebarWrapper } from './Sidebar.styles';
import { IllustrationTodoList } from '../../../../img/IllustrationTodoList';

export const SidebarEmpty = () => {
  const theme = useTheme();

  return (
    <SidebarWrapper>
      <Flex direction="column" align="center" style={{ marginTop: 32 }}>
        <IllustrationTodoList />

        <Text
          style={{
            fontWeight: 500,
            color: theme.colors.neutral500,
            marginTop: 20,
          }}
        >
          Select a task to see more info here
        </Text>
      </Flex>
    </SidebarWrapper>
  );
};
