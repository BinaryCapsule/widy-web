import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { SplashScreen } from './components/SplashScreen/SplashScreen';
import { useGlobalStyles } from '@binarycapsule/ui-capsules';
import { NoInternet } from './components/NoInternet/NoInternet';
import { useEffectOnce } from 'react-use';
import { version } from '../package.json';

const onRedirecting = () => {
  return <SplashScreen />;
};

const Home = lazy(() => import('./features/landing/Home'));

const Day = lazy(() => import('./features/day/Day'));

const Report = lazy(() => import('./features/report/Report'));

export const App = () => {
  const { isLoading, error } = useAuth0();

  useGlobalStyles();

  useEffectOnce(() => {
    // Remove initial splash screen (see index.html)
    const item = document.getElementById('splash');

    if (item && item.parentNode) {
      item.parentNode.removeChild(item);
    }

    // Add app version to the root element
    const root = document.getElementById('root');

    if (root) {
      root.dataset.version = version;
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
      <React.StrictMode>
        <Switch>
          <Route exact path="/" component={Home} />

          <Route
            exact
            path="/day/:dayId?/:taskId?"
            component={withAuthenticationRequired(Day, { onRedirecting })}
          />

          <Route
            exact
            path="/report/:dayId"
            component={withAuthenticationRequired(Report, { onRedirecting })}
          />
        </Switch>
      </React.StrictMode>

      <NoInternet />

      <ReactQueryDevtools initialIsOpen={false} />
    </Suspense>
  );
};
