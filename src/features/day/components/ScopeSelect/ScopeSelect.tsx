import { Button, Select } from '@binarycapsule/ui-capsules';
import React from 'react';
import { ScopeOption, useScopesOptions } from '../../api/useScopesQuery';
import { ScopeOptionLabel } from './components/ScopeOptionLabel/ScopeOptionLabel';

interface Props {
  value: ScopeOption | null;
  onChange(opt: ScopeOption | null): void;
  onCreateScope(): void;
}

export const ScopeSelect: React.FC<Props> = ({ value, onChange, onCreateScope }) => {
  const scopesOptions = useScopesOptions();

  const filterScopes = (
    { data: { label, shortCode } }: { data: { label: string; shortCode: string } },
    input: string,
  ) => {
    if (input) {
      return (
        label.toLowerCase().includes(input.toLowerCase()) ||
        shortCode.toLowerCase().includes(input.toLowerCase())
      );
    }
    return true;
  };

  return (
    <>
      <Select
        value={value}
        options={scopesOptions}
        onChange={opt => onChange(opt as ScopeOption | null)}
        isClearable
        placeholder="No scope"
        formatOptionLabel={ScopeOptionLabel}
        menuPortalTarget={document.body}
        filterOption={filterScopes}
      />

      <Button
        leftIcon="plus"
        size="small"
        variant="ghost"
        variantColor="neutral"
        onClick={onCreateScope}
        mt="4"
      >
        Create new scope
      </Button>
    </>
  );
};
