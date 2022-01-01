import React from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Route } from 'react-router-dom';
import { SplashScreen } from '../components/SplashScreen/SplashScreen';

interface Props {
  component: React.ComponentType<unknown>;
}

/**
 * ⚠️ Can't be used as is. It causes a mount/re-mount cycle (has some side effects like
 * making the Day buttons loose focus when navigating with the keyboard).
 */
export const ProtectedRoute = ({ component, ...args }: React.PropsWithChildren<Props>) => (
  <Route
    component={withAuthenticationRequired(component, {
      // If using a Hash Router, you need to pass the hash fragment as `returnTo`
      // returnTo: () => window.location.hash.substr(1),
      onRedirecting: () => <SplashScreen />,
    })}
    {...args}
  />
);
