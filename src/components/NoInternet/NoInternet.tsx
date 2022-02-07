import React from 'react';
import { Offline } from 'react-detect-offline';
import { Flex, IllustratedIcon, Modal, Text } from '@binarycapsule/ui-capsules';

export const NoInternet = () => {
  return (
    <Offline>
      <Modal contentLabel="Offline-modal" isOpen size="small">
        <Flex direction="column" align="center" css={{ p: '$5', pt: '$3' }}>
          <IllustratedIcon
            icon="wifi_off"
            primaryColor="$neutral300"
            secondaryColor="$error500"
            size={138}
          />

          <Text size="lg" css={{ fontWeight: 500 }}>
            No internet connection!
          </Text>

          <Text variant="helper" css={{ textAlign: 'center', mt: '$2', px: '$6' }}>
            Please, make sure you have an internet connection to continue using Widy
          </Text>
        </Flex>
      </Modal>
    </Offline>
  );
};
