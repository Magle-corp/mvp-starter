import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, Schema, string } from 'yup';
import { ForgotPassword } from '@/features/authentication/types/AuthFormSchema';
import Form from '@/features/authentication/components/Form';
import FormError from '@/features/authentication/components/FormError';
import InputsWrapper from '@/features/authentication/components/InputsWrapper';
import FormFieldText from '@/ui/molecules/formFields/FormFieldText';
import Button from '@/ui/atoms/Button';

type ForgotPasswordForm = {
  onSubmit: SubmitHandler<ForgotPassword>;
  submitLoading: boolean;
  submitError: string | undefined;
};

const ForgotPasswordForm = (props: ForgotPasswordForm) => {
  const schema: Schema<ForgotPassword> = object({
    email: string()
      .min(5, 'Minimum 5 caractères')
      .max(80, 'Maximum 80 caractères')
      .email('Format invalide')
      .required('Champ requis'),
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
          label="adresse email *"
          name="email"
          control={form.control}
          error={form.formState.errors.email?.message}
          required
        />
      </InputsWrapper>
      <Button
        label="changer mot de passe"
        onClick={form.handleSubmit(props.onSubmit)}
        loading={props.submitLoading}
        type="submit"
      />
    </Form>
  );
};

export default ForgotPasswordForm;
