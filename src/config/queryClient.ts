import { QueryClient } from 'react-query';
import { HttpError } from '../utils/useAuthFetch';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount: number, error: unknown) => {
        if (error && (error as HttpError).response) {
          switch ((error as HttpError).response.statusCode) {
            case 401:
            case 404:
              return false;
          }
        }

        return failureCount <= 3;
      },

      refetchOnWindowFocus: 'always',
      staleTime: Infinity,
      cacheTime: 30 * 60 * 1000,
    },

    mutations: {
      // mutation options
    },
  },
});
