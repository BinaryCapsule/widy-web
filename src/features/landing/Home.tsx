import React, { useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, Flex, IconButton, Text } from '@binarycapsule/ui-capsules';
import { IconWidy, IconWidyText } from '../../icons/Widy';
import useMedia from 'react-use/lib/useMedia';
import { HeroIllustration } from '../../img/HeroIllustration';

const Home = () => {
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
      css={{
        height: '100%',
        maxWidth: 800,
        mx: 'auto',
        px: '$6',
      }}
    >
      <Flex justify="end" css={{ py: '$5' }}>
        <Button
          variant="ghostGray"
          leftIcon="login"
          iconVariant="outline"
          onClick={loginWithRedirect}
        >
          Log in
        </Button>
      </Flex>

      <Box css={{ flex: 1 }}>
        <Flex align="end" css={{ mb: '$2' }}>
          <IconWidy size={isWide ? 90 : 60} yesterdayColor="$blue600" />
          <IconWidyText size={isWide ? 180 : 120} textColor="$blue600" css={{ ml: '$3' }} />
        </Flex>

        <Text size={isWide ? '7' : '5'} css={{ fontWeight: 500, mb: '$2' }}>
          What I did Yesterday?
        </Text>

        <Box css={{ maxWidth: 500 }}>
          <Text css={{ fontWeight: 500 }}>
            Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Nulla vitae elit libero, a pharetra augue.
          </Text>
        </Box>

        <Box css={{ ml: isWide ? -250 : -100, mt: isWide ? -45 : 12 }}>
          <HeroIllustration width={isWide ? 800 : 500} />
        </Box>
      </Box>

      <Flex justify="end" css={{ py: '$5' }}>
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

export default Home;
