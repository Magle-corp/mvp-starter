import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler } from 'react-hook-form';
import { useBackOfficeContext } from '@/cdn/BackOfficeContext';
import ApiIris from '@/cdn/enums/ApiIris';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import QueryKeys from '@/cdn/enums/QueryKeys';
import AppPages from '@/cdn/enums/AppPages';
import usePut from '@/cdn/hooks/usePut';
import useGetAnimalRace from '@/cdn/queries/useGetAnimalRace';
import useGetAnimalTemper from '@/cdn/queries/useGetAnimalTemper';
import useGetAnimalType from '@/cdn/queries/useGetAnimalType';
import { useAuthContext } from '@/features/authentication/AuthContext';
import {
  VocabularyFormConfiguration,
  VocabularyTypes,
} from '@/features/dictionary/types/Vocabulary';
import TemperForm, {
  TemperFormSchema,
} from '@/features/dictionary/forms/TemperForm';
import TypeForm, { TypeFormSchema } from '@/features/dictionary/forms/TypeForm';
import RaceForm, { RaceFormSchema } from '@/features/dictionary/forms/RaceForm';
import Card from '@/ui/atoms/Card';

const UpdateVocabularyCard = () => {
  const [formConfiguration, setFormConfiguration] =
    useState<VocabularyFormConfiguration>();

  const router = useRouter();
  const { vocabulary: queryVocabularyType, id: queryVocabularyId } =
    router.query;
  const { token } = useAuthContext();
  const { toast } = useBackOfficeContext();

  const raceQuery = useGetAnimalRace({
    entityId: parseInt(queryVocabularyId as string),
    token: token?.token,
    enabled: false,
    onSuccess: (data) =>
      setFormConfiguration({
        type: VocabularyTypes.RACE,
        cardTitle: 'Mettre un jour une race',
        defaultValues: {
          name: data.name,
          type: data.type.id,
          organization: data.organization?.id.toString() as string,
        },
      }),
  });

  const temperQuery = useGetAnimalTemper({
    entityId: parseInt(queryVocabularyId as string),
    token: token?.token,
    enabled: false,
    onSuccess: (data) =>
      setFormConfiguration({
        type: VocabularyTypes.TEMPER,
        cardTitle: 'Mettre un jour un caractère',
        defaultValues: {
          name: data.name,
          organization: data.organization?.id.toString() as string,
        },
      }),
  });

  const typeQuery = useGetAnimalType({
    entityId: parseInt(queryVocabularyId as string),
    token: token?.token,
    enabled: false,
    onSuccess: (data) =>
      setFormConfiguration({
        type: VocabularyTypes.TYPE,
        cardTitle: 'Mettre un jour un type',
        defaultValues: {
          name: data.name,
          organization: data.organization?.id.toString() as string,
        },
      }),
  });

  useEffect(() => {
    switch (queryVocabularyType) {
      case VocabularyTypes.TEMPER:
        temperQuery.refetch();
        break;
      case VocabularyTypes.TYPE:
        typeQuery.refetch();
        break;
      case VocabularyTypes.RACE:
        raceQuery.refetch();
        break;
    }
  }, [queryVocabularyType]);

  const temperMutation = usePut<TemperFormSchema>({
    url: ApiRoutes.ORGANIZATION_TEMPERS + '/' + queryVocabularyId,
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

  const typeMutation = usePut<TypeFormSchema>({
    url: ApiRoutes.ORGANIZATION_TYPES + '/' + queryVocabularyId,
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

  const raceMutation = usePut<RaceFormSchema>({
    url: ApiRoutes.ORGANIZATION_RACES + '/' + queryVocabularyId,
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

  return (
    <Card
      title={formConfiguration?.cardTitle ?? 'Mettre à jour un vocabulaire'}
    >
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
    </Card>
  );
};

export default UpdateVocabularyCard;
