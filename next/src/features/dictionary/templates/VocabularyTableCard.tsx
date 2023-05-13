import { useEffect, useState } from 'react';
import styled from 'styled-components';
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
import VocabularyDropdown from '@/features/dictionary/components/VocabularyDropdown';
import VocabularyTable from '@/features/dictionary/components/VocabularyTable';
import Card from '@/ui/atoms/Card';
import LinkButton from '@/ui/atoms/LinkButton';

const VocabularyTableCard = () => {
  const [vocabularyType, setVocabularyType] = useState<VocabularyTypes>();
  const [vocabulary, setVocabulary] = useState<
    AnimalTemper[] | AnimalRace[] | AnimalType[]
  >();

  const { token } = useAuthContext();
  const { organization } = useOrganizationContext();
  const { toast } = useBackOfficeContext();

  useEffect(() => {
    switch (vocabularyType) {
      case VocabularyTypes.TEMPER:
        tempersQuery.refetch();
        break;
      case VocabularyTypes.RACE:
        racesQuery.refetch();
        break;
      case VocabularyTypes.TYPE:
        typesQuery.refetch();
        break;
    }
  }, [vocabularyType]);

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
        <VocabularyTable
          vocabulary={vocabulary}
          vocabularyType={vocabularyType}
        />
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
