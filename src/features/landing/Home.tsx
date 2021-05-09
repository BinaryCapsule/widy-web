import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Home: React.FC = () => {
  const history = useHistory();

  const { loginWithRedirect, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/day');
    }
  });

  return (
    <div>
      Hello Home
      <button onClick={() => history.push('/day')}>Go to day</button>
      <button onClick={loginWithRedirect}>Login</button>
    </div>
  );
};

export default Home;
