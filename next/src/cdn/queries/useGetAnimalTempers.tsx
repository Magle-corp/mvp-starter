import ApiRoutes from '@/cdn/enums/ApiRoutes';
import QueryKeys from '@/cdn/enums/QueryKeys';
import { UseGetCollection } from '@/cdn/types/Query';
import useGetCollection from '@/cdn/hooks/useGetCollection';
import { AnimalTemper } from '@/features/animals/types/Animal';

const useGetAnimalTempers = (props: UseGetCollection<AnimalTemper[]>) => {
  return useGetCollection<AnimalTemper[]>({
    url: ApiRoutes.ANIMAL_TEMPERS_ORG + '/' + props.organizationId,
    token: props.token,
    key: QueryKeys.ANIMAL_TEMPERS,
    onSuccess: props.onSuccess,
    onError: props.onError,
  });
};

export default useGetAnimalTempers;
