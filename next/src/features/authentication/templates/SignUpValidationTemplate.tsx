import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import AppPages from '@/cdn/enums/AppPages';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import usePost from '@/cdn/queries/usePost';
import SignUpValidation from '@/features/authentication/types/SignUpValidation';
import Button from '@/ui/atoms/Button';
import Card from '@/ui/atoms/Card';
import Link from '@/ui/atoms/Link';
import ProgressSpinner from '@/ui/atoms/ProgressSpinner';

const SignUpValidationTemplate = () => {
  const router = useRouter();
  const { token } = router.query;

  const signUpValidationMutation = usePost<SignUpValidation>(
    ApiRoutes.AUTH_SIGN_UP_VALIDATION
  );

  const reSendEmailSignUpValidationMutation = usePost<SignUpValidation>(
    ApiRoutes.AUTH_RE_SEND_VALIDATION_EMAIL
  );

  useEffect(() => {
    if (token && typeof token === 'string') {
      signUpValidationMutation.mutate({
        token,
      });
    }
  }, [token]);

  const reSendEmailSignUpValidation = () => {
    if (token && typeof token === 'string') {
      reSendEmailSignUpValidationMutation.mutate({
        token,
      });
    }
  };

  const SignUpValidationSuccess = () => {
    return (
      <>
        <Wrapper>
          <Congrats>Inscription validée 🎉</Congrats>
          <p>
            Vous pouvez dorénavent vous connecter et profiter de nos services
          </p>
        </Wrapper>
        <StyledLink href={AppPages.AUTH_SIGN_IN}>Se connecter</StyledLink>
      </>
    );
  };

  const SignUpValidationError = () => {
    return (
      <>
        <Error>{signUpValidationMutation.error?.response?.data.message}</Error>
        <StyledLink href={AppPages.AUTH_SIGN_IN}>Se connecter</StyledLink>
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
            La validité du lien a expiré, cliquer sur le bouton suivant pour
            recevoir un nouveau lien
          </p>
        </Wrapper>
        <Button
          onClick={reSendEmailSignUpValidation}
          loading={reSendEmailSignUpValidationMutation.isLoading}
          disabled={
            reSendEmailSignUpValidationMutation.isLoading ||
            reSendEmailSignUpValidationMutation.isSuccess
          }
          label="Recevoir un nouveau lien"
        />
      </>
    );
  };

  const ReSendEmailSignUpValidation = () => {
    return (
      <Wrapper>
        <Congrats>Email envoyé 👍</Congrats>
        <p>
          Finalisez votre inscription en consultant le mail que nous venons de
          vous envoyer
        </p>
      </Wrapper>
    );
  };

  const ReSendSignUpValidationEmailError = () => {
    return (
      <Wrapper>
        <Error>
          {reSendEmailSignUpValidationMutation.error?.response?.data.message}
        </Error>
      </Wrapper>
    );
  };

  return (
    <StyledCard>
      <Section>
        <Title>Inscription</Title>
        {(reSendEmailSignUpValidationMutation.isIdle ||
          reSendEmailSignUpValidationMutation.isLoading) && (
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
            {reSendEmailSignUpValidationMutation.isSuccess && (
              <ReSendEmailSignUpValidation />
            )}
            {reSendEmailSignUpValidationMutation.isError && (
              <ReSendSignUpValidationEmailError />
            )}
          </>
        )}
      </Section>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 360px;
  margin: 3rem auto 0;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.25;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
`;

const Error = styled.p`
  color: ${({ theme }) => theme.colors.error};
`;

const StyledLink = styled(Link)`
  font-weight: 600;
`;

const Congrats = styled.p`
  font-weight: 600;
`;

export default SignUpValidationTemplate;
