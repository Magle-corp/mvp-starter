import styled from 'styled-components';
import { Dropdown, DropdownProps } from 'primereact/dropdown';
import { VocabularyTypes } from '@/features/dictionary/types/Vocabulary';

const dropdownOptions = [
  { label: 'Caractère', value: VocabularyTypes.TEMPER },
  { label: 'Race', value: VocabularyTypes.RACE },
  { label: 'Type', value: VocabularyTypes.TYPE },
];

const VocabularyDropdown = (props: DropdownProps) => {
  return (
    <StyledDropdown
      placeholder="type de vocabulaire"
      options={dropdownOptions}
      {...props}
    />
  );
};

const StyledDropdown = styled(Dropdown)`
  width: 230px;
`;

export default VocabularyDropdown;
