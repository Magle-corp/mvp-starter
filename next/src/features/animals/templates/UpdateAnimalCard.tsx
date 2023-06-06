import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { SubmitHandler } from 'react-hook-form';
import { confirmDialog } from 'primereact/confirmdialog';
import { useAppContext } from '@/cdn/AppContext';
import ApiIris from '@/cdn/enums/ApiIris';
import AppPages from '@/cdn/enums/AppPages';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import Medias from '@/cdn/enums/Medias';
import { UseGetResult } from '@/cdn/types/Query';
import QueryKeys from '@/cdn/enums/QueryKeys';
import useDelete from '@/cdn/hooks/useDelete';
import usePost from '@/cdn/hooks/usePost';
import usePut from '@/cdn/hooks/usePut';
import { useAuthContext } from '@/features/authentication/AuthContext';
import { Animal } from '@/features/animals/types/Animal';
import AnimalForm, {
  AnimalFormSchema,
} from '@/features/animals/forms/AnimalForm';
import AnimalAvatarUploader from '@/features/animals/components/AnimalAvatarUploader';
import Button from '@/ui/atoms/Button';
import Card from '@/ui/atoms/Card';
import ProgressSpinner from '@/ui/atoms/ProgressSpinner';

type UpdateAnimalCard = {
  animalQuery: UseGetResult<Animal>;
};

const UpdateAnimalCard = (props: UpdateAnimalCard) => {
  const [animalDefaultValues, setAnimalDefaultValues] =
    useState<AnimalFormSchema>();

  useEffect(() => {
    if (props.animalQuery.data?.data) {
      setAnimalDefaultValues({
        name: props.animalQuery.data?.data.name,
        organization: props.animalQuery.data?.data.organization.id.toString(),
        tempers: props.animalQuery.data?.data.tempers.map(
          (temper) => temper.id
        ),
        race: props.animalQuery.data?.data.race.id,
        sex: props.animalQuery.data?.data.sex.id,
        registered: new Date(props.animalQuery.data?.data.registered),
      });
    }
  }, [props.animalQuery]);

  const router = useRouter();
  const { token } = useAuthContext();
  const { toast } = useAppContext();

  const animalUpdateMutation = usePut<AnimalFormSchema>({
    url: ApiRoutes.ANIMALS + '/' + props.animalQuery?.data?.data.id,
    token: token?.token ?? undefined,
    key: QueryKeys.ANIMAL + props.animalQuery?.data?.data.id,
    onSuccess: () =>
      toast.current.show({
        severity: 'success',
        summary: 'Animal',
        detail: 'Mis à jour avec succès',
      }),
    onError: () => errorToast(),
  });

  const onAnimalUpdateSubmit: SubmitHandler<AnimalFormSchema> = (
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
    url: ApiRoutes.ANIMALS + '/' + props.animalQuery?.data?.data.id,
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

  const onAnimalDeleteSubmit = () =>
    confirmDialog({
      message:
        'Cette action est irréversible, êtes-vous sûr de vouloir continuer ?',
      header: 'Supprimer un animal',
      icon: 'pi pi-exclamation-triangle',
      accept: () => animalDeleteMutation.mutate(),
    });

  const avatarUpdateMutation = usePost({
    url: ApiRoutes.ANIMAL_AVATARS,
    token: token?.token,
    mediaObject: true,
    onSuccess: () => {
      props.animalQuery.refetch();
      toast.current.show({
        severity: 'success',
        summary: 'Animal',
        detail: 'Avatar enregistré avec succès',
      });
    },
    onError: () => errorToast(),
  });

  const onAvatarUpdateSubmit = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const animalData = JSON.stringify({
        id: props.animalQuery?.data?.data.id,
        type: Medias.ANIMAL_AVATAR,
      });

      const formData = new FormData();
      formData.append('file', file);
      formData.append('entity', animalData);

      avatarUpdateMutation.mutate(formData);
    }
  };

  const avatarDeleteMutation = useDelete({
    url:
      ApiRoutes.ANIMAL_AVATARS +
      '/' +
      (props.animalQuery?.data?.data.avatar
        ? props.animalQuery?.data?.data.avatar.id
        : ''),
    token: token?.token,
    onSuccess: () => {
      props.animalQuery.refetch();
      toast.current.show({
        severity: 'success',
        summary: 'Animal',
        detail: 'Avatar supprimé avec succès',
      });
    },
    onError: () => errorToast(),
  });

  const onAvatarDeleteSubmit = () => {
    avatarDeleteMutation.mutate();
  };

  const errorToast = () =>
    toast.current.show({
      severity: 'error',
      summary: 'Animal',
      detail: 'Un problème technique est survenu',
    });

  const Toolbar = (
    <Button
      icon="pi pi-trash"
      onClick={onAnimalDeleteSubmit}
      variant="danger"
      loading={animalDeleteMutation.isLoading}
      size="small"
    />
  );

  return (
    <Card title="Mettre à jour un animal" toolbar={Toolbar}>
      {props.animalQuery.data?.data && animalDefaultValues && (
        <ContentWrapper>
          <AnimalAvatarUploader
            animal={props.animalQuery.data?.data}
            onUpdate={onAvatarUpdateSubmit}
            updateLoading={avatarUpdateMutation.isLoading}
            onDelete={onAvatarDeleteSubmit}
            deleteLoading={avatarDeleteMutation.isLoading}
            submitError={
              avatarUpdateMutation.error?.response?.data.message ||
              avatarDeleteMutation.error?.response?.data.message
            }
          />
          <AnimalForm
            defaultValues={animalDefaultValues}
            onSubmit={onAnimalUpdateSubmit}
            submitLoading={animalUpdateMutation.isLoading}
            submitError={
              animalUpdateMutation.error?.response?.data.message ||
              animalDeleteMutation.error?.response?.data.message
            }
          />
        </ContentWrapper>
      )}
      {props.animalQuery.isLoading && <ProgressSpinner />}
    </Card>
  );
};

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 3rem;

  @media screen and (${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: max-content 1fr;
    grid-gap: 2rem;

    > :nth-child(2) {
      margin-top: 0.75rem;
    }
  }
`;

export default UpdateAnimalCard;
