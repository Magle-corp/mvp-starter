import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { DataTableFilterMeta } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { useBackOfficeContext } from '@/cdn/BackOfficeContext';
import AppPages from '@/cdn/enums/AppPages';
import useGetAnimalTempers from '@/cdn/queries/useGetAnimalTempers';
import useGetAnimalRaces from '@/cdn/queries/useGetAnimalRaces';
import useGetAnimalTypes from '@/cdn/queries/useGetAnimalTypes';
import { useAuthContext } from '@/features/authentication/AuthContext';
import {
  AnimalRace,
  AnimalTemper,
  AnimalType,
} from '@/features/animals/types/Animal';
import { VocabularyTypes } from '@/features/dictionary/types/Vocabulary';
import { errorToast } from '@/features/dictionary/utils/vocabularyService';
import ActionColumn from '@/features/dictionary/components/ActionColumn';
import ActionColumnHeader from '@/features/dictionary/components/ActionColumnHeader';
import VocabularyDropdown from '@/features/dictionary/components/VocabularyDropdown';
import Card from '@/ui/atoms/Card';
import LinkButton from '@/ui/atoms/LinkButton';
import Table from '@/ui/atoms/Table';

const tableInitialFilters: DataTableFilterMeta = {
  'organization.id': { value: null, matchMode: FilterMatchMode.CONTAINS },
};

const VocabularyTableCard = () => {
  const [tableFilters, setTableFilters] =
    useState<DataTableFilterMeta>(tableInitialFilters);
  const [vocabularyType, setVocabularyType] = useState<VocabularyTypes>();
  const [vocabulary, setVocabulary] = useState<
    AnimalTemper[] | AnimalRace[] | AnimalType[]
  >();

  const router = useRouter();
  const { vocabulary: queryVocabularyType } = router.query;
  const { token, organization } = useAuthContext();
  const { toast } = useBackOfficeContext();

  const fetchTableData = (vocabularyType: VocabularyTypes) => {
    setVocabularyType(vocabularyType);

    switch (vocabularyType) {
      case VocabularyTypes.TYPE:
        typesQuery.refetch();
        break;
      case VocabularyTypes.RACE:
        racesQuery.refetch();
        break;
      case VocabularyTypes.TEMPER:
        tempersQuery.refetch();
        break;
    }
  };

  useEffect(() => {
    if (
      !vocabularyType &&
      (queryVocabularyType === VocabularyTypes.TYPE ||
        queryVocabularyType === VocabularyTypes.TEMPER ||
        queryVocabularyType === VocabularyTypes.RACE)
    ) {
      fetchTableData(queryVocabularyType);
    }
  }, [queryVocabularyType, fetchTableData]);

  const tempersQuery = useGetAnimalTempers({
    organizationId: organization?.id,
    token: token?.token,
    enabled: false,
    onSuccess: (data) => setVocabulary(data['hydra:member']),
    onError: () => errorToast(toast),
  });

  const racesQuery = useGetAnimalRaces({
    organizationId: organization?.id,
    token: token?.token,
    enabled: false,
    onSuccess: (data) => setVocabulary(data['hydra:member']),
    onError: () => errorToast(toast),
  });

  const typesQuery = useGetAnimalTypes({
    organizationId: organization?.id,
    token: token?.token,
    enabled: false,
    onSuccess: (data) => setVocabulary(data['hydra:member']),
    onError: () => errorToast(toast),
  });

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

  const Toolbar = (
    <ToolbarWrapper>
      <LinkButton
        label="Ajouter"
        href={
          AppPages.BO_DICTIONARY_CREATE +
          '/' +
          (vocabularyType != undefined ? '?vocabulary=' + vocabularyType : '')
        }
      />
      <VocabularyDropdown
        value={vocabularyType}
        onChange={(event) => fetchTableData(event.value)}
      />
    </ToolbarWrapper>
  );

  const cardDescription = (
    <p>administrez le vocabulaire de votre organisation</p>
  );

  return (
    <Card title="Dictionnaire" description={cardDescription} toolbar={Toolbar}>
      {vocabularyType && vocabulary && (
        <Table
          value={vocabulary}
          filters={tableFilters}
          onFilter={(event) => setTableFilters(event.filters)}
          stateKey="vocabulary_table"
        >
          <Column field="name" header="Nom" sortable />
          {vocabularyType === VocabularyTypes.RACE && (
            <Column field="type.name" header="Type" sortable />
          )}
          <Column
            field="organization.id"
            header={(options) =>
              ActionColumnHeader(options, organizationFilter)
            }
            filter
            showFilterMenu={false}
            body={(data) => ActionColumn(data, vocabularyType)}
            className="custom-row-actions"
          />
        </Table>
      )}
      {!vocabularyType && (
        <Info>Veuillez sélectionner un type de vocabulaire</Info>
      )}
    </Card>
  );
};

const ToolbarWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Info = styled.p`
  font-weight: bold;
  text-align: center;
`;

export default VocabularyTableCard;
