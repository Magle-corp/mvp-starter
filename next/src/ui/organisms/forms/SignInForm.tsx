import styled from 'styled-components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, Schema, string } from 'yup';
import SignIn from '@/features/authentication/types/SignIn';
import FormFieldText from '@/ui/molecules/formFields/FormFieldText';
import FormFieldPassword from '@/ui/molecules/formFields/FormFieldPassword';
import Button from '@/ui/atoms/Button';

type SignInForm = {
  onSubmit: SubmitHandler<SignIn>;
  submitError: string | undefined;
};

const SignInForm = (props: SignInForm) => {
  const schema: Schema<SignIn> = object({
    email: string().email('Format invalide').required('Champ requis'),
    password: string().required('Champ requis'),
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
          label="Adresse email"
          name="email"
          control={form.control}
          error={form.formState.errors.email}
        />
        <FormFieldPassword<SignIn>
          label="Mot de passe"
          name="password"
          control={form.control}
          error={form.formState.errors.password}
          feedback={false}
        />
      </InputsWrapper>
      <Button
        label="Se connecter"
        onClick={form.handleSubmit(props.onSubmit)}
      />
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  width: 90%;
`;

const FormError = styled.p`
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
`;

const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  width: 100%;
`;

export default SignInForm;