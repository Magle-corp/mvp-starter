import styled from 'styled-components';
import { SubmitHandler } from 'react-hook-form';
import SignIn from '@/features/authentication/types/SignIn';
import SignInForm from '@/ui/organisms/forms/SignInForm';
import Card from '@/ui/atoms/Card';
import Link from '@/ui/atoms/Link';

const SignInTemplate = () => {
  const onSubmit: SubmitHandler<SignIn> = (fieldValues: SignIn) => {
    console.log(fieldValues);
  };
  const submitError = undefined;

  return (
    <StyledCard>
      <Section>
        <Title>Connexion</Title>
        <SignInForm onSubmit={onSubmit} submitError={submitError} />
        <LinksWrapper>
          <StyledLink href="#">Mot de passe oublié</StyledLink>
          <StyledLink href="#">Créer un compte</StyledLink>
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

export default SignInTemplate;
