import React from 'react';
import { useTheme } from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Button, Flex, Icon, Text } from '@binarycapsule/ui-capsules';
import { OldPcIllustration } from '../../../../img/OldPcIllustration';
import { GENERIC_ERROR_MSG } from '../../../../common/constants';

export const SectionsError = () => {
  const theme = useTheme();

  const history = useHistory();

  return (
    <Flex $direction="column" $align="center" style={{ marginTop: 32 }}>
      <OldPcIllustration />

      <Flex $align="center" style={{ color: theme.colors.error600, marginTop: 12 }}>
        <Icon icon="exclamation_c" style={{ marginRight: 4 }} />

        <Text style={{ color: 'inherit', fontWeight: 500 }}>{GENERIC_ERROR_MSG}</Text>
      </Flex>

      <Button
        variant="ghostGray"
        leftIcon="refresh"
        onClick={() => history.push('/day')}
        style={{ marginTop: 12 }}
      >
        Retry
      </Button>
    </Flex>
  );
};
