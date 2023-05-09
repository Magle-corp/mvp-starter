import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { object, ref, Schema, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useBackOfficeContext } from '@/cdn/BackOfficeContext';
import AppPages from '@/cdn/enums/AppPages';
import { FormHandler } from '@/cdn/types/Form';
import FormFieldPassword from '@/ui/molecules/formFields/FormFieldPassword';
import Button from '@/ui/atoms/Button';
import Form from '@/ui/atoms/form/Form';
import FormError from '@/ui/atoms/form/FormError';
import InputsWrapper from '@/ui/atoms/form/InputsWrapper';
import Link from '@/ui/atoms/Link';

export type PasswordFormSchema = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const UpdatePasswordForm = (props: FormHandler<PasswordFormSchema>) => {
  const { organizationMenuOpen } = useBackOfficeContext();

  const schema: Schema<PasswordFormSchema> = object({
    oldPassword: string().required('Champ requis'),
    newPassword: string()
      .min(8, 'Minimum 8 caractères')
      .max(25, 'Maximum 25 caractères')
      .required('Champ requis'),
    confirmPassword: string()
      .oneOf([ref('newPassword')], 'Les mots de passes ne correspondent pas')
      .required('Champ requis'),
  });

  const form = useForm<PasswordFormSchema>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: props.defaultValues,
  });

  return (
    <Form>
      {props.submitError && <FormError>{props.submitError}</FormError>}
      <StyledInputsWrapper organizationMenuOpen={organizationMenuOpen}>
        <FormFieldPassword<PasswordFormSchema>
          label="mot de passe actuel *"
          name="oldPassword"
          control={form.control}
          error={form.formState.errors.oldPassword?.message}
          required
          feedback={false}
        />
        <FormFieldPassword<PasswordFormSchema>
          label="nouveau mot de passe *"
          name="newPassword"
          control={form.control}
          error={form.formState.errors.newPassword?.message}
          help="Minimum 8 caractères, maximum 25"
          required
        />
        <FormFieldPassword<PasswordFormSchema>
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
        J&apos;ai oublié mon mot de passe
      </Link>
    </Form>
  );
};

const StyledInputsWrapper = styled(InputsWrapper)`
  @media screen and (${({ theme }) => theme.breakpoints.md}) {
    > div {
      grid-column: 1/6;
    }
  }

  @media screen and (${({ theme }) => theme.breakpoints.lg}) {
    > div {
      grid-column: 1/5;
    }
  }

  @media screen and (${({ theme }) => theme.breakpoints.xl}) {
    > div:nth-child(1) {
      grid-column: 1/4;
    }

    > div:nth-child(2) {
      grid-column: 4/8;
    }

    > div:nth-child(3) {
      grid-column: 8/12;
    }
  }
  }
`;

export default UpdatePasswordForm;
