import React, { useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, Flex, IconButton, Text } from '@binarycapsule/ui-capsules';
import { IconWidy, IconWidyText } from '../../icons/Widy';
import useMedia from 'react-use/lib/useMedia';
import { StyledHeroIllustration } from './Landing.styles';

const Landing = () => {
  const history = useHistory();

  const isWide = useMedia('(min-width: 600px)');

  const { loginWithRedirect, isAuthenticated } = useAuth0();

  useLayoutEffect(() => {
    if (isAuthenticated) {
      history.push('/day');
    }
  }, [history, isAuthenticated]);

  return (
    <Flex
      direction="column"
      style={{
        height: '100%',
        maxWidth: 800,
        margin: '0 auto',
        padding: '0 24px',
      }}
    >
      <Flex justify="end" style={{ padding: '20px 0' }}>
        <Button
          variant="ghostGray"
          leftIcon="login"
          iconVariant="outline"
          onClick={loginWithRedirect}
        >
          Log in
        </Button>

        {import.meta.env.VITE_SIGNUP_ENABLED === 'true' && (
          <Button
            variant="secondary"
            onClick={() => loginWithRedirect({ screen_hint: 'signup' })}
            style={{ marginLeft: 8 }}
          >
            Sign up
          </Button>
        )}
      </Flex>

      <Box style={{ flex: 1, position: 'relative' }}>
        <Flex align="end" style={{ marginBottom: 8 }}>
          <IconWidy size={isWide ? 90 : 60} />
          <IconWidyText size={isWide ? 180 : 120} style={{ marginLeft: 12 }} />
        </Flex>

        <Text size={isWide ? '4xl' : '2xl'} style={{ fontWeight: 500, marginBottom: 8 }}>
          What I did Yesterday?
        </Text>

        <StyledHeroIllustration />
      </Box>

      <Flex justify="end" style={{ padding: '20px 0' }}>
        <IconButton
          as="a"
          href="https://github.com/BinaryCapsule/widy-web"
          variant="ghostGray"
          size="medium"
          icon="github"
          iconVariant="solid"
          aria-label="GitHub link"
        />
      </Flex>
    </Flex>
  );
};

export default Landing;
