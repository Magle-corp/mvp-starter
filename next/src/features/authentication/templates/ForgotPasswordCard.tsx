import styled from 'styled-components';
import { SubmitHandler } from 'react-hook-form';
import AppPages from '@/cdn/enums/AppPages';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import usePost from '@/cdn/hooks/usePost';
import { ForgotPasswordFormSchema } from '@/features/authentication/forms/ForgotPasswordForm';
import ForgotPasswordForm from '@/features/authentication/forms/ForgotPasswordForm';
import AuthCard from '@/features/authentication/components/AuthCard';
import LinksWrapper from '@/features/authentication/components/LinksWrapper';
import CongratsWrapper from '@/features/authentication/components/CongratsWrapper';
import Link from '@/ui/atoms/Link';

const ForgotPasswordCard = () => {
  const forgotPasswordDefaultValues: ForgotPasswordFormSchema = {
    email: '',
  };

  const forgotPasswordMutation = usePost<ForgotPasswordFormSchema>({
    url: ApiRoutes.AUTH_FORGOT_PASSWORD,
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormSchema> = (
    fieldValues: ForgotPasswordFormSchema
  ) => forgotPasswordMutation.mutate(fieldValues);

  return (
    <AuthCard
      title="Mot de passe oublié"
      titleSize="large"
      titlePosition="center"
    >
      {!forgotPasswordMutation.isSuccess && !forgotPasswordMutation.isError && (
        <>
          <Help>
            Saisissez l&apos;adresse email liée à votre compte pour changer
            votre mot de passe
          </Help>
          <ForgotPasswordForm
            defaultValues={forgotPasswordDefaultValues}
            onSubmit={onSubmit}
            submitLoading={forgotPasswordMutation.isLoading}
            submitError={undefined}
          />
          <LinksWrapper>
            <Link href={AppPages.AUTH_SIGN_IN}>J&apos;ai déjà un compte</Link>
            <Link href={AppPages.AUTH_SIGN_UP}>Créer un compte</Link>
          </LinksWrapper>
        </>
      )}
      {(forgotPasswordMutation.isSuccess || forgotPasswordMutation.isError) && (
        <>
          <CongratsWrapper>
            <p>Demande enregistrée ✅</p>
            <p>
              Si nous connaissons cette adresse email vous recevrez un email
              contenant un lien pour changer votre mot de passe
            </p>
          </CongratsWrapper>
          <LinksWrapper>
            <Link href={AppPages.AUTH_SIGN_IN}>Se connecter</Link>
          </LinksWrapper>
        </>
      )}
    </AuthCard>
  );
};

const Help = styled.p`
  text-align: center;
`;

export default ForgotPasswordCard;
