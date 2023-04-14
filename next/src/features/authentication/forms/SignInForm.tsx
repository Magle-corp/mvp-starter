import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, Schema, string } from 'yup';
import { SignIn } from '@/features/authentication/types/AuthFormSchema';
import FormError from '@/features/authentication/components/FormError';
import InputsWrapper from '@/features/authentication/components/InputsWrapper';
import Form from '@/features/authentication/components/Form';
import FormFieldText from '@/ui/molecules/formFields/FormFieldText';
import FormFieldPassword from '@/ui/molecules/formFields/FormFieldPassword';
import Button from '@/ui/atoms/Button';

type SignInForm = {
  onSubmit: SubmitHandler<SignIn>;
  submitLoading: boolean;
  submitError: string | undefined;
};

const SignInForm = (props: SignInForm) => {
  const schema: Schema<SignIn> = object({
    email: string()
      .min(5, 'Minimum 5 caractères')
      .max(80, 'Maximum 80 caractères')
      .email('Format invalide')
      .required('Champ requis'),
    password: string()
      .min(8, 'Minimum 8 caractères')
      .max(25, 'Maximum 25 caractères')
      .required('Champ requis'),
  });

  const defaultValues: SignIn = {
    email: '',
    password: '',
  };

  const form = useForm<SignIn>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  return (
    <Form>
      {props.submitError && <FormError>{props.submitError}</FormError>}
      <InputsWrapper>
        <FormFieldText<SignIn>
          label="adresse email *"
          name="email"
          control={form.control}
          error={form.formState.errors.email}
        />
        <FormFieldPassword<SignIn>
          label="mot de passe *"
          name="password"
          control={form.control}
          error={form.formState.errors.password}
          feedback={false}
        />
      </InputsWrapper>
      <Button
        label="Se connecter"
        onClick={form.handleSubmit(props.onSubmit)}
        loading={props.submitLoading}
      />
    </Form>
  );
};

export default SignInForm;
