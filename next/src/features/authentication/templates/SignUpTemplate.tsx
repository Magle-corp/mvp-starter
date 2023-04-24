import { SubmitHandler } from 'react-hook-form';
import AppPages from '@/cdn/enums/AppPages';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import usePost from '@/cdn/hooks/usePost';
import { SignUp } from '@/features/authentication/types/AuthFormSchema';
import SignUpForm from '@/features/authentication/forms/SignUpForm';
import AuthCard from '@/features/authentication/components/AuthCard';
import LinksWrapper from '@/features/authentication/components/LinksWrapper';
import CongratsWrapper from '@/features/authentication/components/CongratsWrapper';
import Link from '@/ui/atoms/Link';

const SignUpTemplate = () => {
  const signUpDefaultValues: SignUp = {
    email: '',
    password: '',
    confirmPassword: '',
    acceptCGU: false,
  };

  const signUpMutation = usePost<SignUp>({ url: ApiRoutes.AUTH_SIGN_UP });

  const onSubmit: SubmitHandler<SignUp> = (fieldValues: SignUp) => {
    signUpMutation.mutate(fieldValues);
  };

  return (
    <AuthCard title="Inscription">
      {!signUpMutation.isSuccess && (
        <>
          <SignUpForm
            defaultValues={signUpDefaultValues}
            onSubmit={onSubmit}
            submitLoading={signUpMutation.isLoading}
            submitError={signUpMutation.error?.response?.data.message}
          />
          <LinksWrapper>
            <Link href={AppPages.AUTH_SIGN_IN}>J&apos;ai déjà un compte</Link>
            <Link href="#">Conditions générales d&apos;utilisation</Link>
          </LinksWrapper>
        </>
      )}
      {signUpMutation.isSuccess && (
        <>
          <CongratsWrapper>
            <p>Inscription enregistrée 👍</p>
            <p>
              Finalisez votre inscription en cliquant sur le lien que nous
              venons de vous envoyer par email
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

export default SignUpTemplate;
