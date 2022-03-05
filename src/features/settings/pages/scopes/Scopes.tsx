import React, { useState } from 'react';
import { TopBar } from '../../components/Topbar/TopBar';
import { Main } from '../../components/Main/Main';
import { Box, Button, Input, Spinner } from '@binarycapsule/ui-capsules';
import { ScopesList } from './components/ScopesList/ScopesList';
import { UpsertScope } from '../../../day/components/UpsertScope/UpsertScope';
import { useScopesQuery } from '../../../day/api/useScopesQuery';
import { Actions } from './Scopes.styles';

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

        <Actions>
          <Button
            leftIcon="plus"
            onClick={() => {
              setIsAddScopeModalOpen(true);
            }}
            css={{ width: '100%', '@sm': { width: 'revert', mr: 'auto' } }}
          >
            New scope
          </Button>

          <Input
            leftIcon="search"
            placeholder="Search scopes"
            onChange={evt => {
              setFilter(evt.target.value);
            }}
            css={{ width: '100%', '@sm': { width: 250 } }}
          />
        </Actions>

        <section>
          <ScopesList filter={filter} />
        </section>
      </Main>

      {isAddScopeModalOpen && <UpsertScope onClose={() => setIsAddScopeModalOpen(false)} />}
    </>
  );
};
