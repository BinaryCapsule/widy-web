import React from 'react';
import { Flex } from '@binarycapsule/ui-capsules';
import { Route, Switch } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { Scopes } from './pages/scopes/Scopes';
import { Sidebar } from './components/Sidebar/Sidebar';

const Settings = () => {
  return (
    <Flex css={{ height: '100%' }}>
      <Navbar />

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
