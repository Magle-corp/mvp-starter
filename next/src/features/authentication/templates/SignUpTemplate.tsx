import styled from 'styled-components';
import { SubmitHandler } from 'react-hook-form';
import AppPages from '@/cdn/enums/AppPages';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import usePost from '@/cdn/queries/usePost';
import SignUp from '@/features/authentication/types/SignUp';
import SignUpForm from '@/features/authentication/forms/SignUpForm';
import Card from '@/ui/atoms/Card';
import Link from '@/ui/atoms/Link';

const SignUpTemplate = () => {
  const signUpMutation = usePost<SignUp>(ApiRoutes.USER);

  const onSubmit: SubmitHandler<SignUp> = (fieldValues: SignUp) => {
    signUpMutation.mutate(fieldValues);
  };

  return (
    <StyledCard>
      <Section>
        <Title>Inscription</Title>
        {!signUpMutation.isSuccess && (
          <>
            <SignUpForm
              onSubmit={onSubmit}
              submitLoading={signUpMutation.isLoading}
              submitError={signUpMutation.error?.response?.data.message}
            />
            <LinksWrapper>
              <StyledLink href={AppPages.AUTH_SIGN_IN}>
                J&apos;ai déjà un compte
              </StyledLink>
              <StyledLink href="#">
                Conditions générales d&apos;utilisation
              </StyledLink>
            </LinksWrapper>
          </>
        )}
        {signUpMutation.isSuccess && (
          <>
            <CongratsWrapper>
              <Congrats>Inscription enregistrée 👍</Congrats>
              <p>
                Finalisez votre inscription en consultant le mail que nous
                venons de vous envoyer
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

export default SignUpTemplate;
