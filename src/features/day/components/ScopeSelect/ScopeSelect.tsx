import { Button, Select } from '@binarycapsule/ui-capsules';
import React from 'react';
import { ScopeOption, useScopesOptions } from '../../api/useScopesQuery';
import { ScopeOptionLabel } from './components/ScopeOptionLabel/ScopeOptionLabel';

interface Props {
  value: ScopeOption
  onChange(opt: ScopeOption): void;
}

export const ScopeSelect: React.FC<Props> = ({ value, onChange }) => {
  // const [isScopesModalOpen, setIsScopesModalOpen] = useState(false);

  const scopesOptions = useScopesOptions();

  return (
    <>
      <Select
        value={value}
        options={scopesOptions}
        onChange={opt => onChange(opt as ScopeOption)}
        isClearable
        placeholder="No scope"
        formatOptionLabel={ScopeOptionLabel}
        // menuPortalTarget={isInsideModal ? document.body : undefined}
        // filterOption={filterScopes}
      />

      <Button
        leftIcon="plus"
        size="small"
        variant="ghost"
        variantColor="neutral"
        onClick={() => {}}
        mt="4"
      >
        Create new scope
      </Button>

      {/*{isScopesModalOpen && (*/}
      {/*  <ScopeModal closeModal={() => setIsScopesModalOpen(false)} onUpsertScope={onChange} />*/}
      {/*)}*/}
    </>
  );
};
