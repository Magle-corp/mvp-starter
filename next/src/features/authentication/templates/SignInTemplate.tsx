import { useRouter } from 'next/router';
import styled from 'styled-components';
import { SubmitHandler } from 'react-hook-form';
import AppPages from '@/cdn/enums/AppPages';
import MockHttpStatusRoutes from '@/cdn/enums/MockHttpStatusRoutes';
import usePost from '@/cdn/queries/usePost';
import SignIn from '@/features/authentication/types/SignIn';
import SignInForm from '@/ui/organisms/forms/SignInForm';
import Card from '@/ui/atoms/Card';
import Link from '@/ui/atoms/Link';
import ProgressSpinner from '@/ui/atoms/ProgressSpinner';

const SignInTemplate = () => {
  const router = useRouter();

  const signInMutation = usePost<SignIn>(MockHttpStatusRoutes.OK, () =>
    router.push('/')
  );

  const onSubmit: SubmitHandler<SignIn> = (fieldValues: SignIn) => {
    signInMutation.mutate(fieldValues);
  };

  const mutationErrorMsg =
    'Un problème technique nous empêche de vous connecter';

  return (
    <StyledCard>
      <Section>
        <Title>Connexion</Title>
        {!signInMutation.isLoading && (
          <>
            <SignInForm
              onSubmit={onSubmit}
              submitError={
                signInMutation.isError ? mutationErrorMsg : undefined
              }
            />
            <LinksWrapper>
              <StyledLink href={AppPages.AUTH_FORGOT_PASSWORD}>
                Mot de passe oublié
              </StyledLink>
              <StyledLink href={AppPages.AUTH_SIGN_UP}>
                Créer un compte
              </StyledLink>
            </LinksWrapper>
          </>
        )}
        {signInMutation.isLoading && <ProgressSpinner />}
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

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const StyledLink = styled(Link)`
  font-weight: 600;
`;

export default SignInTemplate;
