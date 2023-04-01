import styled from 'styled-components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, ref, Schema, string } from 'yup';
import ResetPassword from '@/features/authentication/types/ResetPassword';
import FormFieldPassword from '@/ui/molecules/formFields/FormFieldPassword';
import Button from '@/ui/atoms/Button';

type ResetPasswordForm = {
  onSubmit: SubmitHandler<ResetPassword>;
  submitLoading: boolean;
  submitError: string | undefined;
};

const ResetPasswordForm = (props: ResetPasswordForm) => {
  const schema: Schema<ResetPassword> = object({
    password: string()
      .min(8, 'Minimum 8 caractères')
      .max(25, 'Maximum 25 caractères')
      .required('Champ requis'),
    confirmPassword: string()
      .oneOf([ref('password')], 'Les mots de passes ne correspondent pas')
      .required('Champ requis'),
  });

  const defaultValues: ResetPassword = {
    password: '',
    confirmPassword: '',
  };

  const form = useForm<ResetPassword>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  return (
    <Form>
      {props.submitError && <FormError>{props.submitError}</FormError>}
      <InputsWrapper>
        <FormFieldPassword<ResetPassword>
          label="Mot de passe"
          name="password"
          control={form.control}
          error={form.formState.errors.password}
          help="Minimum 8 caractères, maximum 25"
        />
        <FormFieldPassword<ResetPassword>
          label="Confirmer mot de passe"
          name="confirmPassword"
          control={form.control}
          error={form.formState.errors.confirmPassword}
          feedback={false}
        />
      </InputsWrapper>
      <Button
        label="Enregistrer mot de passe"
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

export default ResetPasswordForm;
