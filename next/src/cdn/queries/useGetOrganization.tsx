import ApiRoutes from '@/cdn/enums/ApiRoutes';
import QueryKeys from '@/cdn/enums/QueryKeys';
import { UseGet } from '@/cdn/types/Query';
import useGet from '@/cdn/hooks/useGet';
import Organization from '@/features/organization/types/Organization';

const useGetOrganization = (props: UseGet<Organization>) => {
  return useGet<Organization>({
    url: ApiRoutes.ORGANIZATIONS + '/' + props.entityId,
    token: props.token,
    key: QueryKeys.ORGANIZATIONS,
    onSuccess: props.onSuccess,
    onError: props.onError,
  });
};

export default useGetOrganization;
