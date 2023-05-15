import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import AppPages from '@/cdn/enums/AppPages';
import { useAuthContext } from '@/features/authentication/AuthContext';
import CreateOrganizationCard from '@/features/organization/templates/CreateOrganizationCard';
import ProgressSpinner from '@/ui/atoms/ProgressSpinner';
import BackOfficeLayout from '@/ui/organisms/BackOfficeLayout';

type AuthGuard = {
  children: ReactNode;
};

const AuthGuard = (props: AuthGuard) => {
  const { publicPage, token, loading, organizationPage, organization } =
    useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!publicPage && !loading && !token) {
      router.push(AppPages.AUTH_SIGN_IN);
    }
  }, [publicPage, loading, token, router]);

  return (
    <>
      {publicPage && <>{props.children}</>}
      {!loading && !publicPage && token && !organizationPage && (
        <>{props.children}</>
      )}
      {!loading &&
        !publicPage &&
        token &&
        organizationPage &&
        !organization && (
          <BackOfficeLayout>
            <main>
              <CreateOrganizationCard />
            </main>
          </BackOfficeLayout>
        )}
      {!loading && !publicPage && token && organizationPage && organization && (
        <>{props.children}</>
      )}
      {loading && !publicPage && organizationPage && (
        <LoadingWrapper>
          <ProgressSpinner />
        </LoadingWrapper>
      )}
    </>
  );
};

const LoadingWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default AuthGuard;
