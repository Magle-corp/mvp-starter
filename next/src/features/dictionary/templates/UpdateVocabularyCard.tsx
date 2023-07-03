import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler } from 'react-hook-form';
import { confirmDialog } from 'primereact/confirmdialog';
import { useBackOfficeContext } from '@/ui/layouts/BackOfficeContext';
import ApiIris from '@/cdn/enums/ApiIris';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import QueryKeys from '@/cdn/enums/QueryKeys';
import AppPages from '@/cdn/enums/AppPages';
import useDelete from '@/cdn/hooks/useDelete';
import usePut from '@/cdn/hooks/usePut';
import useGetAnimalRace from '@/cdn/queries/useGetAnimalRace';
import useGetAnimalTemper from '@/cdn/queries/useGetAnimalTemper';
import useGetAnimalType from '@/cdn/queries/useGetAnimalType';
import { useAuthContext } from '@/features/authentication/AuthContext';
import {
  VocabularyFormConfiguration,
  VocabularyTypes,
} from '@/features/dictionary/types/Vocabulary';
import {
  deleteToast,
  errorToast,
  getUpdateFormConfiguration,
  successToast,
} from '@/features/dictionary/utils/vocabularyService';
import TemperForm, {
  TemperFormSchema,
} from '@/features/dictionary/forms/TemperForm';
import TypeForm, { TypeFormSchema } from '@/features/dictionary/forms/TypeForm';
import RaceForm, { RaceFormSchema } from '@/features/dictionary/forms/RaceForm';
import Card from '@/ui/atoms/Card';
import Button from '@/ui/atoms/Button';

const UpdateVocabularyCard = () => {
  const [formConfiguration, setFormConfiguration] =
    useState<VocabularyFormConfiguration>();

  const router = useRouter();
  const { vocabulary: queryVocabularyType, id: queryVocabularyId } =
    router.query;
  const { token } = useAuthContext();
  const { toast } = useBackOfficeContext();

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

  const temperQuery = useGetAnimalTemper({
    entityId: parseInt(queryVocabularyId as string),
    token: token?.token,
    enabled: false,
    onSuccess: (data) =>
      setFormConfiguration(
        getUpdateFormConfiguration(queryVocabularyType as VocabularyTypes, data)
      ),
    onError: () => errorToast(toast),
  });

  const temperUpdateMutation = usePut<TemperFormSchema>({
    url: ApiRoutes.ORGANIZATION_TEMPERS + '/' + queryVocabularyId,
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
    temperUpdateMutation.mutate({
      name: fieldValues.name,
      organization: ApiIris.ORGANIZATIONS + fieldValues.organization,
    });

  const temperDeleteMutation = useDelete<TemperFormSchema>({
    url: ApiRoutes.ORGANIZATION_TEMPERS + '/' + queryVocabularyId,
    token: token?.token ?? undefined,
    key: QueryKeys.ANIMAL_TEMPERS,
    onSuccess: () => {
      deleteToast(toast);
      router.push(AppPages.BO_DICTIONARY + '?vocabulary=temper');
    },
    onError: () => errorToast(toast),
  });

  const typeQuery = useGetAnimalType({
    entityId: parseInt(queryVocabularyId as string),
    token: token?.token,
    enabled: false,
    onSuccess: (data) =>
      setFormConfiguration(
        getUpdateFormConfiguration(queryVocabularyType as VocabularyTypes, data)
      ),
    onError: () => errorToast(toast),
  });

  const typeUpdateMutation = usePut<TypeFormSchema>({
    url: ApiRoutes.ORGANIZATION_TYPES + '/' + queryVocabularyId,
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
    typeUpdateMutation.mutate({
      name: fieldValues.name,
      organization: ApiIris.ORGANIZATIONS + fieldValues.organization,
    });

  const typeDeleteMutation = useDelete<TypeFormSchema>({
    url: ApiRoutes.ORGANIZATION_TYPES,
    token: token?.token ?? undefined,
    key: QueryKeys.ANIMAL_TYPES,
    onSuccess: () => {
      deleteToast(toast);
      router.push(AppPages.BO_DICTIONARY + '?vocabulary=type');
    },
    onError: () => errorToast(toast),
  });

  const raceQuery = useGetAnimalRace({
    entityId: parseInt(queryVocabularyId as string),
    token: token?.token,
    enabled: false,
    onSuccess: (data) =>
      setFormConfiguration(
        getUpdateFormConfiguration(queryVocabularyType as VocabularyTypes, data)
      ),
    onError: () => errorToast(toast),
  });

  const raceUpdateMutation = usePut<RaceFormSchema>({
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
    raceUpdateMutation.mutate({
      name: fieldValues.name,
      organization: ApiIris.ORGANIZATIONS + fieldValues.organization,
      type: ApiIris.ANIMAL_TYPES + fieldValues.type,
    });

  const raceDeleteMutation = useDelete<RaceFormSchema>({
    url: ApiRoutes.ORGANIZATION_RACES,
    token: token?.token ?? undefined,
    key: QueryKeys.ANIMAL_RACES,
    onSuccess: () => {
      deleteToast(toast);
      router.push(AppPages.BO_DICTIONARY + '?vocabulary=race');
    },
    onError: () => errorToast(toast),
  });

  const deleteVocabulary = () =>
    confirmDialog({
      message:
        'Cette action est irréversible, êtes-vous sûr de vouloir continuer ?',
      header: 'Supprimer un vocabulaire',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        switch (queryVocabularyType) {
          case VocabularyTypes.RACE:
            raceDeleteMutation.mutate(parseInt(queryVocabularyId as string));
            break;
          case VocabularyTypes.TYPE:
            typeDeleteMutation.mutate(parseInt(queryVocabularyId as string));
            break;
          case VocabularyTypes.TEMPER:
            temperDeleteMutation.mutate(parseInt(queryVocabularyId as string));
            break;
        }
      },
    });

  const Toolbar = (
    <Button
      icon="pi pi-trash"
      onClick={deleteVocabulary}
      variant="danger"
      loading={
        typeDeleteMutation.isLoading ||
        raceDeleteMutation.isLoading ||
        temperDeleteMutation.isLoading
      }
      size="small"
    />
  );

  return (
    <Card
      title={formConfiguration?.cardTitle ?? 'Mettre à jour un vocabulaire'}
      toolbar={Toolbar}
    >
      {formConfiguration?.type === VocabularyTypes.TEMPER && (
        <TemperForm
          defaultValues={formConfiguration.defaultValues}
          onSubmit={onSubmitTemperForm}
          submitLoading={temperUpdateMutation.isLoading}
          submitError={temperUpdateMutation.error?.response?.data.message}
        />
      )}
      {formConfiguration?.type === VocabularyTypes.TYPE && (
        <TypeForm
          defaultValues={formConfiguration.defaultValues}
          onSubmit={onSubmitTypeForm}
          submitLoading={typeUpdateMutation.isLoading}
          submitError={typeUpdateMutation.error?.response?.data.message}
        />
      )}
      {formConfiguration?.type === VocabularyTypes.RACE && (
        <RaceForm
          defaultValues={formConfiguration.defaultValues as RaceFormSchema}
          onSubmit={onSubmitRaceForm}
          submitLoading={raceUpdateMutation.isLoading}
          submitError={raceUpdateMutation.error?.response?.data.message}
        />
      )}
    </Card>
  );
};

export default UpdateVocabularyCard;
