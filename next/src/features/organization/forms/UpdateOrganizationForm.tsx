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

const UpdateOrganizationForm = (props: FormHandler<Partial<Organization>>) => {
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
      {props.submitError && <FormError>{props.submitError}</FormError>}
      <StyledInputsWrapper>
        <FormFieldText
          label="nom de l'organisation *"
          name="name"
          control={form.control}
          error={form.formState.errors.name?.message}
          help="Minimum 3 caractères, maximum 40"
          required
        />
      </StyledInputsWrapper>
      <Button
        label="Enregistrer"
        onClick={form.handleSubmit(props.onSubmit)}
        loading={props.submitLoading}
        type="submit"
        size="small"
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

export default UpdateOrganizationForm;
