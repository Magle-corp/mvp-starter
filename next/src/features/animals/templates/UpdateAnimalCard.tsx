import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler } from 'react-hook-form';
import { useBackOfficeContext } from '@/cdn/BackOfficeContext';
import ApiIris from '@/cdn/enums/ApiIris';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import QueryKeys from '@/cdn/enums/QueryKeys';
import useGet from '@/cdn/hooks/useGet';
import usePut from '@/cdn/hooks/usePut';
import { useAuthContext } from '@/features/authentication/AuthContext';
import { useOrganizationContext } from '@/features/organization/OrganizationContext';
import { Animal } from '@/features/animals/types/Animal';
import AnimalForm from '@/features/animals/forms/AnimalForm';
import Card from '@/ui/atoms/Card';

const UpdateAnimalCard = () => {
  const router = useRouter();
  const { token } = useAuthContext();
  const { organization } = useOrganizationContext();
  const { toast } = useBackOfficeContext();

  const { id: animalQueryId } = router.query;

  const animalDefaultValues: Animal = {
    name: '',
    organization: ApiIris.ORGANIZATIONS + organization?.id ?? 0,
    tempers: [],
  };

  const animalQuery = useGet<Animal>({
    url: ApiRoutes.ANIMALS + '/' + animalQueryId,
    token: token?.token ?? undefined,
    key: QueryKeys.ANIMALS,
    enabled: false,
  });

  useEffect(() => {
    if (animalQueryId) {
      animalQuery.refetch();
    }
  }, [animalQueryId]);

  const animalMutation = usePut<Animal>({
    url: ApiRoutes.ANIMALS + '/' + animalQueryId,
    token: token?.token ?? undefined,
    key: QueryKeys.ANIMALS,
    onSuccess: () => {
      toast.current.show({
        severity: 'success',
        summary: 'Animal',
        detail: 'Mis à jour avec succès',
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
    animalMutation.mutate({
      ...fieldValues,
      // @ts-ignore
      tempers: fieldValues.tempers.map(
        (temper) => ApiIris.ANIMAL_TEMPERS + temper.id
      ),
    });
  };

  return (
    <Card title="Mettre à jour un animal">
      <AnimalForm
        defaultValues={animalQuery.data?.data ?? animalDefaultValues}
        onSubmit={onSubmit}
        submitLoading={animalMutation.isLoading}
        submitError={animalMutation.error?.response?.data.message}
      />
    </Card>
  );
};

export default UpdateAnimalCard;
