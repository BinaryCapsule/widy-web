import React from 'react';
import { Offline } from 'react-detect-offline';
import { Flex, IllustratedIcon, Modal, Text } from '@binarycapsule/ui-capsules';

export const NoInternet = () => {
  return (
    <Offline>
      <Modal contentLabel="Offline-modal" isOpen size="small">
        <Flex direction="column" align="center" style={{ padding: 20, paddingTop: 12 }}>
          <IllustratedIcon
            icon="wifi_off"
            primaryColor="neutral300"
            secondaryColor="error500"
            size={138}
          />

          <Text size="lg" style={{ fontWeight: 500 }}>
            No internet connection!
          </Text>

          <Text variant="helper" style={{ textAlign: 'center', marginTop: 8, padding: '0 24px' }}>
            Please, make sure you have an internet connection to continue using Widy
          </Text>
        </Flex>
      </Modal>
    </Offline>
  );
};
