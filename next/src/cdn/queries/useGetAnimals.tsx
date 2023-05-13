import ApiRoutes from '@/cdn/enums/ApiRoutes';
import QueryKeys from '@/cdn/enums/QueryKeys';
import { UseGetCollection } from '@/cdn/types/Query';
import useGetCollection from '@/cdn/hooks/useGetCollection';
import { Animal } from '@/features/animals/types/Animal';

const useGetAnimals = (props: UseGetCollection<Animal[]>) => {
  return useGetCollection<Animal[]>({
    url: ApiRoutes.ANIMALS_ORG + '/' + props.organizationId,
    token: props.token,
    key: QueryKeys.ANIMALS,
    onSuccess: props.onSuccess,
    onError: props.onError,
  });
};

export default useGetAnimals;
