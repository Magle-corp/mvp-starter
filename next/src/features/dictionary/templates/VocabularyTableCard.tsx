import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useBackOfficeContext } from '@/cdn/BackOfficeContext';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import AppPages from '@/cdn/enums/AppPages';
import QueryKeys from '@/cdn/enums/QueryKeys';
import useGet from '@/cdn/hooks/useGet';
import { useAuthContext } from '@/features/authentication/AuthContext';
import { useOrganizationContext } from '@/features/organization/OrganizationContext';
import {
  AnimalRace,
  AnimalTemper,
  AnimalType,
} from '@/features/animals/types/Animal';
import vocabularyDropdownOptions from '@/features/dictionary/conf/vocabularyDropdownOptions';
import { VocabularyTypes } from '@/features/dictionary/enums/Vocabulary';
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

  const tempersQuery = useGet<AnimalTemper[]>({
    url: ApiRoutes.ANIMAL_TEMPERS_ORG + '/' + organization?.id,
    token: token?.token ?? undefined,
    key: QueryKeys.ANIMAL_TEMPERS,
    enabled: false,
    onSuccess: (data) => setVocabulary(data['hydra:member']),
    onError: () => errorToast(),
  });

  const racesQuery = useGet<AnimalRace[]>({
    url: ApiRoutes.ANIMAL_RACES_ORG + '/' + organization?.id,
    token: token?.token ?? undefined,
    key: QueryKeys.ANIMAL_RACES,
    enabled: false,
    onSuccess: (data) => setVocabulary(data['hydra:member']),
    onError: () => errorToast(),
  });

  const typesQuery = useGet<AnimalType[]>({
    url: ApiRoutes.ANIMAL_TYPES_ORG + '/' + organization?.id,
    token: token?.token ?? undefined,
    key: QueryKeys.ANIMAL_TYPES,
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
        href={AppPages.BO_DICTIONARY_CREATE + '/any'}
      />
      <VocabularyDropdown
        placeholder="type de vocabulaire"
        value={vocabularyType}
        options={vocabularyDropdownOptions}
        onChange={(event) => setVocabularyType(event.value)}
      />
    </ToolbarWrapper>
  );

  return (
    <Card title="Dictionnaire" toolbar={Toolbar}>
      {vocabularyType && vocabulary && (
        <VocabularyTable
          vocabulary={vocabulary}
          vocabularyType={vocabularyType}
        />
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

export default VocabularyTableCard;
