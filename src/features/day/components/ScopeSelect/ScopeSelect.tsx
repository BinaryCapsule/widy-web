import { Button, Select } from '@binarycapsule/ui-capsules';
import React from 'react';
import { ScopeOption, useScopesOptions } from '../../api/useScopesQuery';
import { ScopeOption as ScopeOptionComponent } from './components/ScopeOption/ScopeOption';
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
        label="Scope"
        value={value}
        options={scopesOptions}
        onChange={opt => onChange(opt as ScopeOption | null)}
        isClearable
        placeholder="No scope"
        components={{ Option: ScopeOptionComponent }}
        formatOptionLabel={ScopeOptionLabel}
        menuPortalTarget={document.body}
        filterOption={filterScopes}
      />

      <Button
        leftIcon="plus"
        size="small"
        variant="ghostGray"
        onClick={onCreateScope}
        css={{ mt: '$1' }}
      >
        Create new scope
      </Button>
    </>
  );
};
