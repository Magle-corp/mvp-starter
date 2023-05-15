import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { SubmitHandler } from 'react-hook-form';
import { useBackOfficeContext } from '@/cdn/BackOfficeContext';
import ApiIris from '@/cdn/enums/ApiIris';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import AppPages from '@/cdn/enums/AppPages';
import QueryKeys from '@/cdn/enums/QueryKeys';
import usePost from '@/cdn/hooks/usePost';
import { useAuthContext } from '@/features/authentication/AuthContext';
import {
  VocabularyFormConfiguration,
  VocabularyTypes,
} from '@/features/dictionary/types/Vocabulary';
import {
  errorToast,
  getCreateFormConfiguration,
  successToast,
} from '@/features/dictionary/utils/vocabularyService';
import TemperForm, {
  TemperFormSchema,
} from '@/features/dictionary/forms/TemperForm';
import TypeForm, { TypeFormSchema } from '@/features/dictionary/forms/TypeForm';
import RaceForm, { RaceFormSchema } from '@/features/dictionary/forms/RaceForm';
import VocabularyDropdown from '@/features/dictionary/components/VocabularyDropdown';
import Card from '@/ui/atoms/Card';

const CreateVocabularyCard = () => {
  const [formConfiguration, setFormConfiguration] =
    useState<VocabularyFormConfiguration>();

  const router = useRouter();
  const { vocabulary: queryVocabularyType } = router.query;
  const { token, organization } = useAuthContext();
  const { toast } = useBackOfficeContext();

  useEffect(() => {
    if (
      !formConfiguration &&
      organization &&
      (queryVocabularyType === VocabularyTypes.RACE ||
        queryVocabularyType === VocabularyTypes.TYPE ||
        queryVocabularyType === VocabularyTypes.TEMPER)
    ) {
      setFormConfiguration(
        getCreateFormConfiguration(organization.id, queryVocabularyType)
      );
    }
  }, [queryVocabularyType]);

  const temperMutation = usePost<TemperFormSchema>({
    url: ApiRoutes.ORGANIZATION_TEMPERS,
    token: token?.token ?? undefined,
    key: QueryKeys.ANIMAL_TEMPERS,
    onSuccess: () => {
      successToast(toast);
      router.push(AppPages.BO_DICTIONARY + '?vocabulary=temper');
    },
    onError: () => errorToast(toast),
  });

  const onSubmitTemperForm: SubmitHandler<TemperFormSchema> = (
    fieldValues: TemperFormSchema
  ) =>
    temperMutation.mutate({
      name: fieldValues.name,
      organization: ApiIris.ORGANIZATIONS + fieldValues.organization,
    });

  const typeMutation = usePost<TypeFormSchema>({
    url: ApiRoutes.ORGANIZATION_TYPES,
    token: token?.token ?? undefined,
    key: QueryKeys.ANIMAL_TYPES,
    onSuccess: () => {
      successToast(toast);
      router.push(AppPages.BO_DICTIONARY + '?vocabulary=type');
    },
    onError: () => errorToast(toast),
  });

  const onSubmitTypeForm: SubmitHandler<TypeFormSchema> = (
    fieldValues: TypeFormSchema
  ) =>
    typeMutation.mutate({
      name: fieldValues.name,
      organization: ApiIris.ORGANIZATIONS + fieldValues.organization,
    });

  const raceMutation = usePost<RaceFormSchema>({
    url: ApiRoutes.ORGANIZATION_RACES,
    token: token?.token ?? undefined,
    key: QueryKeys.ANIMAL_RACES,
    onSuccess: () => {
      successToast(toast);
      router.push(AppPages.BO_DICTIONARY + '?vocabulary=race');
    },
    onError: () => errorToast(toast),
  });

  const onSubmitRaceForm: SubmitHandler<RaceFormSchema> = (
    fieldValues: RaceFormSchema
  ) =>
    raceMutation.mutate({
      name: fieldValues.name,
      organization: ApiIris.ORGANIZATIONS + fieldValues.organization,
      type: ApiIris.ANIMAL_TYPES + fieldValues.type,
    });

  const Toolbar = (
    <VocabularyDropdown
      value={formConfiguration?.type}
      onChange={(event) => {
        if (organization) {
          setFormConfiguration(
            getCreateFormConfiguration(organization.id, event.value)
          );
        }
      }}
    />
  );

  return (
    <Card
      title={formConfiguration?.cardTitle ?? 'Ajouter du vocabulaire'}
      toolbar={Toolbar}
    >
      {formConfiguration && (
        <>
          {formConfiguration?.type === VocabularyTypes.TEMPER && (
            <TemperForm
              defaultValues={formConfiguration.defaultValues}
              onSubmit={onSubmitTemperForm}
              submitLoading={temperMutation.isLoading}
              submitError={temperMutation.error?.response?.data.message}
            />
          )}
          {formConfiguration?.type === VocabularyTypes.TYPE && (
            <TypeForm
              defaultValues={formConfiguration.defaultValues}
              onSubmit={onSubmitTypeForm}
              submitLoading={typeMutation.isLoading}
              submitError={typeMutation.error?.response?.data.message}
            />
          )}
          {formConfiguration?.type === VocabularyTypes.RACE && (
            <RaceForm
              defaultValues={formConfiguration.defaultValues as RaceFormSchema}
              onSubmit={onSubmitRaceForm}
              submitLoading={raceMutation.isLoading}
              submitError={raceMutation.error?.response?.data.message}
            />
          )}
        </>
      )}
      {!formConfiguration && (
        <Info>Veuillez sélectionner un type de vocabulaire</Info>
      )}
    </Card>
  );
};

const Info = styled.p`
  font-weight: bold;
  text-align: center;
`;

export default CreateVocabularyCard;
