import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, ref, Schema, string } from 'yup';
import { FormHandler } from '@/cdn/types/Form';
import Form from '@/ui/atoms/form/Form';
import FormError from '@/ui/atoms/form/FormError';
import InputsWrapper from '@/ui/atoms/form/InputsWrapper';
import FormFieldPassword from '@/ui/molecules/formFields/FormFieldPassword';
import Button from '@/ui/atoms/Button';

export type ResetPasswordFormSchema = {
  token?: string;
  password: string;
  confirmPassword: string;
};

const ResetPasswordForm = (props: FormHandler<ResetPasswordFormSchema>) => {
  const schema: Schema<ResetPasswordFormSchema> = object({
    password: string()
      .min(8, 'Minimum 8 caractères')
      .max(25, 'Maximum 25 caractères')
      .required('Champ requis'),
    confirmPassword: string()
      .oneOf([ref('password')], 'Les mots de passes ne correspondent pas')
      .required('Champ requis'),
  });

  const form = useForm<ResetPasswordFormSchema>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: props.defaultValues,
  });

  return (
    <Form>
      {props.submitError && <FormError>{props.submitError}</FormError>}
      <StyledInputsWrapper>
        <FormFieldPassword<ResetPasswordFormSchema>
          label="mot de passe *"
          name="password"
          control={form.control}
          error={form.formState.errors.password?.message}
          help="Minimum 8 caractères, maximum 25"
          required
        />
        <FormFieldPassword<ResetPasswordFormSchema>
          label="confirmer mot de passe *"
          name="confirmPassword"
          control={form.control}
          error={form.formState.errors.confirmPassword?.message}
          required
          feedback={false}
        />
      </StyledInputsWrapper>
      <Button
        label="Enregistrer mot de passe"
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

export default ResetPasswordForm;
