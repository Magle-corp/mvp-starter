import { useEffect } from 'react';
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
import { AnimalRace, AnimalType } from '@/features/animals/types/Animal';
import FormFieldText from '@/ui/molecules/formFields/FormFieldText';
import FormFieldDropdown from '@/ui/molecules/formFields/FormFieldDropdown';
import Button from '@/ui/atoms/Button';
import Form from '@/ui/atoms/form/Form';
import FormError from '@/ui/atoms/form/FormError';
import InputsWrapper from '@/ui/atoms/form/InputsWrapper';

export type RaceFormSchema = {
  name: string;
  type: string;
  organization: string;
};

const RaceForm = (props: FormHandler<RaceFormSchema>) => {
  const { token } = useAuthContext();
  const { organization } = useOrganizationContext();
  const { organizationMenuOpen, toast } = useBackOfficeContext();

  const racesQuery = useGet<AnimalRace[]>({
    url: ApiRoutes.ANIMAL_RACES_ORG + '/' + organization?.id,
    token: token?.token ?? undefined,
    key: QueryKeys.ANIMAL_RACES,
    enabled: false,
    onError: () => errorToast(),
  });

  const typesQuery = useGet<AnimalType[]>({
    url: ApiRoutes.ANIMAL_TYPES_ORG + '/' + organization?.id,
    token: token?.token ?? undefined,
    key: QueryKeys.ANIMAL_TYPES,
    enabled: false,
    onError: () => errorToast(),
  });

  const errorToast = () =>
    toast.current.show({
      severity: 'error',
      summary: 'Dictionnaire',
      detail: 'Un problème technique est survenu',
    });

  useEffect(() => {
    racesQuery.refetch();
    typesQuery.refetch();
  }, []);

  const schema: Schema<RaceFormSchema> = object({
    name: string()
      .min(2, 'Minimum 2 caractères')
      .max(30, 'Maximum 30 caractères')
      .required('Champ requis'),
    type: string().required(),
    organization: string().required(),
  });

  const form = useForm<RaceFormSchema>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: props.defaultValues,
  });

  return (
    <>
      {racesQuery.data && typesQuery.data && (
        <Form>
          {props.submitError && <FormError>{props.submitError}</FormError>}
          <StyledInputsWrapper organizationMenuOpen={organizationMenuOpen}>
            <FormFieldText<RaceFormSchema>
              label="nom *"
              name="name"
              control={form.control}
              error={form.formState.errors.name?.message}
              help="Minimum 2 caractères, maximum 30"
              required
            />
            <FormFieldDropdown<RaceFormSchema>
              label="type *"
              name="type"
              control={form.control}
              error={form.formState.errors.type?.message}
              required
              filter
              options={typesQuery.data.data['hydra:member']}
              optionLabel="name"
              optionValue="id"
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
      )}
    </>
  );
};

const StyledInputsWrapper = styled(InputsWrapper)`
  @media screen and (${({ theme }) => theme.breakpoints.md}) {
    > div:nth-child(1) {
      grid-column: 1/6;
    }

    > div:nth-child(2) {
      grid-column: 6/10;
    }
  }

  @media screen and (${({ theme }) => theme.breakpoints.lg}) {
    > div:nth-child(1) {
      grid-column: 1/5;
    }

    > div:nth-child(2) {
      grid-column: 5/8;
    }
  }

  @media screen and (${({ theme }) => theme.breakpoints.xl}) {
    > div:nth-child(1) {
      grid-column: 1/4;
    }

    > div:nth-child(2) {
      grid-column: 4/7;
    }
  }
`;

export default RaceForm;
