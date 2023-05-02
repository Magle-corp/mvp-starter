import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import QueryKeys from '@/cdn/enums/QueryKeys';
import useGet from '@/cdn/hooks/useGet';
import { useAuthContext } from '@/features/authentication/AuthContext';
import OrganizationContext from '@/features/organization/types/OrganizationContext';
import Organization from '@/features/organization/types/Organization';
import AppPages from '@/cdn/enums/AppPages';

type Props = {
  children: ReactNode;
};

// @ts-ignore
const Context = createContext<OrganizationContext>();

export function OrganizationContextWrapper({ children }: Props) {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const { token, tokenPayload } = useAuthContext();

  const router = useRouter();
  const unguardedPages: string[] = [AppPages.BO_SETTINGS_PROFILE];
  const unguardedPage = unguardedPages.includes(router.pathname);

  const organizationQuery = useGet<Organization>({
    url: ApiRoutes.ORGANIZATIONS + '/' + tokenPayload?.organizations[0],
    token: token?.token ?? undefined,
    key: QueryKeys.ORGANIZATIONS,
    enabled: false,
    onSuccess: (data) => {
      setOrganization(data.data);
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
      setError(true);
    },
  });

  useEffect(() => {
    if (tokenPayload && tokenPayload.organizations.length > 0) {
      organizationQuery.refetch();
    } else {
      setOrganization(null);
      setLoading(false);
    }
  }, [unguardedPage, tokenPayload]);

  const sharedStates: OrganizationContext = {
    unguardedPage,
    organization,
    loading,
    error,
  };

  return <Context.Provider value={sharedStates}>{children}</Context.Provider>;
}

export function useOrganizationContext() {
  return useContext(Context);
}
