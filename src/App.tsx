import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { css, Global } from '@emotion/react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Home } from './features/day/Home';
import { useAuth0 } from '@auth0/auth0-react';
import { Day } from './features/day/Day';
import { ProtectedRoute } from './auth/protected-route';
import { SplashScreen } from './components/SplashScreen/SplashScreen';

export const App = () => {
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <ProtectedRoute exact path="/day/:dayId?/:taskId?" component={Day} />
      </Switch>

      <Global
        styles={css`
          html {
            height: 100%;
          }

          body,
          #root {
            height: 100%;
          }
        `}
      />

      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};
