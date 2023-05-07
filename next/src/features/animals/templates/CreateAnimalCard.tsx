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
import { AnimalFormSchema } from '@/features/animals/forms/AnimalForm';
import Card from '@/ui/atoms/Card';

const CreateAnimalCard = () => {
  const router = useRouter();
  const { token } = useAuthContext();
  const { organization } = useOrganizationContext();
  const { toast } = useBackOfficeContext();

  const animalDefaultValues: AnimalFormSchema = {
    name: '',
    organization: organization?.id ?? '',
    tempers: [],
    race: '',
    sex: '',
  };

  const animalMutation = usePost<AnimalFormSchema>({
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

  const onSubmit: SubmitHandler<AnimalFormSchema> = (
    fieldValues: AnimalFormSchema
  ) => {
    animalMutation.mutate({
      name: fieldValues.name,
      organization: ApiIris.ORGANIZATIONS + fieldValues.organization,
      tempers: fieldValues.tempers?.map(
        (temper) => ApiIris.ANIMAL_TEMPERS + temper.toString()
      ),
      race: ApiIris.ANIMAL_RACES + fieldValues.race,
      sex: ApiIris.ANIMAL_SEXES + fieldValues.sex,
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
