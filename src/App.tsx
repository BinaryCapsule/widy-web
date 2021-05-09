import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { css, Global } from '@emotion/react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { SplashScreen } from './components/SplashScreen/SplashScreen';

const onRedirecting = () => {
  return <SplashScreen />;
};

const Home = lazy(() => import('./features/landing/Home'));

const Day = lazy(() => import('./features/day/Day'));

export const App = () => {
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Suspense fallback={<SplashScreen />}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/day/:dayId?/:taskId?"
          component={withAuthenticationRequired(Day, { onRedirecting })}
        />
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
    </Suspense>
  );
};
