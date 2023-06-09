import { useRouter } from 'next/router';
import { SubmitHandler } from 'react-hook-form';
import AppPages from '@/cdn/enums/AppPages';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import usePost from '@/cdn/hooks/usePost';
import { ResetPasswordFormSchema } from '@/features/authentication/forms/ResetPasswordForm';
import ResetPasswordForm from '@/features/authentication/forms/ResetPasswordForm';
import AuthCard from '@/features/authentication/components/AuthCard';
import CongratsWrapper from '@/features/authentication/components/CongratsWrapper';
import LinksWrapper from '@/features/authentication/components/LinksWrapper';
import Link from '@/ui/atoms/Link';

const ResetPasswordCard = () => {
  const router = useRouter();
  const { token } = router.query;

  const resetPasswordDefaultValues: ResetPasswordFormSchema = {
    password: '',
    confirmPassword: '',
  };

  const resetPasswordMutation = usePost<ResetPasswordFormSchema>({
    url: ApiRoutes.AUTH_RESET_PASSWORD,
  });

  const onSubmit: SubmitHandler<ResetPasswordFormSchema> = (
    fieldValues: ResetPasswordFormSchema
  ) => resetPasswordMutation.mutate({ ...fieldValues, token: token as string });

  return (
    <AuthCard title="Changer mon mot de passe">
      {token && (
        <>
          {!resetPasswordMutation.isSuccess && (
            <>
              <ResetPasswordForm
                defaultValues={resetPasswordDefaultValues}
                onSubmit={onSubmit}
                submitLoading={resetPasswordMutation.isLoading}
                submitError={
                  resetPasswordMutation.error?.response?.data.message
                }
              />
              {resetPasswordMutation.isError && (
                <LinksWrapper>
                  <Link href={AppPages.AUTH_FORGOT_PASSWORD}>
                    Mot de passe oublié
                  </Link>
                </LinksWrapper>
              )}
            </>
          )}
          {resetPasswordMutation.isSuccess && (
            <>
              <CongratsWrapper>
                <p>Mot de passe enregistré 🔒</p>
                <p>Utilisez votre nouveau mot de passe pour vous connecter</p>
              </CongratsWrapper>
              <LinksWrapper>
                <Link href={AppPages.AUTH_SIGN_IN}>Se connecter</Link>
              </LinksWrapper>
            </>
          )}
        </>
      )}
      {!token && (
        <LinksWrapper>
          <Link href={AppPages.AUTH_SIGN_IN}>Se connecter</Link>
        </LinksWrapper>
      )}
    </AuthCard>
  );
};

export default ResetPasswordCard;
