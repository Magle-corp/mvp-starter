import { useRouter } from 'next/router';
import { SubmitHandler } from 'react-hook-form';
import AppPages from '@/cdn/enums/AppPages';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import usePost from '@/cdn/queries/usePost';
import SignIn from '@/features/authentication/types/SignIn';
import SignInForm from '@/features/authentication/forms/SignInForm';
import AuthCard from '@/features/authentication/components/AuthCard';
import LinksWrapper from '@/features/authentication/components/LinksWrapper';
import Link from '@/ui/atoms/Link';

const SignInTemplate = () => {
  const router = useRouter();

  const signInMutation = usePost<SignIn>(ApiRoutes.AUTH_SIGN_IN, () =>
    router.push('/')
  );

  const onSubmit: SubmitHandler<SignIn> = (fieldValues: SignIn) => {
    signInMutation.mutate(fieldValues);
  };

  return (
    <AuthCard title="Connexion">
      {!signInMutation.isSuccess && (
        <>
          <SignInForm
            onSubmit={onSubmit}
            submitLoading={signInMutation.isLoading}
            submitError={signInMutation.error?.response?.data.message}
          />
          <LinksWrapper>
            <Link href={AppPages.AUTH_FORGOT_PASSWORD}>
              Mot de passe oublié
            </Link>
            <Link href={AppPages.AUTH_SIGN_UP}>Créer un compte</Link>
          </LinksWrapper>
        </>
      )}
    </AuthCard>
  );
};

export default SignInTemplate;
