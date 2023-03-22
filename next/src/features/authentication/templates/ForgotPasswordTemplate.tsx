import styled from 'styled-components';
import { SubmitHandler } from 'react-hook-form';
import AppPages from '@/cdn/enums/AppPages';
import usePost from '@/cdn/queries/usePost';
import ForgotPassword from '@/features/authentication/types/ForgotPassword';
import ForgotPasswordForm from '@/features/authentication/forms/ForgotPasswordForm';
import Card from '@/ui/atoms/Card';
import Link from '@/ui/atoms/Link';
import ProgressSpinner from '@/ui/atoms/ProgressSpinner';

const ForgotPasswordTemplate = () => {
  const forgotPasswordMutation = usePost<ForgotPassword>(
    '/api/mockHttpRequest?status=200'
  );

  const onSubmit: SubmitHandler<ForgotPassword> = (
    fieldValues: ForgotPassword
  ) => {
    forgotPasswordMutation.mutate(fieldValues);
  };

  const mutationErrorMsg =
    'Un problème technique nous empêche de procéder au changement de votre mot de passe';

  return (
    <StyledCard>
      <Section>
        <Title>Mot de passe oublié</Title>
        {!forgotPasswordMutation.isLoading &&
          !forgotPasswordMutation.isSuccess && (
            <>
              <Help>
                Saisissez l&apos;adresse email liée à votre compte pour changer
                votre mot de passe
              </Help>
              <ForgotPasswordForm
                onSubmit={onSubmit}
                submitError={
                  forgotPasswordMutation.isError ? mutationErrorMsg : undefined
                }
              />
              <LinksWrapper>
                <StyledLink href={AppPages.AUTH_SIGN_IN}>
                  J&apos;ai déjà un compte
                </StyledLink>
                <StyledLink href={AppPages.AUTH_SIGN_UP}>
                  Créer un compte
                </StyledLink>
              </LinksWrapper>
            </>
          )}
        {forgotPasswordMutation.isLoading && <ProgressSpinner />}
        {forgotPasswordMutation.isSuccess && (
          <>
            <CongratsWrapper>
              <Congrats>Demande enregistrée ✅</Congrats>
              <p>
                Finalisez le changement de votre mot de passe en consultant
                l&apos;email que nous venons de vous envoyer
              </p>
            </CongratsWrapper>
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
  text-align: center;
`;

const Help = styled.p`
  width: 80%;
  text-align: center;
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

const CongratsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-align: center;
`;

const Congrats = styled.p`
  font-weight: 600;
`;

export default ForgotPasswordTemplate;
