import ApiRoutes from '@/cdn/enums/ApiRoutes';
import QueryKeys from '@/cdn/enums/QueryKeys';
import { UseGetCollection } from '@/cdn/types/Query';
import useGetCollection from '@/cdn/hooks/useGetCollection';
import { AnimalSex } from '@/features/animals/types/Animal';

const UseGetAnimalSexes = (props: UseGetCollection<AnimalSex[]>) => {
  return useGetCollection<AnimalSex[]>({
    url: ApiRoutes.ANIMAL_SEXES,
    token: props.token,
    key: QueryKeys.ANIMAL_SEXES,
    onSuccess: props.onSuccess,
    onError: props.onError,
  });
};

export default UseGetAnimalSexes;
