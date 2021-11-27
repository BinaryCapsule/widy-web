import React, { useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, Flex, IconButton, Text } from '@binarycapsule/ui-capsules';
import { IconWidy, IconWidyText } from '../../icons/Widy';
import { useTheme } from '@emotion/react';
import useMedia from 'react-use/lib/useMedia';
import { HeroIllustration } from '../../img/HeroIllustration';

const Home: React.FC = () => {
  const theme = useTheme();

  const history = useHistory();

  const isWide = useMedia('(min-width: 600px)');

  const { loginWithRedirect, isAuthenticated } = useAuth0();

  useLayoutEffect(() => {
    if (isAuthenticated) {
      history.push('/day');
    }
  });

  return (
    <>
      {/* @ts-ignore */}
      <Flex height="100%" maxWidth={800} flexDirection="column" mx="auto" px="32">
        <Flex as="header" justifyContent="flex-end" py="24">
          <Button
            variant="ghost"
            variantColor="neutral"
            leftIcon="login"
            iconVariant="outline"
            onClick={loginWithRedirect}
          >
            Log in
          </Button>
        </Flex>

        <Box as="main" flex={1}>
          <Flex alignItems="flex-end">
            <IconWidy size={isWide ? 90 : 60} yesterdayColor={theme.colors.blue['600']} mr="8" />
            <IconWidyText size={isWide ? 180 : 120} textColor={theme.colors.blue['600']} />
          </Flex>

          <Text fontSize={isWide ? 'h2' : 'h4'} fontWeight={500} mb="8">
            What I did Yesterday?
          </Text>

          <Box maxWidth={500}>
            <Text fontWeight={500}>
              Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Nulla vitae elit libero, a pharetra augue.
            </Text>
          </Box>

          <Box ml={isWide ? -250 : -100} mt={isWide ? -45 : 12}>
            <HeroIllustration width={isWide ? 800 : 500} />
          </Box>
        </Box>

        <Flex as="footer" justifyContent="flex-end" py="24">
          <IconButton
            as="a"
            // @ts-ignore
            href="https://github.com/BinaryCapsule/widy-web"
            variant="ghost"
            variantColor="neutral"
            size="medium"
            icon="github"
            iconVariant="solid"
            aria-label="GitHub link"
          />
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
