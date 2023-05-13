import ApiRoutes from '@/cdn/enums/ApiRoutes';
import QueryKeys from '@/cdn/enums/QueryKeys';
import { UseGetCollection } from '@/cdn/types/Query';
import useGetCollection from '@/cdn/hooks/useGetCollection';
import { AnimalRace } from '@/features/animals/types/Animal';

const useGetAnimalRaces = (props: UseGetCollection<AnimalRace[]>) => {
  return useGetCollection<AnimalRace[]>({
    url: ApiRoutes.ANIMAL_RACES_ORG + '/' + props.organizationId,
    token: props.token,
    key: QueryKeys.ANIMAL_RACES,
    onSuccess: props.onSuccess,
    onError: props.onError,
  });
};

export default useGetAnimalRaces;
