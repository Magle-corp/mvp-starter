import { SubmitHandler } from 'react-hook-form';
import { useBackOfficeContext } from '@/cdn/BackOfficeContext';
import ApiIris from '@/cdn/enums/ApiIris';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import QueryKeys from '@/cdn/enums/QueryKeys';
import usePost from '@/cdn/hooks/usePost';
import { useAuthContext } from '@/features/authentication/AuthContext';
import { useOrganizationContext } from '@/features/organization/OrganizationContext';
import Animal from '@/features/animals/types/Animal';
import CreateAnimalForm from '@/features/animals/forms/CreateAnimalForm';
import Card from '@/ui/atoms/Card';

const CreateAnimalCard = () => {
  const { token } = useAuthContext();
  const { organization } = useOrganizationContext();
  const { toast } = useBackOfficeContext();

  const animalDefaultValues: Animal = {
    name: '',
    organization: ApiIris.ORGANIZATIONS + organization?.id ?? 0,
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
    animalMutation.mutate(fieldValues);
  };

  return (
    <Card title="Enregister un animal">
      <CreateAnimalForm
        defaultValues={animalDefaultValues}
        onSubmit={onSubmit}
        submitLoading={animalMutation.isLoading}
        submitError={animalMutation.error?.response?.data.message}
      />
    </Card>
  );
};

export default CreateAnimalCard;
