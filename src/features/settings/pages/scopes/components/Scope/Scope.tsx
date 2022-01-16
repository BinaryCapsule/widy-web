import React from 'react';
import { Flex, IconButton, Text } from '@binarycapsule/ui-capsules';
import { ScopeDto } from '../../../../../day/api/useScopesQuery';
import { ScopeCode } from '../../../../../../components/ScopeCode/ScopeCode';
import { ScopeContainer } from './Scope.styles';

interface Props {
  scope: ScopeDto;
  onEdit(s: ScopeDto): void;
}

export const Scope: React.FC<Props> = ({ scope, onEdit }) => {
  const { name, shortCode } = scope;

  return (
    <ScopeContainer align="center">
      <ScopeCode>{shortCode}</ScopeCode>

      <Text css={{ flex: 1 }}>{name}</Text>

      <Flex>
        <IconButton
          onClick={() => onEdit(scope)}
          icon="pencil"
          iconVariant="outline"
          size="small"
          variant="ghostGray"
          css={{ mr: '$3' }}
        />
        <IconButton icon="archive" iconVariant="outline" size="small" variant="ghostGray" />
      </Flex>
    </ScopeContainer>
  );
};
