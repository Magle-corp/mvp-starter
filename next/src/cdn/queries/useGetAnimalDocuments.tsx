import ApiRoutes from '@/cdn/enums/ApiRoutes';
import QueryKeys from '@/cdn/enums/QueryKeys';
import { UseGetCollection } from '@/cdn/types/Query';
import useGetCollection from '@/cdn/hooks/useGetCollection';
import { AnimalDocument } from '@/features/animals/types/Animal';

const useGetAnimalDocuments = (props: UseGetCollection<AnimalDocument[]>) => {
  return useGetCollection<AnimalDocument[]>({
    url: ApiRoutes.ANIMAL_DOCUMENTS_ORG + '/' + props.organizationId,
    key: QueryKeys.ANIMAL_DOCUMENTS,
    ...props,
  });
};

export default useGetAnimalDocuments;
