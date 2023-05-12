import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useBackOfficeContext } from '@/cdn/BackOfficeContext';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import AppPages from '@/cdn/enums/AppPages';
import QueryKeys from '@/cdn/enums/QueryKeys';
import useGet from '@/cdn/hooks/useGet';
import { useAuthContext } from '@/features/authentication/AuthContext';
import { useOrganizationContext } from '@/features/organization/OrganizationContext';
import { AnimalRace, AnimalTemper } from '@/features/animals/types/Animal';
import vocabularyDropdownOptions from '@/features/dictionary/conf/vocabularyDropdownOptions';
import { VocabularyTypes } from '@/features/dictionary/types/Dictionary';
import VocabularyDropdown from '@/features/dictionary/components/VocabularyDropdown';
import VocabularyTable from '@/features/dictionary/components/VocabularyTable';
import Card from '@/ui/atoms/Card';
import LinkButton from '@/ui/atoms/LinkButton';

const VocabularyTableCard = () => {
  const [vocabularyType, setVocabularyType] = useState<VocabularyTypes>();
  const [vocabulary, setVocabulary] = useState<AnimalTemper[] | AnimalRace[]>();

  const { token } = useAuthContext();
  const { organization } = useOrganizationContext();
  const { toast } = useBackOfficeContext();

  useEffect(() => {
    switch (vocabularyType) {
      case VocabularyTypes.TEMPER:
        tempersVocabularyQuery.refetch();
        break;
      case VocabularyTypes.RACE:
        racesVocabularyQuery.refetch();
        break;
    }
  }, [vocabularyType]);

  const tempersVocabularyQuery = useGet<AnimalTemper[]>({
    url: ApiRoutes.ANIMAL_TEMPERS_ORG + '/' + organization?.id,
    token: token?.token ?? undefined,
    key: QueryKeys.ANIMAL_TEMPERS,
    enabled: false,
    onSuccess: (data) =>
      // @ts-ignore
      setVocabulary(data['hydra:member']),
    onError: () => errorToast(),
  });

  const racesVocabularyQuery = useGet<AnimalRace[]>({
    url: ApiRoutes.ANIMAL_RACES_ORG + '/' + organization?.id,
    token: token?.token ?? undefined,
    key: QueryKeys.ANIMAL_RACES,
    enabled: false,
    onSuccess: (data) =>
      // @ts-ignore
      setVocabulary(data['hydra:member']),
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
