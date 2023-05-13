import ApiRoutes from '@/cdn/enums/ApiRoutes';
import QueryKeys from '@/cdn/enums/QueryKeys';
import { UseGet } from '@/cdn/types/Query';
import useGet from '@/cdn/hooks/useGet';
import { Animal } from '@/features/animals/types/Animal';

const useGetAnimal = (props: UseGet<Animal>) => {
  return useGet<Animal>({
    url: ApiRoutes.ANIMALS + '/' + props.entityId,
    token: props.token,
    key: QueryKeys.ANIMALS,
    onSuccess: props.onSuccess,
    onError: props.onError,
  });
};

export default useGetAnimal;
