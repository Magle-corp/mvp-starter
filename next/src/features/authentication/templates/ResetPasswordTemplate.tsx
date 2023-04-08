import { useRouter } from 'next/router';
import { SubmitHandler } from 'react-hook-form';
import AppPages from '@/cdn/enums/AppPages';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import usePost from '@/cdn/hooks/usePost';
import { ResetPassword } from '@/features/authentication/types/AuthFormSchema';
import ResetPasswordForm from '@/features/authentication/forms/ResetPasswordForm';
import AuthCard from '@/features/authentication/components/AuthCard';
import CongratsWrapper from '@/features/authentication/components/CongratsWrapper';
import LinksWrapper from '@/features/authentication/components/LinksWrapper';
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
    <AuthCard title="Changer mon mot de passe">
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
            <p>Mot de passe enregistré 🔒</p>
            <p>Utilisez votre nouveau mot de passe pour vous connecter</p>
          </CongratsWrapper>
          <LinksWrapper>
            <Link href={AppPages.AUTH_SIGN_IN}>Se connecter</Link>
          </LinksWrapper>
        </>
      )}
    </AuthCard>
  );
};

export default ResetPasswordTemplate;
