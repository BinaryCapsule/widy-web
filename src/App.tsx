import React, { lazy, Suspense, useLayoutEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { SplashScreen } from './components/SplashScreen/SplashScreen';
import { NoInternet } from './components/NoInternet/NoInternet';
import { version } from '../package.json';

const onRedirecting = () => {
  return <SplashScreen />;
};

const Landing = lazy(() => import('./features/landing/Landing'));

const Day = lazy(() => import('./features/day/Day'));

const Report = lazy(() => import('./features/report/Report'));

const Settings = lazy(() => import('./features/settings/Settings'));

export const App = () => {
  const { isLoading, error } = useAuth0();

  useLayoutEffect(() => {
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
  }, []);

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
          <Route exact path="/" component={Landing} />

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

          <Route
            exact
            path="/settings/:pageId"
            component={withAuthenticationRequired(Settings, { onRedirecting })}
          />
        </Switch>
      </React.StrictMode>

      <NoInternet />

      <ReactQueryDevtools initialIsOpen={false} />
    </Suspense>
  );
};
