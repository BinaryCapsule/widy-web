import '@binarycapsule/ui-capsules/assets/global.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, theme, ToastContainer, setAppElement } from '@binarycapsule/ui-capsules';
import { App } from './App';
import { Auth0ProviderWithHistory } from './auth/auth0-provider-with-history';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './config/queryClient';

setAppElement('#root');

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <Auth0ProviderWithHistory>
        <ThemeProvider theme={theme}>
          <App />

          <ToastContainer />
        </ThemeProvider>
      </Auth0ProviderWithHistory>
    </Router>
  </QueryClientProvider>,
  document.getElementById('root'),
);
