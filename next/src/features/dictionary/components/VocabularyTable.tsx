import { useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTableFilterMeta } from 'primereact/datatable';
import { useOrganizationContext } from '@/features/organization/OrganizationContext';
import {
  AnimalRace,
  AnimalTemper,
  AnimalType,
} from '@/features/animals/types/Animal';
import { VocabularyTypes } from '@/features/dictionary/types/Vocabulary';
import ActionColumn from '@/features/dictionary/components/ActionColumn';
import ActionColumnHeader from '@/features/dictionary/components/ActionColumnHeader';
import Table from '@/ui/atoms/Table';

const tableInitialFilters: DataTableFilterMeta = {
  'organization.id': { value: null, matchMode: FilterMatchMode.CONTAINS },
};

type VocabularyTable = {
  vocabulary: AnimalTemper[] | AnimalRace[] | AnimalType[];
  vocabularyType: VocabularyTypes;
};

const VocabularyTable = (props: VocabularyTable) => {
  const [tableFilters, setTableFilters] =
    useState<DataTableFilterMeta>(tableInitialFilters);

  const { organization } = useOrganizationContext();

  const organizationFilter = (organizationFilterValue: any) => {
    if (organizationFilterValue) {
      setTableFilters(tableInitialFilters);
    } else {
      setTableFilters({
        'organization.id': {
          value: organization?.id,
          matchMode: FilterMatchMode.CONTAINS,
        },
      });
    }
  };

  return (
    <Table
      value={props.vocabulary}
      filters={tableFilters}
      onFilter={(event) => setTableFilters(event.filters)}
      stateKey="vocabulary_table"
    >
      <Column field="name" header="Nom" sortable />
      <Column
        field="organization.id"
        header={(options) => ActionColumnHeader(options, organizationFilter)}
        filter
        showFilterMenu={false}
        body={(data) => ActionColumn(data, props.vocabularyType)}
        className="custom-row-actions"
      />
    </Table>
  );
};

export default VocabularyTable;
