import ApiRoutes from '@/cdn/enums/ApiRoutes';
import QueryKeys from '@/cdn/enums/QueryKeys';
import { UseGetCollection } from '@/cdn/types/Query';
import useGetCollection from '@/cdn/hooks/useGetCollection';
import { AnimalType } from '@/features/animals/types/Animal';

const UseGetAnimalTypes = (props: UseGetCollection<AnimalType[]>) => {
  return useGetCollection<AnimalType[]>({
    url: ApiRoutes.ANIMAL_TYPES_ORG + '/' + props.organizationId,
    token: props.token,
    key: QueryKeys.ANIMAL_TYPES,
    onSuccess: props.onSuccess,
    onError: props.onError,
  });
};

export default UseGetAnimalTypes;
