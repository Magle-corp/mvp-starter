import ApiRoutes from '@/cdn/enums/ApiRoutes';
import QueryKeys from '@/cdn/enums/QueryKeys';
import { UseGetCollection } from '@/cdn/types/Query';
import useGetCollection from '@/cdn/hooks/useGetCollection';
import { AnimalSex } from '@/features/animals/types/Animal';

const UseGetCollectionAnimalSex = (props: UseGetCollection<AnimalSex[]>) => {
  return useGetCollection<AnimalSex[]>({
    url: ApiRoutes.ANIMAL_SEXES,
    key: QueryKeys.ANIMAL_SEXES,
    ...props,
  });
};

export default UseGetCollectionAnimalSex;
