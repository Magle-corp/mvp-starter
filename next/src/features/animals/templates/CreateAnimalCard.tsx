import { useRouter } from 'next/router';
import { SubmitHandler } from 'react-hook-form';
import { useBackOfficeContext } from '@/cdn/BackOfficeContext';
import AppPages from '@/cdn/enums/AppPages';
import ApiIris from '@/cdn/enums/ApiIris';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import QueryKeys from '@/cdn/enums/QueryKeys';
import usePost from '@/cdn/hooks/usePost';
import { useAuthContext } from '@/features/authentication/AuthContext';
import { useOrganizationContext } from '@/features/organization/OrganizationContext';
import { Animal } from '@/features/animals/types/Animal';
import AnimalForm from '@/features/animals/forms/AnimalForm';
import Card from '@/ui/atoms/Card';

const CreateAnimalCard = () => {
  const router = useRouter();
  const { token } = useAuthContext();
  const { organization } = useOrganizationContext();
  const { toast } = useBackOfficeContext();

  const animalDefaultValues: Animal = {
    name: '',
    organization: ApiIris.ORGANIZATIONS + organization?.id ?? 0,
    tempers: [],
  };

  const animalMutation = usePost<Animal>({
    url: ApiRoutes.ANIMALS,
    token: token?.token ?? undefined,
    key: QueryKeys.ANIMALS,
    onSuccess: () => {
      toast.current.show({
        severity: 'success',
        summary: 'Animal',
        detail: 'Enregistré avec succès',
      });
      router.push(AppPages.BO_ANIMALS);
    },
    onError: () => {
      toast.current.show({
        severity: 'error',
        summary: 'Animal',
        detail: 'Un problème technique est survenu',
      });
    },
  });

  const onSubmit: SubmitHandler<Animal> = (fieldValues: Animal) => {
    animalMutation.mutate({
      ...fieldValues,
      // @ts-ignore
      tempers: fieldValues.tempers.map(
        (temper) => ApiIris.ANIMAL_TEMPERS + temper.id
      ),
    });
  };

  return (
    <Card title="Enregister un animal">
      <AnimalForm
        defaultValues={animalDefaultValues}
        onSubmit={onSubmit}
        submitLoading={animalMutation.isLoading}
        submitError={animalMutation.error?.response?.data.message}
      />
    </Card>
  );
};

export default CreateAnimalCard;
