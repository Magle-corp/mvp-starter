import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { object, Schema, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useBackOfficeContext } from '@/ui/layouts/BackOfficeContext';
import { FormHandler } from '@/cdn/types/Form';
import FormFieldText from '@/ui/atoms/formFields/FormFieldText';
import Button from '@/ui/atoms/Button';
import Form from '@/ui/atoms/form/Form';
import FormError from '@/ui/atoms/form/FormError';
import InputsWrapper from '@/ui/atoms/form/InputsWrapper';

export type OrganizationFormSchema = {
  name: string;
};

const UpdateOrganizationForm = (props: FormHandler<OrganizationFormSchema>) => {
  const { organizationMenuOpen } = useBackOfficeContext();

  const schema: Schema<OrganizationFormSchema> = object({
    name: string()
      .min(3, 'Minimum 3 caractères')
      .max(100, 'Maximum 100 caractères')
      .required('Champ requis'),
  });

  const form = useForm<OrganizationFormSchema>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: props.defaultValues,
  });

  return (
    <Form>
      {props.submitError && <FormError>{props.submitError}</FormError>}
      <StyledInputsWrapper organizationMenuOpen={organizationMenuOpen}>
        <FormFieldText<OrganizationFormSchema>
          label="nom de l'organisation *"
          name="name"
          control={form.control}
          error={form.formState.errors.name?.message}
          help="Minimum 3 caractères, maximum 100"
          required
        />
      </StyledInputsWrapper>
      <Button
        label="Enregistrer"
        onClick={form.handleSubmit(props.onSubmit)}
        loading={props.submitLoading}
        type="submit"
        size="small"
        disabled={!form.formState.isDirty}
      />
    </Form>
  );
};

const StyledInputsWrapper = styled(InputsWrapper)`
  @media screen and (${({ theme }) => theme.breakpoints.md}) {
    > div {
      grid-column: 1/8;
    }
  }

  @media screen and (${({ theme }) => theme.breakpoints.lg}) {
    > div {
      grid-column: 1/6;
    }
  }

  @media screen and (${({ theme }) => theme.breakpoints.xl}) {
    > div {
      grid-column: 1/5;
    }
  }
`;

export default UpdateOrganizationForm;
