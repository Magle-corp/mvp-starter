import ApiRoutes from '@/cdn/enums/ApiRoutes';
import QueryKeys from '@/cdn/enums/QueryKeys';
import { UseGet } from '@/cdn/types/Query';
import useGet from '@/cdn/hooks/useGet';
import { AnimalRace } from '@/features/animals/types/Animal';

const useGetAnimalRaces = (props: UseGet<AnimalRace>) => {
  return useGet<AnimalRace>({
    url: ApiRoutes.ORGANIZATION_RACES + '/' + props.entityId,
    key: QueryKeys.ANIMAL_RACE + props.entityId,
    ...props,
  });
};

export default useGetAnimalRaces;
