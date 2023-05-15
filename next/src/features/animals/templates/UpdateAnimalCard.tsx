import { useState } from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler } from 'react-hook-form';
import { confirmDialog } from 'primereact/confirmdialog';
import { useAppContext } from '@/cdn/AppContext';
import ApiIris from '@/cdn/enums/ApiIris';
import AppPages from '@/cdn/enums/AppPages';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import QueryKeys from '@/cdn/enums/QueryKeys';
import useDelete from '@/cdn/hooks/useDelete';
import usePut from '@/cdn/hooks/usePut';
import useGetAnimal from '@/cdn/queries/useGetAnimal';
import { useAuthContext } from '@/features/authentication/AuthContext';
import { Animal } from '@/features/animals/types/Animal';
import AnimalForm from '@/features/animals/forms/AnimalForm';
import { AnimalFormSchema } from '@/features/animals/forms/AnimalForm';
import Button from '@/ui/atoms/Button';
import Card from '@/ui/atoms/Card';
import ProgressSpinner from '@/ui/atoms/ProgressSpinner';

const UpdateAnimalCard = () => {
  const [animalDefaultValues, setAnimalDefaultValues] =
    useState<AnimalFormSchema>();

  const router = useRouter();
  const { id: animalQueryId } = router.query;
  const { token } = useAuthContext();
  const { toast } = useAppContext();

  const animalQuery = useGetAnimal({
    entityId: parseInt(animalQueryId as string),
    token: token?.token,
    onSuccess: (data) =>
      setAnimalDefaultValues({
        name: data.name,
        organization: data.organization.id.toString(),
        tempers: data.tempers.map((temper) => temper.id),
        race: data.race.id,
        sex: data.sex.id,
        registered: new Date(data.registered),
      }),
    onError: () => errorToast(),
  });

  const animalUpdateMutation = usePut<AnimalFormSchema>({
    url: ApiRoutes.ANIMALS + '/' + animalQueryId,
    token: token?.token ?? undefined,
    key: QueryKeys.ANIMALS,
    onSuccess: () =>
      toast.current.show({
        severity: 'success',
        summary: 'Animal',
        detail: 'Mis à jour avec succès',
      }),
    onError: () => errorToast(),
  });

  const onSubmit: SubmitHandler<AnimalFormSchema> = (
    fieldValues: AnimalFormSchema
  ) =>
    animalUpdateMutation.mutate({
      name: fieldValues.name,
      organization: ApiIris.ORGANIZATIONS + fieldValues.organization,
      tempers: fieldValues.tempers?.map(
        (temper) => ApiIris.ANIMAL_TEMPERS + temper.toString()
      ),
      race: ApiIris.ANIMAL_RACES + fieldValues.race,
      sex: ApiIris.ANIMAL_SEXES + fieldValues.sex,
      registered: fieldValues.registered,
    });

  const animalDeleteMutation = useDelete<Animal>({
    url: ApiRoutes.ANIMALS + '/' + animalQueryId,
    token: token?.token ?? undefined,
    key: QueryKeys.ANIMALS,
    onSuccess: () => {
      toast.current.show({
        severity: 'success',
        summary: 'Animal',
        detail: 'Supprimé avec succès',
      });
      router.push(AppPages.BO_ANIMALS);
    },
    onError: () => errorToast(),
  });

  const errorToast = () =>
    toast.current.show({
      severity: 'error',
      summary: 'Dictionnaire',
      detail: 'Un problème technique est survenu',
    });

  const deleteAnimal = () =>
    confirmDialog({
      message:
        'Cette action est irréversible, êtes-vous sûr de vouloir continuer ?',
      header: 'Supprimer un animal',
      icon: 'pi pi-exclamation-triangle',
      accept: () => animalDeleteMutation.mutate(),
    });

  const Toolbar = (
    <Button
      icon="pi pi-trash"
      onClick={deleteAnimal}
      variant="danger"
      loading={animalDeleteMutation.isLoading}
      size="small"
    />
  );

  return (
    <Card title="Mettre à jour un animal" toolbar={Toolbar}>
      {animalQuery.isSuccess && animalDefaultValues && (
        <AnimalForm
          defaultValues={animalDefaultValues}
          onSubmit={onSubmit}
          submitLoading={animalUpdateMutation.isLoading}
          submitError={
            animalUpdateMutation.error?.response?.data.message ||
            animalDeleteMutation.error?.response?.data.message
          }
        />
      )}
      {animalQuery.isLoading && <ProgressSpinner />}
    </Card>
  );
};

export default UpdateAnimalCard;
