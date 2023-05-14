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
import { useOrganizationContext } from '@/features/organization/OrganizationContext';
import {
  AnimalRace,
  AnimalTemper,
  AnimalType,
} from '@/features/animals/types/Animal';
import vocabularyDropdownOptions from '@/features/dictionary/conf/vocabularyDropdownOptions';
import { VocabularyTypes } from '@/features/dictionary/types/Vocabulary';
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
  const { query: vocabularyQuery } = router;
  const { token } = useAuthContext();
  const { organization } = useOrganizationContext();
  const { toast } = useBackOfficeContext();

  useEffect(() => {
    if (!vocabularyType) {
      if (vocabularyQuery.vocabulary === VocabularyTypes.TYPE) {
        setVocabularyType(vocabularyQuery.vocabulary);
        typesQuery.refetch();
      } else if (vocabularyQuery.vocabulary === VocabularyTypes.RACE) {
        setVocabularyType(vocabularyQuery.vocabulary);
        racesQuery.refetch();
      } else if (vocabularyQuery.vocabulary === VocabularyTypes.TEMPER) {
        setVocabularyType(vocabularyQuery.vocabulary);
        tempersQuery.refetch();
      }
    } else {
      if (vocabularyType === VocabularyTypes.TYPE) {
        typesQuery.refetch();
      } else if (vocabularyType === VocabularyTypes.RACE) {
        racesQuery.refetch();
      } else if (vocabularyType === VocabularyTypes.TEMPER) {
        tempersQuery.refetch();
      }
      setVocabularyType(vocabularyType);
    }
  }, [vocabularyQuery, vocabularyType]);

  const tempersQuery = useGetAnimalTempers({
    organizationId: organization?.id,
    token: token?.token,
    enabled: false,
    onSuccess: (data) => setVocabulary(data['hydra:member']),
    onError: () => errorToast(),
  });

  const racesQuery = useGetAnimalRaces({
    organizationId: organization?.id,
    token: token?.token,
    enabled: false,
    onSuccess: (data) => setVocabulary(data['hydra:member']),
    onError: () => errorToast(),
  });

  const typesQuery = useGetAnimalTypes({
    organizationId: organization?.id,
    token: token?.token,
    enabled: false,
    onSuccess: (data) => setVocabulary(data['hydra:member']),
    onError: () => errorToast(),
  });

  const errorToast = () =>
    toast.current.show({
      severity: 'error',
      summary: 'Dictionnaire',
      detail: 'Un problème technique est survenu',
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
          (vocabularyType != undefined ? vocabularyType : 'any')
        }
      />
      <VocabularyDropdown
        placeholder="type de vocabulaire"
        value={vocabularyType}
        options={vocabularyDropdownOptions}
        onChange={(event) => setVocabularyType(event.value)}
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
