import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, Schema, string } from 'yup';
import { FormHandler } from '@/cdn/types/Form';
import Form from '@/ui/atoms/form/Form';
import FormError from '@/ui/atoms/form/FormError';
import InputsWrapper from '@/ui/atoms/form/InputsWrapper';
import FormFieldText from '@/ui/molecules/formFields/FormFieldText';
import Button from '@/ui/atoms/Button';

export type ForgotPasswordFormSchema = {
  email: string;
};

const ForgotPasswordForm = (props: FormHandler<ForgotPasswordFormSchema>) => {
  const schema: Schema<ForgotPasswordFormSchema> = object({
    email: string()
      .min(5, 'Minimum 5 caractères')
      .max(80, 'Maximum 80 caractères')
      .email('Format invalide')
      .required('Champ requis'),
  });

  const form = useForm<ForgotPasswordFormSchema>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: props.defaultValues,
  });

  return (
    <Form>
      {props.submitError && <FormError>{props.submitError}</FormError>}
      <StyledInputsWrapper>
        <FormFieldText<ForgotPasswordFormSchema>
          label="adresse email *"
          name="email"
          control={form.control}
          error={form.formState.errors.email?.message}
          help="Minimum 5 caractères, maximum 80"
          required
        />
      </StyledInputsWrapper>
      <Button
        label="changer mot de passe"
        onClick={form.handleSubmit(props.onSubmit)}
        loading={props.submitLoading}
        type="submit"
        size="small"
      />
    </Form>
  );
};

const StyledInputsWrapper = styled(InputsWrapper)`
  > div {
    grid-column: 1/12;
  }
`;

export default ForgotPasswordForm;
