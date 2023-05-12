import { useState } from 'react';
import styled from 'styled-components';
import { FilterMatchMode } from 'primereact/api';
import { Checkbox } from 'primereact/checkbox';
import { Column, ColumnHeaderOptions } from 'primereact/column';
import { DataTableFilterMeta } from 'primereact/datatable';
import AppPages from '@/cdn/enums/AppPages';
import { useOrganizationContext } from '@/features/organization/OrganizationContext';
import { AnimalRace, AnimalTemper } from '@/features/animals/types/Animal';
import { VocabularyTypes } from '@/features/dictionary/types/Dictionary';
import Chip from '@/ui/atoms/Chip';
import LinkButton from '@/ui/atoms/LinkButton';
import Table from '@/ui/atoms/Table';

const tableInitialFilters: DataTableFilterMeta = {
  'organization.id': { value: null, matchMode: FilterMatchMode.CONTAINS },
};

type VocabularyTable = {
  vocabulary: AnimalTemper[] | AnimalRace[];
  vocabularyType: VocabularyTypes;
};

const VocabularyTable = (props: VocabularyTable) => {
  const [tableFilters, setTableFilters] =
    useState<DataTableFilterMeta>(tableInitialFilters);

  const { organization } = useOrganizationContext();

  const rowActionsHeader = (options: ColumnHeaderOptions) => {
    const temperOrganizationFilterValue =
      options.props.filters['organization.id'].value;

    const setTemperOrganizationFilter = () => {
      if (temperOrganizationFilterValue) {
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
      <ColumnHeaderWrapper>
        <p>Vocabulaires public</p>
        <Checkbox
          checked={!temperOrganizationFilterValue}
          onChange={setTemperOrganizationFilter}
        />
      </ColumnHeaderWrapper>
    );
  };

  const rowActionsBody = (data: AnimalTemper) => {
    return (
      <>
        {data.organization && (
          <LinkButton
            href={
              AppPages.BO_DICTIONARY_UPDATE +
              '/' +
              props.vocabularyType +
              '/' +
              data.id
            }
            icon="pi pi-pencil"
          />
        )}
        {!data.organization && <Chip label="public" />}
      </>
    );
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
        header={rowActionsHeader}
        filter
        showFilterMenu={false}
        body={rowActionsBody}
        className="custom-row-actions"
      />
    </Table>
  );
};

const ColumnHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: auto;
`;

export default VocabularyTable;
