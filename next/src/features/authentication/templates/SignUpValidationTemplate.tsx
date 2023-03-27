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

  const SignUpValidationMutation = usePost<SignUpValidation>(
    ApiRoutes.SIGN_UP_VALIDATION
  );

  useEffect(() => {
    if (token && typeof token === 'string') {
      SignUpValidationMutation.mutate({
        token,
      });
    }
  }, [token, SignUpValidationMutation]);

  return (
    <StyledCard>
      <Section>
        <Title>Inscription</Title>
        {SignUpValidationMutation.isLoading && <ProgressSpinner />}
        {SignUpValidationMutation.isError &&
          SignUpValidationMutation.error?.response?.data.message && (
            <Wrapper>
              <Error>
                {SignUpValidationMutation.error?.response?.data.message}
              </Error>
              <Button label="Recevoir un nouveau code" />
            </Wrapper>
          )}
        {SignUpValidationMutation.isError &&
          SignUpValidationMutation.error?.response?.data[
            'hydra:description'
          ] && (
            <Error>
              {
                SignUpValidationMutation.error?.response?.data[
                  'hydra:description'
                ]
              }
            </Error>
          )}
        {SignUpValidationMutation.isSuccess && (
          <>
            <Wrapper>
              <Congrats>Inscription validée 🎉</Congrats>
            </Wrapper>
            <StyledLink href={AppPages.AUTH_SIGN_IN}>Se connecter</StyledLink>
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
`;

const Error = styled.p`
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
`;

const StyledLink = styled(Link)`
  font-weight: 600;
`;

const Congrats = styled.p`
  font-weight: 600;
`;

export default SignUpValidationTemplate;
