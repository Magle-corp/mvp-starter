import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import QueryKeys from '@/cdn/enums/QueryKeys';
import useGet from '@/cdn/hooks/useGet';
import { useAuthContext } from '@/features/authentication/AuthContext';
import OrganizationContext from '@/features/organization/types/OrganizationContext';
import Organization from '@/features/organization/types/Organization';

type Props = {
  children: ReactNode;
};

// @ts-ignore
const Context = createContext<OrganizationContext>();

export function OrganizationContextWrapper({ children }: Props) {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { token, tokenPayload } = useAuthContext();

  const organizationQuery = useGet<Organization>({
    url: ApiRoutes.ORGANIZATION + '/' + tokenPayload?.organizations[0],
    token: token?.token ?? undefined,
    key: QueryKeys.ORGANIZATIONS,
    onSuccess: (data) => {
      setOrganization(data.data);
      setLoading(false);
    },
    onError: () => {
      // TODO: CHIPS POUR INFORMER UTILISATEUR ERREUR
      setLoading(false);
    },
    enabled: false,
  });

  useEffect(() => {
    if (tokenPayload && tokenPayload.organizations.length > 0) {
      organizationQuery.refetch();
    } else {
      setLoading(false);
    }
  }, [tokenPayload]);

  const sharedStates: OrganizationContext = {
    organization,
    loading,
  };

  return <Context.Provider value={sharedStates}>{children}</Context.Provider>;
}

export function useOrganizationContext() {
  return useContext(Context);
}
