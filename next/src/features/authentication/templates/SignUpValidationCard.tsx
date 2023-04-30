import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import AppPages from '@/cdn/enums/AppPages';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import usePost from '@/cdn/hooks/usePost';
import { SignUpValidation } from '@/features/authentication/types/Auth';
import AuthCard from '@/features/authentication/components/AuthCard';
import CongratsWrapper from '@/features/authentication/components/CongratsWrapper';
import LinksWrapper from '@/features/authentication/components/LinksWrapper';
import Button from '@/ui/atoms/Button';
import Link from '@/ui/atoms/Link';
import ProgressSpinner from '@/ui/atoms/ProgressSpinner';

const SignUpValidationCard = () => {
  const router = useRouter();
  const { token } = router.query;

  const signUpValidationMutation = usePost<SignUpValidation>({
    url: ApiRoutes.AUTH_SIGN_UP_VALIDATION,
  });

  const reSendSignUpValidationEmailMutation = usePost<SignUpValidation>({
    url: ApiRoutes.AUTH_RE_SEND_SIGN_UP_VALIDATION_EMAIL,
  });

  useEffect(() => {
    if (token && typeof token === 'string') {
      signUpValidationMutation.mutate({
        token,
      });
    }
  }, [token]);

  const reSendEmailSignUpValidation = () => {
    if (token && typeof token === 'string') {
      reSendSignUpValidationEmailMutation.mutate({
        token,
      });
    }
  };

  const SignUpValidationSuccess = () => {
    return (
      <>
        <CongratsWrapper>
          <p>Inscription validée 🎉</p>
          <p>
            Vous pouvez dorénavant vous connecter et profiter de nos services
          </p>
        </CongratsWrapper>
        <LinksWrapper>
          <Link href={AppPages.AUTH_SIGN_IN}>Se connecter</Link>
        </LinksWrapper>
      </>
    );
  };

  const SignUpValidationError = () => {
    return (
      <>
        <Error>{signUpValidationMutation.error?.response?.data.message}</Error>
        <LinksWrapper>
          <Link href={AppPages.AUTH_SIGN_IN}>Se connecter</Link>
        </LinksWrapper>
      </>
    );
  };

  const SignUpValidationExpiredToken = () => {
    return (
      <>
        <Wrapper>
          <Error>
            {signUpValidationMutation.error?.response?.data.message}
          </Error>
          <p>
            La validité du lien a expiré, cliquez sur le bouton suivant pour
            recevoir un nouveau lien
          </p>
        </Wrapper>
        <StyledButton
          onClick={reSendEmailSignUpValidation}
          loading={reSendSignUpValidationEmailMutation.isLoading}
          disabled={
            reSendSignUpValidationEmailMutation.isLoading ||
            reSendSignUpValidationEmailMutation.isSuccess
          }
          label="Recevoir un nouveau lien"
          size="small"
        />
      </>
    );
  };

  const ReSendEmailSignUpValidation = () => {
    return (
      <CongratsWrapper>
        <p>Email envoyé 👍</p>
        <p>
          Finalisez votre inscription en consultant le mail que nous venons de
          vous envoyer
        </p>
      </CongratsWrapper>
    );
  };

  const ReSendSignUpValidationEmailError = () => {
    return (
      <Wrapper>
        <Error>
          {reSendSignUpValidationEmailMutation.error?.response?.data.message}
        </Error>
      </Wrapper>
    );
  };

  return (
    <AuthCard title="Inscription" titleSize="large" titlePosition="center">
      {(reSendSignUpValidationEmailMutation.isIdle ||
        reSendSignUpValidationEmailMutation.isLoading) && (
        <>
          {signUpValidationMutation.isLoading && <ProgressSpinner />}
          {signUpValidationMutation.isSuccess && <SignUpValidationSuccess />}
          {signUpValidationMutation.isError && (
            <>
              {signUpValidationMutation.error?.response?.status === 409 && (
                <SignUpValidationError />
              )}
              {signUpValidationMutation.error?.response?.status === 401 && (
                <SignUpValidationExpiredToken />
              )}
            </>
          )}
        </>
      )}
      {signUpValidationMutation.isError && (
        <>
          {reSendSignUpValidationEmailMutation.isSuccess && (
            <ReSendEmailSignUpValidation />
          )}
          {reSendSignUpValidationEmailMutation.isError && (
            <ReSendSignUpValidationEmailError />
          )}
        </>
      )}
      {!token && !signUpValidationMutation.isLoading && (
        <LinksWrapper>
          <Link href={AppPages.AUTH_SIGN_IN}>Se connecter</Link>
        </LinksWrapper>
      )}
    </AuthCard>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
`;

// TODO: use appropriate component instead ?
const Error = styled.p`
  color: ${({ theme }) => theme.colors.error};
`;

const StyledButton = styled(Button)`
  margin: 0 auto;
`;

export default SignUpValidationCard;
