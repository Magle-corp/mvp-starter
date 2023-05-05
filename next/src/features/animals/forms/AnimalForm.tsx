import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { array, object, Schema, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import QueryKeys from '@/cdn/enums/QueryKeys';
import { FormHandler } from '@/cdn/types/Form';
import useGet from '@/cdn/hooks/useGet';
import autoCompleteMethod from '@/cdn/utils/autoComplete';
import { useAuthContext } from '@/features/authentication/AuthContext';
import { useOrganizationContext } from '@/features/organization/OrganizationContext';
import { Animal, AnimalTemper } from '@/features/animals/types/Animal';
import FormFieldText from '@/ui/molecules/formFields/FormFieldText';
import FormFieldAutoComplete from '@/ui/molecules/formFields/FormFieldAutoComplete';
import Button from '@/ui/atoms/Button';
import Form from '@/ui/atoms/form/Form';
import FormError from '@/ui/atoms/form/FormError';
import InputsWrapper from '@/ui/atoms/form/InputsWrapper';

const AnimalForm = (props: FormHandler<Animal>) => {
  const [animalTempers, setAnimalTempers] = useState<AnimalTemper[]>([]);
  const [temperSuggestions, setTemperSuggestions] = useState<AnimalTemper[]>(
    []
  );

  const { token } = useAuthContext();
  const { organization } = useOrganizationContext();

  useGet<AnimalTemper[]>({
    url: ApiRoutes.ANIMAL_TEMPERS_ORG + '/' + organization?.id,
    token: token?.token ?? undefined,
    key: QueryKeys.ANIMAL_TEMPERS,
    onSuccess: (data) => {
      // TODO: replace hydra:member
      // @ts-ignore
      setAnimalTempers(data['hydra:member']);
    },
  });

  const schema: Schema<Partial<Animal>> = object({
    name: string()
      .min(2, 'Minimum 2 caractères')
      .max(30, 'Maximum 30 caractères')
      .required('Champ requis'),
    tempers: array(),
  });

  const form = useForm<Animal>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: props.defaultValues,
  });

  useEffect(() => {
    if (props.defaultValues) {
      form.setValue('name', props.defaultValues.name);
      form.setValue('tempers', props.defaultValues.tempers);
    }
  }, [props.defaultValues]);

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
      <InputsWrapper>
        <FormFieldAutoComplete
          label="caractère(s)"
          name="tempers"
          control={form.control}
          error={form.formState.errors.tempers?.message}
          multiple
          field="name"
          suggestions={temperSuggestions}
          completeMethod={(event) =>
            autoCompleteMethod(
              event.query,
              'name',
              animalTempers,
              form.watch('tempers'),
              setTemperSuggestions
            )
          }
        />
      </InputsWrapper>
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

export default AnimalForm;
