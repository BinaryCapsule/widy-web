import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { SplashScreen } from './components/SplashScreen/SplashScreen';
import { useGlobalStyles } from '@binarycapsule/ui-capsules';

const onRedirecting = () => {
  return <SplashScreen />;
};

const Home = lazy(() => import('./features/landing/Home'));

const Day = lazy(() => import('./features/day/Day'));

export const App = () => {
  const { isLoading, error } = useAuth0();

  useGlobalStyles();

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

      <ReactQueryDevtools initialIsOpen={false} />
    </Suspense>
  );
};
