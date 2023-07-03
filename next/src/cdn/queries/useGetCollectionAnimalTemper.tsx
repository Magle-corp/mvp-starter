import ApiRoutes from '@/cdn/enums/ApiRoutes';
import QueryKeys from '@/cdn/enums/QueryKeys';
import { UseGetCollection } from '@/cdn/types/Query';
import useGetCollection from '@/cdn/hooks/useGetCollection';
import { AnimalTemper } from '@/features/animals/types/Animal';

const useGetCollectionAnimalTemper = (
  props: UseGetCollection<AnimalTemper[]>
) => {
  return useGetCollection<AnimalTemper[]>({
    url: ApiRoutes.ANIMAL_TEMPERS_ORG + '/' + props.organizationId,
    key: QueryKeys.ANIMAL_TEMPERS,
    ...props,
  });
};

export default useGetCollectionAnimalTemper;
