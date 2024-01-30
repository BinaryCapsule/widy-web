import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { UiCaps } from '@binarycapsule/ui-capsules';
import { App } from './App';
import { Auth0ProviderWithHistory } from './auth/auth0-provider-with-history';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './config/queryClient';

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <Auth0ProviderWithHistory>
        <UiCaps>
          <App />
        </UiCaps>
      </Auth0ProviderWithHistory>
    </Router>
  </QueryClientProvider>,
  document.getElementById('root'),
);
