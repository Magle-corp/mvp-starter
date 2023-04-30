import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, Schema, string } from 'yup';
import { FormHandler } from '@/cdn/types/Form';
import { ForgotPassword } from '@/features/authentication/types/Auth';
import Form from '@/ui/atoms/form/Form';
import FormError from '@/ui/atoms/form/FormError';
import InputsWrapper from '@/ui/atoms/form/InputsWrapper';
import FormFieldText from '@/ui/molecules/formFields/FormFieldText';
import Button from '@/ui/atoms/Button';

const ForgotPasswordForm = (props: FormHandler<ForgotPassword>) => {
  const schema: Schema<ForgotPassword> = object({
    email: string()
      .min(5, 'Minimum 5 caractères')
      .max(80, 'Maximum 80 caractères')
      .email('Format invalide')
      .required('Champ requis'),
  });

  const form = useForm<ForgotPassword>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: props.defaultValues,
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
