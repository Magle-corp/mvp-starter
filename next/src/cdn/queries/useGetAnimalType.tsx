import ApiRoutes from '@/cdn/enums/ApiRoutes';
import QueryKeys from '@/cdn/enums/QueryKeys';
import { UseGet } from '@/cdn/types/Query';
import useGet from '@/cdn/hooks/useGet';
import { AnimalType } from '@/features/animals/types/Animal';

const UseGetAnimalTypes = (props: UseGet<AnimalType>) => {
  return useGet<AnimalType>({
    url: ApiRoutes.ORGANIZATION_TYPES + '/' + props.entityId,
    key: QueryKeys.ANIMAL_TYPE + props.entityId,
    ...props,
  });
};

export default UseGetAnimalTypes;
