import React from 'react';
import { Flex, IconButton, Text, Tooltip } from '@binarycapsule/ui-capsules';
import { ScopeDto } from '../../../../../day/api/useScopesQuery';
import { ScopeCode } from '../../../../../../components/ScopeCode/ScopeCode';
import { ScopeContainer } from './Scope.styles';

interface Props {
  scope: ScopeDto;
  onEdit(scope: ScopeDto): void;
  onArchive(scopeId: number): void;
}

export const Scope: React.FC<Props> = ({ scope, onEdit, onArchive }) => {
  const { name, shortCode } = scope;

  return (
    <ScopeContainer align="center">
      <ScopeCode>{shortCode}</ScopeCode>

      <Text css={{ flex: 1 }}>{name}</Text>

      <Flex>
        <Tooltip label="Edit">
          <IconButton
            onClick={() => onEdit(scope)}
            icon="pencil"
            iconVariant="outline"
            size="small"
            variant="ghostGray"
            aria-label="Edit"
            css={{ mr: '$3' }}
          />
        </Tooltip>

        <Tooltip label="Archive">
          <IconButton
            onClick={() => onArchive(scope.id)}
            icon="archive"
            iconVariant="outline"
            size="small"
            variant="ghostGray"
            aria-label="Archive"
          />
        </Tooltip>
      </Flex>
    </ScopeContainer>
  );
};
