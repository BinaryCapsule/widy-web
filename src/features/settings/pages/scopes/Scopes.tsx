import React, { useState } from 'react';
import { TopBar } from '../../compopnents/TopBar/TopBar';
import { Main } from '../../compopnents/Main/Main';
import { Box, Button, Flex, Input, Spinner } from '@binarycapsule/ui-capsules';
import { ScopesList } from './components/ScopesList/ScopesList';
import { UpsertScope } from '../../../day/components/UpsertScope/UpsertScope';
import { useScopesQuery } from '../../../day/api/useScopesQuery';

export const Scopes = () => {
  const [filter, setFilter] = useState('');

  const { isLoading, isFetching } = useScopesQuery();

  const [isAddScopeModalOpen, setIsAddScopeModalOpen] = useState(false);

  return (
    <>
      <Main>
        <TopBar title="Scopes" subTitle="Manage your task scopes below" />

        {isFetching && !isLoading && (
          <Box css={{ position: 'absolute' }}>
            <Spinner variant="dark" />
          </Box>
        )}

        <Flex as="section" css={{ my: '$6' }}>
          <Button
            leftIcon="plus"
            onClick={() => {
              setIsAddScopeModalOpen(true);
            }}
            css={{ mr: 'auto' }}
          >
            New scope
          </Button>

          <Input
            leftIcon="search"
            placeholder="Search scopes"
            onChange={evt => {
              setFilter(evt.target.value);
            }}
            css={{ width: 250 }}
          />
        </Flex>

        <section>
          <ScopesList filter={filter} />
        </section>
      </Main>

      {isAddScopeModalOpen && <UpsertScope onClose={() => setIsAddScopeModalOpen(false)} />}
    </>
  );
};
