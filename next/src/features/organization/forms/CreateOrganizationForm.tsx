import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { object, Schema, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormHandler } from '@/cdn/types/Form';
import Organization from '@/features/organization/types/Organization';
import FormFieldText from '@/ui/molecules/formFields/FormFieldText';
import Button from '@/ui/atoms/Button';
import Form from '@/ui/atoms/form/Form';
import FormError from '@/ui/atoms/form/FormError';
import InputsWrapper from '@/ui/atoms/form/InputsWrapper';

const CreateOrganizationForm = (props: FormHandler<Organization>) => {
  const schema: Schema<Partial<Organization>> = object({
    name: string()
      .min(3, 'Minimum 3 caractères')
      .max(40, 'Maximum 40 caractères')
      .required('Champ requis'),
  });

  const form = useForm<Organization>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: props.defaultValues,
  });

  return (
    <Form>
      {props.submitError && (
        <StyledFormError>{props.submitError}</StyledFormError>
      )}
      <InputsWrapper>
        <FormFieldText<Organization>
          label="nom de l'organisation *"
          name="name"
          control={form.control}
          error={form.formState.errors.name?.message}
          help="Minimum 3 caractères, maximum 40"
          required
        />
      </InputsWrapper>
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

const StyledButton = styled(Button)`
  margin: 0 auto;
`;

const StyledFormError = styled(FormError)`
  margin: 0 auto;
`;

export default CreateOrganizationForm;
