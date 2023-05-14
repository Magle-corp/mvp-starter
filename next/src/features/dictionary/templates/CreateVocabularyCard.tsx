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
import { useOrganizationContext } from '@/features/organization/OrganizationContext';
import vocabularyDropdownOptions from '@/features/dictionary/conf/vocabularyDropdownOptions';
import {
  VocabularyFormConfiguration,
  VocabularyTypes,
} from '@/features/dictionary/types/Vocabulary';
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
  const { token } = useAuthContext();
  const { organization } = useOrganizationContext();
  const { toast } = useBackOfficeContext();

  useEffect(() => {
    if (organization) {
      switch (queryVocabularyType) {
        case VocabularyTypes.TEMPER:
          setFormConfiguration({
            type: VocabularyTypes.TEMPER,
            cardTitle: 'Ajouter un caractère',
            defaultValues: {
              name: '',
              organization: organization.id.toString(),
            },
          });
          break;
        case VocabularyTypes.TYPE:
          setFormConfiguration({
            type: VocabularyTypes.TYPE,
            cardTitle: 'Ajouter un type',
            defaultValues: {
              name: '',
              type: '',
              organization: organization.id.toString(),
            },
          });
          break;
        case VocabularyTypes.RACE:
          setFormConfiguration({
            type: VocabularyTypes.RACE,
            cardTitle: 'Ajouter une race',
            defaultValues: {
              name: '',
              organization: organization.id.toString(),
            },
          });
          break;
      }
    }
  }, [organization, queryVocabularyType]);

  const temperMutation = usePost<TemperFormSchema>({
    url: ApiRoutes.ORGANIZATION_TEMPERS,
    token: token?.token ?? undefined,
    key: QueryKeys.ANIMAL_TEMPERS,
    onSuccess: () => {
      successToast();
      router.push(AppPages.BO_DICTIONARY + '?vocabulary=temper');
    },
    onError: () => errorToast(),
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
      successToast();
      router.push(AppPages.BO_DICTIONARY + '?vocabulary=type');
    },
    onError: () => errorToast(),
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
      successToast();
      router.push(AppPages.BO_DICTIONARY + '?vocabulary=race');
    },
    onError: () => errorToast(),
  });

  const onSubmitRaceForm: SubmitHandler<RaceFormSchema> = (
    fieldValues: RaceFormSchema
  ) =>
    raceMutation.mutate({
      name: fieldValues.name,
      organization: ApiIris.ORGANIZATIONS + fieldValues.organization,
      type: ApiIris.ANIMAL_TYPES + fieldValues.type,
    });

  const successToast = () =>
    toast.current.show({
      severity: 'success',
      summary: 'Dictionnaire',
      detail: 'Enregistré avec succès',
    });

  const errorToast = () =>
    toast.current.show({
      severity: 'error',
      summary: 'Dictionnaire',
      detail: 'Un problème technique est survenu',
    });

  const Toolbar = (
    <VocabularyDropdown
      placeholder="type de vocabulaire"
      value={formConfiguration?.type}
      options={vocabularyDropdownOptions}
      onChange={(event) =>
        router.push(AppPages.BO_DICTIONARY_CREATE + '/' + event.value)
      }
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
