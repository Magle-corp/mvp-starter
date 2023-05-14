import ApiRoutes from '@/cdn/enums/ApiRoutes';
import QueryKeys from '@/cdn/enums/QueryKeys';
import { UseGet } from '@/cdn/types/Query';
import useGet from '@/cdn/hooks/useGet';
import { AnimalTemper } from '@/features/animals/types/Animal';

const useGetAnimalTempers = (props: UseGet<AnimalTemper>) => {
  return useGet<AnimalTemper>({
    url: ApiRoutes.ORGANIZATION_TEMPERS + '/' + props.entityId,
    key: QueryKeys.ANIMAL_TEMPER + props.entityId,
    ...props,
  });
};

export default useGetAnimalTempers;
