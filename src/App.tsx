import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useAuth0 } from '@auth0/auth0-react';
import { SplashScreen } from './components/SplashScreen/SplashScreen';
import { useGlobalStyles } from '@binarycapsule/ui-capsules';
import { NoInternet } from './components/NoInternet/NoInternet';
import { ProtectedRoute } from './auth/protected-route';
import { useEffectOnce } from 'react-use';

const Home = lazy(() => import('./features/landing/Home'));

const Day = lazy(() => import('./features/day/Day'));

const Report = lazy(() => import('./features/report/Report'));

export const App = () => {
  const { isLoading, error } = useAuth0();

  useGlobalStyles();

  // Remove initial splash screen (see index.html)
  useEffectOnce(() => {
    const item = document.getElementById('splash');

    if (item && item.parentNode) {
      item.parentNode.removeChild(item);
    }
  });

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

        <ProtectedRoute exact path="/day/:dayId?/:taskId?" component={Day} />

        <ProtectedRoute exact path="/report/:dayId" component={Report} />
      </Switch>

      <NoInternet />

      <ReactQueryDevtools initialIsOpen={false} />
    </Suspense>
  );
};
