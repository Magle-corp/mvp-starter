import styled from 'styled-components';
import { SubmitHandler } from 'react-hook-form';
import { AppPages } from '@/cdn/enums/AppPages';
import SignUp from '@/features/authentication/types/SignUp';
import SignUpForm from '@/ui/organisms/forms/SignUpForm';
import Card from '@/ui/atoms/Card';
import Link from '@/ui/atoms/Link';

const SignUpTemplate = () => {
  const onSubmit: SubmitHandler<SignUp> = (fieldValues: SignUp) => {
    console.log(fieldValues);
  };
  const submitError = undefined;

  return (
    <StyledCard>
      <Section>
        <Title>Inscription</Title>
        <SignUpForm onSubmit={onSubmit} submitError={submitError} />
        <LinksWrapper>
          <StyledLink href={AppPages.AUTH_SIGN_IN}>
            J&apos;ai déjà un compte
          </StyledLink>
          <StyledLink href="#">
            Conditions générales d&apos;utilisation
          </StyledLink>
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

export default SignUpTemplate;
