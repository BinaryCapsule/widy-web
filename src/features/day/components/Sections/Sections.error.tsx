import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Flex, Icon, Text } from '@binarycapsule/ui-capsules';
import { OldPcIllustration } from '../../../../img/OldPcIllustration';
import { GENERIC_ERROR_MSG } from '../../../../common/constants';

export const SectionsError = () => {
  const history = useHistory();

  return (
    <Flex direction="column" align="center" css={{ mt: '$8' }}>
      <OldPcIllustration />

      <Flex align="center" css={{ color: '$error600', mt: '$3' }}>
        <Icon icon="exclamation_c" css={{ mr: '$1' }} />

        <Text css={{ color: 'inherit', fontWeight: 500 }}>{GENERIC_ERROR_MSG}</Text>
      </Flex>

      <Button
        variant="ghostGray"
        leftIcon="refresh"
        onClick={() => history.push('/day')}
        css={{ mt: '$3' }}
      >
        Retry
      </Button>
    </Flex>
  );
};
