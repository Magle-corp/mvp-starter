import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { object, ref, Schema, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AppPages from '@/cdn/enums/AppPages';
import { FormHandler } from '@/cdn/types/Form';
import { ResetPassword } from '@/features/profile/types/Profile';
import FormFieldPassword from '@/ui/molecules/formFields/FormFieldPassword';
import Button from '@/ui/atoms/Button';
import Form from '@/ui/atoms/form/Form';
import FormError from '@/ui/atoms/form/FormError';
import InputsWrapper from '@/ui/atoms/form/InputsWrapper';
import Link from '@/ui/atoms/Link';

const ResetPasswordForm = (props: FormHandler<ResetPassword>) => {
  const schema: Schema<ResetPassword> = object({
    oldPassword: string().required('Champ requis'),
    newPassword: string()
      .min(8, 'Minimum 8 caractères')
      .max(25, 'Maximum 25 caractères')
      .required('Champ requis'),
    confirmPassword: string()
      .oneOf([ref('newPassword')], 'Les mots de passes ne correspondent pas')
      .required('Champ requis'),
  });

  const form = useForm<ResetPassword>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: props.defaultValues,
  });

  return (
    <Form>
      {props.submitError && <FormError>{props.submitError}</FormError>}
      <StyledInputsWrapper>
        <FormFieldPassword
          label="mot de passe actuel *"
          name="oldPassword"
          control={form.control}
          error={form.formState.errors.oldPassword?.message}
          required
          feedback={false}
        />
        <FormFieldPassword
          label="nouveau mot de passe *"
          name="newPassword"
          control={form.control}
          error={form.formState.errors.newPassword?.message}
          help="Minimum 8 caractères, maximum 25"
          required
        />
        <FormFieldPassword
          label="confirmer mot de passe *"
          name="confirmPassword"
          control={form.control}
          error={form.formState.errors.confirmPassword?.message}
          required
          feedback={false}
        />
      </StyledInputsWrapper>
      <Button
        label="Mettre à jour mon mot de passe"
        onClick={form.handleSubmit(props.onSubmit)}
        loading={props.submitLoading}
        type="submit"
        size="small"
      />
      <Link href={AppPages.AUTH_FORGOT_PASSWORD}>
        J'ai oublié mon mot de passe
      </Link>
    </Form>
  );
};

const StyledInputsWrapper = styled(InputsWrapper)`
  > div {
    width: 270px;
  }

  @media screen and (${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: row;
  }
`;

export default ResetPasswordForm;
