import { FormHandler } from '@/cdn/types/Form';
import Organization from '@/features/organization/types/Organization';
import { object, Schema, string } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormFieldText from '@/ui/molecules/formFields/FormFieldText';
import Form from '@/ui/atoms/form/Form';
import Button from '@/ui/atoms/Button';

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
      {props.submitError && <p>{props.submitError}</p>}
      <FormFieldText<Organization>
        label="Nom de l'organisation"
        name="name"
        control={form.control}
        error={form.formState.errors.name?.message}
      />
      <Button
        label="Enregistrer"
        onClick={form.handleSubmit(props.onSubmit)}
        loading={props.submitLoading}
        type="submit"
      />
    </Form>
  );
};

export default CreateOrganizationForm;
