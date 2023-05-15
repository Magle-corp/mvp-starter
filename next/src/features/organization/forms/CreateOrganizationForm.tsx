import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { object, Schema, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormHandler } from '@/cdn/types/Form';
import FormFieldText from '@/ui/molecules/formFields/FormFieldText';
import Button from '@/ui/atoms/Button';
import Form from '@/ui/atoms/form/Form';
import FormError from '@/ui/atoms/form/FormError';
import InputsWrapper from '@/ui/atoms/form/InputsWrapper';

export type OrganizationFormSchema = {
  name: string;
  owner: string;
};

const CreateOrganizationForm = (props: FormHandler<OrganizationFormSchema>) => {
  const schema: Schema<OrganizationFormSchema> = object({
    name: string()
      .min(3, 'Minimum 3 caractères')
      .max(100, 'Maximum 100 caractères')
      .required('Champ requis'),
    owner: string().required(),
  });

  const form = useForm<OrganizationFormSchema>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: props.defaultValues,
  });

  return (
    <Form>
      {props.submitError && (
        <StyledFormError>{props.submitError}</StyledFormError>
      )}
      <StyledInputsWrappers>
        <FormFieldText<OrganizationFormSchema>
          label="nom de l'organisation *"
          name="name"
          control={form.control}
          error={form.formState.errors.name?.message}
          help="Minimum 3 caractères, maximum 100"
          required
        />
      </StyledInputsWrappers>
      <StyledButton
        label="Enregistrer"
        onClick={form.handleSubmit(props.onSubmit)}
        loading={props.submitLoading}
        type="submit"
        size="small"
      />
    </Form>
  );
};

const StyledInputsWrappers = styled(InputsWrapper)`
  > div {
    grid-column: 1/12;
  }
`;

const StyledButton = styled(Button)`
  margin: 0 auto;
`;

const StyledFormError = styled(FormError)`
  margin: 0 auto;
`;

export default CreateOrganizationForm;
