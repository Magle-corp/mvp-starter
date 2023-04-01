import styled from 'styled-components';
import { SubmitHandler } from 'react-hook-form';
import AppPages from '@/cdn/enums/AppPages';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import usePost from '@/cdn/queries/usePost';
import ForgotPassword from '@/features/authentication/types/ForgotPassword';
import ForgotPasswordForm from '@/features/authentication/forms/ForgotPasswordForm';
import Card from '@/ui/atoms/Card';
import Link from '@/ui/atoms/Link';

const ForgotPasswordTemplate = () => {
  const forgotPasswordMutation = usePost<ForgotPassword>(
    ApiRoutes.AUTH_FORGOT_PASSWORD
  );

  const onSubmit: SubmitHandler<ForgotPassword> = (
    fieldValues: ForgotPassword
  ) => {
    forgotPasswordMutation.mutate(fieldValues);
  };

  return (
    <StyledCard>
      <Section>
        <Title>Mot de passe oublié</Title>
        {!forgotPasswordMutation.isSuccess &&
          !forgotPasswordMutation.isError && (
            <>
              <Help>
                Saisissez l&apos;adresse email liée à votre compte pour changer
                votre mot de passe
              </Help>
              <ForgotPasswordForm
                onSubmit={onSubmit}
                submitLoading={forgotPasswordMutation.isLoading}
                submitError={undefined}
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
        {(forgotPasswordMutation.isSuccess ||
          forgotPasswordMutation.isError) && (
          <>
            <CongratsWrapper>
              <Congrats>Demande enregistrée ✅</Congrats>
              <p>
                Si nous connaissons cette adresse email vous recevrez un email
                contenant un lien pour changer votre mot de passe
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
