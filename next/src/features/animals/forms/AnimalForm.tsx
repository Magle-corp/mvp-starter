import { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { array, object, Schema, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useBackOfficeContext } from '@/cdn/BackOfficeContext';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import QueryKeys from '@/cdn/enums/QueryKeys';
import { FormHandler } from '@/cdn/types/Form';
import useGet from '@/cdn/hooks/useGet';
import { useAuthContext } from '@/features/authentication/AuthContext';
import { useOrganizationContext } from '@/features/organization/OrganizationContext';
import {
  AnimalRace,
  AnimalSex,
  AnimalTemper,
} from '@/features/animals/types/Animal';
import FormFieldDropdown from '@/ui/molecules/formFields/FormFieldDropdown';
import FormFieldMultiSelect from '@/ui/molecules/formFields/FormFieldMultiSelect';
import FormFieldText from '@/ui/molecules/formFields/FormFieldText';
import Button from '@/ui/atoms/Button';
import Form from '@/ui/atoms/form/Form';
import FormError from '@/ui/atoms/form/FormError';
import InputsWrapper from '@/ui/atoms/form/InputsWrapper';

export type AnimalFormSchema = {
  name: string;
  organization: string | number;
  tempers: (number | string)[];
  race: string | number;
  sex: string | number;
};

const AnimalForm = (props: FormHandler<AnimalFormSchema>) => {
  const [animalTempers, setAnimalTempers] = useState<AnimalTemper[]>([]);
  const [animalRaces, setAnimalRaces] = useState<AnimalRace[]>([]);
  const [animalSexes, setAnimalSexes] = useState<AnimalSex[]>([]);

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

  useGet<AnimalRace[]>({
    url: ApiRoutes.ANIMAL_RACES_ORG + '/' + organization?.id,
    token: token?.token ?? undefined,
    key: QueryKeys.ANIMAL_RACES,
    // @ts-ignore
    onSuccess: (data) => setAnimalRaces(data['hydra:member']),
  });

  useGet<AnimalSex[]>({
    url: ApiRoutes.ANIMAL_SEXES,
    token: token?.token ?? undefined,
    key: QueryKeys.ANIMAL_SEXES,
    // @ts-ignore
    onSuccess: (data) => setAnimalSexes(data['hydra:member']),
  });

  const schema: Schema<AnimalFormSchema> = object({
    name: string()
      .min(2, 'Minimum 2 caractères')
      .max(30, 'Maximum 30 caractères')
      .required('Champ requis'),
    organization: string().required(),
    tempers: array().required(),
    race: string().required('Champ requis'),
    sex: string().required('Champ requis'),
  });

  const form = useForm<AnimalFormSchema>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: props.defaultValues,
  });

  return (
    <Form>
      {props.submitError && <FormError>{props.submitError}</FormError>}
      <IdentityInputsWrapper organizationMenuOpen={organizationMenuOpen}>
        <FormFieldText
          label="nom *"
          name="name"
          control={form.control}
          error={form.formState.errors.name?.message}
          help="Minimum 2 caractères, maximum 30"
          required
        />
        <FormFieldDropdown
          label="race *"
          name="race"
          control={form.control}
          error={form.formState.errors.race?.message}
          required
          filter
          options={animalRaces}
          optionLabel="name"
          optionValue="id"
        />
        <FormFieldDropdown
          label="sex *"
          name="sex"
          control={form.control}
          error={form.formState.errors.sex?.message}
          required
          options={animalSexes}
          optionLabel="name"
          optionValue="id"
        />
      </IdentityInputsWrapper>
      <DetailInputsWrapper organizationMenuOpen={organizationMenuOpen}>
        <FormFieldMultiSelect
          label="caractère(s)"
          name="tempers"
          control={form.control}
          error={form.formState.errors.tempers?.message}
          options={animalTempers}
          optionLabel="name"
          optionValue="id"
        />
      </DetailInputsWrapper>
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

const IdentityInputsWrapper = styled(InputsWrapper)<{
  organizationMenuOpen: boolean;
}>`
  @media screen and (${({ theme }) => theme.breakpoints.md}) {
    > div:nth-child(1) {
      grid-column: 1/6;
    }

    > div:nth-child(2) {
      grid-column: 6/9;
    }

    > div:nth-child(3) {
      grid-column: 9/12;
    }
  }
`;

const DetailInputsWrapper = styled(InputsWrapper)`
  @media screen and (${({ theme }) => theme.breakpoints.md}) {
    > div {
      grid-column: 1/6;
    }
  }
`;

export default AnimalForm;
