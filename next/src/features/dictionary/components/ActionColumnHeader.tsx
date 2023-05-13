import styled from 'styled-components';
import { ColumnHeaderOptions } from 'primereact/column';
import { Checkbox } from 'primereact/checkbox';

const ActionColumnHeader = (
  options: ColumnHeaderOptions,
  organizationFilter: Function
) => {
  const organizationFilterValue =
    options.props.filters['organization.id'].value;

  return (
    <ColumnHeaderWrapper>
      <p>Vocabulaires public</p>
      <Checkbox
        checked={!organizationFilterValue}
        onChange={() => organizationFilter(organizationFilterValue)}
      />
    </ColumnHeaderWrapper>
  );
};

const ColumnHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: auto;
`;

export default ActionColumnHeader;
