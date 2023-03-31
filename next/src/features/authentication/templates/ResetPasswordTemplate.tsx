import { useRouter } from 'next/router';
import styled from 'styled-components';
import { SubmitHandler } from 'react-hook-form';
import AppPages from '@/cdn/enums/AppPages';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import usePost from '@/cdn/queries/usePost';
import ResetPassword from '@/features/authentication/types/ResetPassword';
import ResetPasswordForm from '@/features/authentication/forms/ResetPasswordForm';
import Card from '@/ui/atoms/Card';
import Link from '@/ui/atoms/Link';

const ResetPasswordTemplate = () => {
  const router = useRouter();
  const { token } = router.query;

  const resetPasswordMutation = usePost<ResetPassword>(
    ApiRoutes.AUTH_RESET_PASSWORD
  );

  const onSubmit: SubmitHandler<ResetPassword> = (
    fieldValues: ResetPassword
  ) => {
    resetPasswordMutation.mutate({ ...fieldValues, token: token as string });
  };

  return (
    <StyledCard>
      <Section>
        <Title>Changer mon mot de passe</Title>
        {!resetPasswordMutation.isSuccess && (
          <ResetPasswordForm
            onSubmit={onSubmit}
            submitLoading={resetPasswordMutation.isLoading}
            submitError={resetPasswordMutation.error?.response?.data.message}
          />
        )}
        {resetPasswordMutation.isSuccess && (
          <>
            <CongratsWrapper>
              <Congrats>Mot de passe enregistré 🔒</Congrats>
              <p>Utilisez votre nouveau mot de passe pour vous connecter</p>
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

export default ResetPasswordTemplate;
