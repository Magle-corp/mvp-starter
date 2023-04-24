import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, Schema, string } from 'yup';
import { FormHandler } from '@/cdn/types/Form';
import { SignIn } from '@/features/authentication/types/AuthFormSchema';
import FormError from '@/ui/atoms/form/FormError';
import InputsWrapper from '@/ui/atoms/form/InputsWrapper';
import Form from '@/ui/atoms/form/Form';
import FormFieldText from '@/ui/molecules/formFields/FormFieldText';
import FormFieldPassword from '@/ui/molecules/formFields/FormFieldPassword';
import Button from '@/ui/atoms/Button';

const SignInForm = (props: FormHandler<SignIn>) => {
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

  const form = useForm<SignIn>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: props.defaultValues,
  });

  return (
    <Form>
      {props.submitError && <FormError>{props.submitError}</FormError>}
      <InputsWrapper>
        <FormFieldText<SignIn>
          label="adresse email *"
          name="email"
          control={form.control}
          error={form.formState.errors.email?.message}
          required
        />
        <FormFieldPassword<SignIn>
          label="mot de passe *"
          name="password"
          control={form.control}
          error={form.formState.errors.password?.message}
          feedback={false}
          required
        />
      </InputsWrapper>
      <Button
        label="Se connecter"
        onClick={form.handleSubmit(props.onSubmit)}
        loading={props.submitLoading}
        type="submit"
      />
    </Form>
  );
};

export default SignInForm;
