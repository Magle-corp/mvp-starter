import { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { object, Schema, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useBackOfficeContext } from '@/cdn/BackOfficeContext';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import QueryKeys from '@/cdn/enums/QueryKeys';
import { FormHandler } from '@/cdn/types/Form';
import useGet from '@/cdn/hooks/useGet';
import { useAuthContext } from '@/features/authentication/AuthContext';
import { useOrganizationContext } from '@/features/organization/OrganizationContext';
import { AnimalTemper } from '@/features/animals/types/Animal';
import FormFieldText from '@/ui/molecules/formFields/FormFieldText';
import Form from '@/ui/atoms/form/Form';
import FormError from '@/ui/atoms/form/FormError';
import InputsWrapper from '@/ui/atoms/form/InputsWrapper';
import Button from '@/ui/atoms/Button';

export type TemperFormSchema = {
  name: string;
  organization: string;
};

const TemperForm = (props: FormHandler<TemperFormSchema>) => {
  const [animalTempers, setAnimalTempers] = useState<AnimalTemper[]>([]);

  const { token } = useAuthContext();
  const { organization } = useOrganizationContext();
  const { organizationMenuOpen } = useBackOfficeContext();

  useGet<AnimalTemper[]>({
    url: ApiRoutes.ANIMAL_TEMPERS_ORG + '/' + organization?.id,
    token: token?.token ?? undefined,
    key: QueryKeys.ANIMAL_TEMPERS,
    // @ts-ignore
    onSuccess: (data) => setAnimalTempers(data['hydra:member']),
  });

  const schema: Schema<TemperFormSchema> = object({
    name: string()
      .min(2, 'Minimum 2 caractères')
      .max(30, 'Maximum 30 caractères')
      .required('Champ requis'),
    organization: string().required(),
  });

  const form = useForm<TemperFormSchema>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: props.defaultValues,
  });

  return (
    <Form>
      {props.submitError && <FormError>{props.submitError}</FormError>}
      <StyledInputsWrapper organizationMenuOpen={organizationMenuOpen}>
        <FormFieldText
          label="nom"
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
    > div {
      grid-column: 1/4;
    }
  }
`;

export default TemperForm;
