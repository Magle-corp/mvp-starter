import styled from 'styled-components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, Schema, string, ref, boolean } from 'yup';
import { SignUp } from '@/features/authentication/types/AuthFormSchema';
import FormFieldCheckbox from '@/ui/molecules/formFields/FormFieldCheckbox';
import FormFieldText from '@/ui/molecules/formFields/FormFieldText';
import FormFieldPassword from '@/ui/molecules/formFields/FormFieldPassword';
import Button from '@/ui/atoms/Button';

type SignUpForm = {
  onSubmit: SubmitHandler<SignUp>;
  submitLoading: boolean;
  submitError: string | undefined;
};

const SignUpForm = (props: SignUpForm) => {
  const schema: Schema<SignUp> = object({
    email: string()
      .min(5, 'Minimum 5 caractères')
      .max(80, 'Maximum 80 caractères')
      .email('Format invalide')
      .required('Champ requis'),
    password: string()
      .min(8, 'Minimum 8 caractères')
      .max(25, 'Maximum 25 caractères')
      .required('Champ requis'),
    confirmPassword: string()
      .oneOf([ref('password')], 'Les mots de passes ne correspondent pas')
      .required('Champ requis'),
    acceptCGU: boolean().oneOf([true], 'Accord nécessaire').required(),
  });

  const defaultValues: SignUp = {
    email: '',
    password: '',
    confirmPassword: '',
    acceptCGU: false,
  };

  const form = useForm<SignUp>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  return (
    <Form>
      {props.submitError && <FormError>{props.submitError}</FormError>}
      <InputsWrapper>
        <FormFieldText<SignUp>
          label="adresse email *"
          name="email"
          control={form.control}
          error={form.formState.errors.email}
        />
        <FormFieldPassword<SignUp>
          label="mot de passe *"
          name="password"
          control={form.control}
          error={form.formState.errors.password}
          help="Minimum 8 caractères, maximum 25"
        />
        <FormFieldPassword<SignUp>
          label="confirmer mot de passe *"
          name="confirmPassword"
          control={form.control}
          error={form.formState.errors.confirmPassword}
          feedback={false}
        />
        <FormFieldCheckbox<SignUp>
          label="J'accepte les conditions générales d'utilisation *"
          name="acceptCGU"
          control={form.control}
          error={form.formState.errors.acceptCGU}
        />
      </InputsWrapper>
      <Button
        label="S'inscrire"
        onClick={form.handleSubmit(props.onSubmit)}
        loading={props.submitLoading}
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
  gap: 3rem;
  width: 100%;
`;

export default SignUpForm;
