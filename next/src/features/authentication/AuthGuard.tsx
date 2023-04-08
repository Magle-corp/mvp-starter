import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import AppPages from '@/cdn/enums/AppPages';
import AppPublicPages from '@/cdn/enums/AppPlubicPages';
import { useAuthContext } from '@/features/authentication/AuthContext';
import ProgressSpinner from '@/ui/atoms/ProgressSpinner';

type AuthGuard = {
  children: ReactNode;
};

const AuthGuard = (props: AuthGuard) => {
  const { authenticated, loading } = useAuthContext();
  const router = useRouter();
  const publicPages = Object.values(AppPublicPages) as string[];

  useEffect(() => {
    if (!loading && !authenticated && !publicPages.includes(router.pathname)) {
      router.push(AppPages.AUTH_SIGN_IN);
    }
  }, [authenticated, loading, router.pathname]);

  return (
    <>
      {publicPages.includes(router.pathname) && <>{props.children}</>}
      {!publicPages.includes(router.pathname) && loading && (
        <LoadingWrapper>
          <ProgressSpinner />
        </LoadingWrapper>
      )}
      {!publicPages.includes(router.pathname) && !loading && (
        <>{props.children}</>
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
