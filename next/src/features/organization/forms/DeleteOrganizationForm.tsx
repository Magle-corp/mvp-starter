import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { object, Schema, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormHandler } from '@/cdn/types/Form';
import { useOrganizationContext } from '@/features/organization/OrganizationContext';
import Organization from '@/features/organization/types/Organization';
import FormFieldText from '@/ui/molecules/formFields/FormFieldText';
import Button from '@/ui/atoms/Button';
import Form from '@/ui/atoms/form/Form';
import FormError from '@/ui/atoms/form/FormError';
import InputsWrapper from '@/ui/atoms/form/InputsWrapper';

const DeleteOrganizationForm = (props: FormHandler<Partial<Organization>>) => {
  const { organization } = useOrganizationContext();

  const schema: Schema<Partial<Organization>> = object({
    name: string()
      .oneOf([organization?.name], "Le nom de l'organisation ne correspond pas")
      .required('Champ requis'),
  });

  const form = useForm<Partial<Organization>>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: props.defaultValues,
  });

  return (
    <Form>
      {props.submitError && <FormError>{props.submitError}</FormError>}
      <StyledInputsWrapper>
        <FormFieldText
          label="nom de l'organisation *"
          name="name"
          control={form.control}
          error={form.formState.errors.name?.message}
          help="Saisir le nom de votre organisation"
          required
        />
      </StyledInputsWrapper>
      <Button
        label="Supprimer définitivement mon organisation"
        variant="danger"
        icon="pi pi-exclamation-triangle"
        onClick={form.handleSubmit(props.onSubmit)}
        size="small"
        disabled={!form.formState.isValid}
      />
    </Form>
  );
};

const StyledInputsWrapper = styled(InputsWrapper)`
  @media screen and (${({ theme }) => theme.breakpoints.sm}) {
    > div {
      width: 400px;
    }
  }
`;

export default DeleteOrganizationForm;
