import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { object, Schema, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormHandler } from '@/cdn/types/Form';
import Animal from '@/features/animals/types/Animal';
import FormFieldText from '@/ui/molecules/formFields/FormFieldText';
import Button from '@/ui/atoms/Button';
import Form from '@/ui/atoms/form/Form';
import FormError from '@/ui/atoms/form/FormError';
import InputsWrapper from '@/ui/atoms/form/InputsWrapper';

const CreateAnimalForm = (props: FormHandler<Animal>) => {
  const schema: Schema<Partial<Animal>> = object({
    name: string()
      .min(2, 'Minimum 2 caractères')
      .max(30, 'Maximum 30 caractères')
      .required('Champ requis'),
  });

  const form = useForm<Animal>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: props.defaultValues,
  });

  return (
    <Form>
      {props.submitError && <FormError>{props.submitError}</FormError>}
      <StyledInputsWrapper>
        <FormFieldText
          label="nom *"
          name="name"
          control={form.control}
          error={form.formState.errors.name?.message}
          help="Minimum 2 caractères, maximum 30"
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

export default CreateAnimalForm;
