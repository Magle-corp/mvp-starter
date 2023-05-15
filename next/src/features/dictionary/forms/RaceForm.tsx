import { useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { object, Schema, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useBackOfficeContext } from '@/cdn/BackOfficeContext';
import { FormHandler } from '@/cdn/types/Form';
import useGetAnimalRaces from '@/cdn/queries/useGetAnimalRaces';
import useGetAnimalTypes from '@/cdn/queries/useGetAnimalTypes';
import { stringStrictComparison } from '@/cdn/utils/autoComplete';
import { useAuthContext } from '@/features/authentication/AuthContext';
import FormFieldText from '@/ui/molecules/formFields/FormFieldText';
import FormFieldDropdown from '@/ui/molecules/formFields/FormFieldDropdown';
import Button from '@/ui/atoms/Button';
import Form from '@/ui/atoms/form/Form';
import FormError from '@/ui/atoms/form/FormError';
import InputsWrapper from '@/ui/atoms/form/InputsWrapper';

export type RaceFormSchema = {
  name: string;
  type: string | number;
  organization: string;
};

const RaceForm = (props: FormHandler<RaceFormSchema>) => {
  const { token, organization } = useAuthContext();
  const { organizationMenuOpen, toast } = useBackOfficeContext();

  useEffect(() => {
    racesQuery.refetch();
    typesQuery.refetch();
  }, []);

  const racesQuery = useGetAnimalRaces({
    organizationId: organization?.id,
    token: token?.token,
    enabled: false,
    onError: () => errorToast(),
  });

  const typesQuery = useGetAnimalTypes({
    organizationId: organization?.id,
    token: token?.token,
    enabled: false,
    onError: () => errorToast(),
  });

  const errorToast = () =>
    toast.current.show({
      severity: 'error',
      summary: 'Dictionnaire',
      detail: 'Un problème technique est survenu',
    });

  const schema: Schema<RaceFormSchema> = object({
    name: string()
      .min(2, 'Minimum 2 caractères')
      .max(50, 'Maximum 50 caractères')
      .required('Champ requis')
      .test({
        test: (value) => nameCustomValidator(value),
        message: 'Race déjà enregistrée',
      }),
    type: string().required(),
    organization: string().required(),
  });

  const nameCustomValidator = (value: string) => {
    return !racesQuery.data?.data['hydra:member'].some((race) =>
      stringStrictComparison(race.name, value)
    );
  };

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
              help="Minimum 2 caractères, maximum 50"
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
            disabled={!form.formState.isDirty}
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
