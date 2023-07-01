import { useRouter } from 'next/router';
import styled from 'styled-components';
import { SubmitHandler } from 'react-hook-form';
import { confirmDialog } from 'primereact/confirmdialog';
import { useAppContext } from '@/cdn/AppContext';
import ApiIris from '@/cdn/enums/ApiIris';
import AppPages from '@/cdn/enums/AppPages';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import QueryKeys from '@/cdn/enums/QueryKeys';
import { UseGetResult } from '@/cdn/types/Query';
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
  animal: Animal;
  animalQuery: UseGetResult<Animal>;
};

const UpdateAnimalCard = (props: UpdateAnimalCard) => {
  const router = useRouter();
  const { token, organization } = useAuthContext();
  const { toast } = useAppContext();

  const animalDefaultValues = {
    name: props.animal.name,
    organization: props.animal.organization.id.toString(),
    tempers: props.animal.tempers.map((temper) => temper.id),
    race: props.animal.race.id,
    sex: props.animal.sex.id,
    registered: new Date(props.animal.registered),
    public: props.animal.public,
  };

  const animalUpdateMutation = usePut<AnimalFormSchema>({
    url: ApiRoutes.ANIMALS + '/' + props.animal.id,
    token: token?.token,
    key: QueryKeys.ANIMAL + props.animal.id,
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
  ) => {
    const startMutation = () => {
      animalUpdateMutation.mutate({
        name: fieldValues.name,
        organization: ApiIris.ORGANIZATIONS + fieldValues.organization,
        tempers: fieldValues.tempers?.map(
          (temper) => ApiIris.ANIMAL_TEMPERS + temper.toString()
        ),
        race: ApiIris.ANIMAL_RACES + fieldValues.race,
        sex: ApiIris.ANIMAL_SEXES + fieldValues.sex,
        registered: fieldValues.registered,
        public: fieldValues.public,
      });
    };

    if (organization?.public && fieldValues.public) {
      confirmDialog({
        message: 'En choisissant de rendre cette fiche publique ...',
        header: "Modifier la visibilité d'un animal",
        icon: 'pi pi-exclamation-triangle',
        accept() {
          startMutation();
        },
      });
    } else {
      startMutation();
    }
  };

  const animalDeleteMutation = useDelete<Animal>({
    url: ApiRoutes.ANIMALS,
    token: token?.token,
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

  const onAnimalDeleteSubmit = (entityId: number) =>
    confirmDialog({
      message:
        'Cette action est irréversible, êtes-vous sûr de vouloir continuer ?',
      header: 'Supprimer un animal',
      icon: 'pi pi-exclamation-triangle',
      accept: () => animalDeleteMutation.mutate(entityId),
    });

  const avatarPostMutation = usePost<FormData>({
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

  const onAvatarPostSubmit = (formData: FormData) => {
    avatarPostMutation.mutate(formData);
  };

  const avatarDeleteMutation = useDelete({
    url: ApiRoutes.ANIMAL_AVATARS,
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
    if (props.animal.avatar?.id) {
      avatarDeleteMutation.mutate(props.animal.avatar.id);
    }
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
      onClick={() => onAnimalDeleteSubmit(props.animalQuery.data?.data.id ?? 0)}
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
            onCreate={onAvatarPostSubmit}
            createQuery={avatarPostMutation}
            onDelete={onAvatarDeleteSubmit}
            deleteQuery={avatarDeleteMutation}
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
