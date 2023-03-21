import styled from 'styled-components';
import { SubmitHandler } from 'react-hook-form';
import { AppPages } from '@/cdn/enums/AppPages';
import ForgotPassword from '@/features/authentication/types/ForgotPassword';
import ForgotPasswordForm from '@/ui/organisms/forms/ForgotPasswordForm';
import Card from '@/ui/atoms/Card';
import Link from '@/ui/atoms/Link';

const ForgotPasswordTemplate = () => {
  const onSubmit: SubmitHandler<ForgotPassword> = (
    fieldValues: ForgotPassword
  ) => {
    console.log(fieldValues);
  };
  const submitError = undefined;

  return (
    <StyledCard>
      <Section>
        <Title>Mot de passe oublié</Title>
        <Help>
          Saisissez l&apos;adresse email liée à votre compte pour changer votre
          mot de passe
        </Help>
        <ForgotPasswordForm onSubmit={onSubmit} submitError={submitError} />
        <LinksWrapper>
          <StyledLink href={AppPages.AUTH_SIGN_IN}>
            J&apos;ai déjà un compte
          </StyledLink>
          <StyledLink href={AppPages.AUTH_SIGN_UP}>Créer un compte</StyledLink>
        </LinksWrapper>
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
  gap: 2rem;
`;

const StyledLink = styled(Link)`
  font-weight: 600;
`;

export default ForgotPasswordTemplate;
