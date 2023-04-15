import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import AppPages from '@/cdn/enums/AppPages';
import { useAuthContext } from '@/features/authentication/AuthContext';
import ProgressSpinner from '@/ui/atoms/ProgressSpinner';

type AuthGuard = {
  children: ReactNode;
};

const AuthGuard = (props: AuthGuard) => {
  const { publicPage, token, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!publicPage && !loading && !token) {
      router.push(AppPages.AUTH_SIGN_IN);
    }
  }, [publicPage, loading, token, router]);

  return (
    <>
      {publicPage && <>{props.children}</>}
      {!publicPage && !loading && token && <>{props.children}</>}
      {!publicPage && loading && (
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
