import styled from 'styled-components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, Schema, string } from 'yup';
import ForgotPassword from '@/features/authentication/types/ForgotPassword';
import FormFieldText from '@/ui/molecules/formFields/FormFieldText';
import Button from '@/ui/atoms/Button';

type ForgotPasswordForm = {
  onSubmit: SubmitHandler<ForgotPassword>;
  submitLoading: boolean;
  submitError: string | undefined;
};

const ForgotPasswordForm = (props: ForgotPasswordForm) => {
  const schema: Schema<ForgotPassword> = object({
    email: string().email('Format invalide').required('Champ requis'),
  });

  const defaultValues: ForgotPassword = {
    email: '',
  };

  const form = useForm<ForgotPassword>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  return (
    <Form>
      {props.submitError && <FormError>{props.submitError}</FormError>}
      <InputsWrapper>
        <FormFieldText<ForgotPassword>
          label="Adresse email"
          name="email"
          control={form.control}
          error={form.formState.errors.email}
        />
      </InputsWrapper>
      <Button
        label="Changer mot de passe"
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

export default ForgotPasswordForm;
