import { useRouter } from 'next/router';
import { SubmitHandler } from 'react-hook-form';
import AppPages from '@/cdn/enums/AppPages';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import usePost from '@/cdn/hooks/usePost';
import { useAuthContext } from '@/features/authentication/AuthContext';
import { SignIn } from '@/features/authentication/types/Auth';
import SignInForm from '@/features/authentication/forms/SignInForm';
import AuthCard from '@/features/authentication/components/AuthCard';
import LinksWrapper from '@/features/authentication/components/LinksWrapper';
import Link from '@/ui/atoms/Link';

const SignInCard = () => {
  const router = useRouter();
  const { login } = useAuthContext();

  const signInDefaultValues: SignIn = {
    email: '',
    password: '',
  };

  const signInMutation = usePost<SignIn>({
    url: ApiRoutes.AUTH_SIGN_IN,
    onSuccess: ({ data }) => {
      login(data);
      router.push(AppPages.BO_DASHBOARD);
    },
  });

  const onSubmit: SubmitHandler<SignIn> = (fieldValues: SignIn) => {
    signInMutation.mutate(fieldValues);
  };

  return (
    <>
      {!signInMutation.isSuccess && (
        <AuthCard title="Connexion" titleSize="large" titlePosition="center">
          {!signInMutation.isSuccess && (
            <>
              <SignInForm
                defaultValues={signInDefaultValues}
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
      )}
    </>
  );
};

export default SignInCard;
