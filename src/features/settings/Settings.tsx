import React from 'react';
import { Flex } from '@binarycapsule/ui-capsules';
import { Route, Switch } from 'react-router-dom';
import { NavBar } from './compopnents/NavBar/NavBar';
import { Scopes } from './pages/Scopes';
import { Sidebar } from './compopnents/Sidebar/Sidebar';

const Settings = () => {
  return (
    <Flex css={{ height: '100%' }}>
      <NavBar />

      <Switch>
        <Route path="/settings/scopes">
          <Scopes />
        </Route>
      </Switch>

      <Sidebar />
    </Flex>
  );
};

export default Settings;
