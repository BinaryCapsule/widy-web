import { useAuth0 } from '@auth0/auth0-react';
import merge from 'lodash/merge';

export interface HttpErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}

export class HttpError extends Error {
  // eslint-disable-next-line no-undef
  public response: HttpErrorResponse;

  // eslint-disable-next-line no-undef
  constructor(response: HttpErrorResponse) {
    super(response.message);

    this.response = response;
  }
}

export const GENERIC_ERROR_MESSAGE =
  'There was a problem completing your request. Please try again later.';

export const useAuthFetch = () => {
  const { getAccessTokenSilently } = useAuth0();

  const authFetch = async (url: string, init?: RequestInit) => {
    const accessToken = await getAccessTokenSilently();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}${url}`,
        merge(init, {
          headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        }),
      );

      const jsonResponse = await response.json();

      if (response.ok) {
        return jsonResponse;
      }

      switch (response.status) {
        case 401:
          console.log('Got 401');
      }

      throw new HttpError(jsonResponse);
    } catch (error) {
      console.error(error.message);

      if (error instanceof HttpError) {
        throw error;
      }

      throw new HttpError({
        statusCode: 500,
        message: GENERIC_ERROR_MESSAGE,
        error: 'Failed to fetch',
      });
    }
  };

  return {
    authFetch,
  };
};
