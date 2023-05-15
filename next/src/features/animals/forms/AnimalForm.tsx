import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { array, date, object, Schema, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppContext } from '@/cdn/AppContext';
import { useBackOfficeContext } from '@/cdn/BackOfficeContext';
import { FormHandler } from '@/cdn/types/Form';
import useGetAnimalTempers from '@/cdn/queries/useGetAnimalTempers';
import useGetAnimalRaces from '@/cdn/queries/useGetAnimalRaces';
import useGetAnimalSexes from '@/cdn/queries/useGetAnimalSexes';
import { useAuthContext } from '@/features/authentication/AuthContext';
import RaceDropdownItem from '@/features/animals/components/RaceDropdownItem';
import SexDropdownItem from '@/features/animals/components/SexDropdownItem';
import TemperMultiselectValue from '@/features/animals/components/TemperMultiselectValue';
import FormFieldCalendar from '@/ui/atoms/formFields/FormFieldCalendar';
import FormFieldDropdown from '@/ui/atoms/formFields/FormFieldDropdown';
import FormFieldMultiSelect from '@/ui/atoms/formFields/FormFieldMultiSelect';
import FormFieldText from '@/ui/atoms/formFields/FormFieldText';
import Button from '@/ui/atoms/Button';
import Form from '@/ui/atoms/form/Form';
import FormError from '@/ui/atoms/form/FormError';
import InputsWrapper from '@/ui/atoms/form/InputsWrapper';

export type AnimalFormSchema = {
  name: string;
  organization: string;
  tempers: (number | string)[];
  race: string | number;
  sex: string | number;
  registered: Date;
};

const AnimalForm = (props: FormHandler<AnimalFormSchema>) => {
  const { token, organization } = useAuthContext();
  const { toast } = useAppContext();
  const { organizationMenuOpen } = useBackOfficeContext();

  const tempersQuery = useGetAnimalTempers({
    organizationId: organization?.id,
    token: token?.token,
    onError: () => errorToast(),
  });

  const racesQuery = useGetAnimalRaces({
    organizationId: organization?.id,
    token: token?.token,
    onError: () => errorToast(),
  });

  const sexesQuery = useGetAnimalSexes({
    token: token?.token,
    onError: () => errorToast(),
  });

  const errorToast = () =>
    toast.current.show({
      severity: 'error',
      summary: 'Animal',
      detail: 'Un problème technique est survenu',
    });

  const schema: Schema<AnimalFormSchema> = object({
    name: string()
      .min(2, 'Minimum 2 caractères')
      .max(50, 'Maximum 50 caractères')
      .required('Champ requis'),
    organization: string().required(),
    tempers: array().required(),
    race: string().required('Champ requis'),
    sex: string().required('Champ requis'),
    registered: date().required('Champ requis'),
  });

  const form = useForm<AnimalFormSchema>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: props.defaultValues,
  });

  return (
    <>
      {tempersQuery.data && racesQuery.data && sexesQuery.data && (
        <Form>
          {props.submitError && <FormError>{props.submitError}</FormError>}
          <AdministrativeInputsWrapper
            organizationMenuOpen={organizationMenuOpen}
          >
            <FormFieldCalendar<AnimalFormSchema>
              label="arrivé le *"
              name="registered"
              control={form.control}
              error={form.formState.errors.registered?.message}
              required
              showIcon
              iconPos="left"
            />
          </AdministrativeInputsWrapper>
          <IdentityInputsWrapper organizationMenuOpen={organizationMenuOpen}>
            <FormFieldText<AnimalFormSchema>
              label="nom *"
              name="name"
              control={form.control}
              error={form.formState.errors.name?.message}
              help="Minimum 2 caractères, maximum 50"
              required
            />
            <FormFieldDropdown<AnimalFormSchema>
              label="race *"
              name="race"
              control={form.control}
              error={form.formState.errors.race?.message}
              required
              filter
              options={racesQuery.data.data['hydra:member']}
              optionLabel="name"
              optionValue="id"
              itemTemplate={RaceDropdownItem}
            />
            <FormFieldDropdown<AnimalFormSchema>
              label="sexe *"
              name="sex"
              control={form.control}
              error={form.formState.errors.sex?.message}
              required
              options={sexesQuery.data.data['hydra:member']}
              optionLabel="name"
              optionValue="id"
              itemTemplate={SexDropdownItem}
            />
          </IdentityInputsWrapper>
          <DetailInputsWrapper organizationMenuOpen={organizationMenuOpen}>
            <StyledFormFieldMultiSelect
              label="caractère(s)"
              name="tempers"
              control={form.control}
              error={form.formState.errors.tempers?.message}
              filter
              options={tempersQuery.data.data['hydra:member']}
              optionLabel="name"
              optionValue="id"
              selectedItemTemplate={(value) =>
                TemperMultiselectValue(
                  value,
                  tempersQuery.data?.data['hydra:member']
                )
              }
            />
          </DetailInputsWrapper>
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

const AdministrativeInputsWrapper = styled(InputsWrapper)`
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

const IdentityInputsWrapper = styled(InputsWrapper)`
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

  @media screen and (${({ theme }) => theme.breakpoints.lg}) {
    > div:nth-child(1) {
      grid-column: 1/5;
    }

    > div:nth-child(2) {
      grid-column: 5/8;
    }

    > div:nth-child(3) {
      grid-column: 8/11;
    }
  }

  @media screen and (${({ theme }) => theme.breakpoints.xl}) {
    > div:nth-child(1) {
      grid-column: 1/4;
    }

    > div:nth-child(2) {
      grid-column: 4/7;
    }

    > div:nth-child(3) {
      grid-column: 7/10;
    }
  }
`;

const DetailInputsWrapper = styled(InputsWrapper)`
  @media screen and (${({ theme }) => theme.breakpoints.md}) {
    > div {
      grid-column: 1/9;
    }
  }

  @media screen and (${({ theme }) => theme.breakpoints.lg}) {
    > div {
      grid-column: 1/8;
    }
  }

  @media screen and (${({ theme }) => theme.breakpoints.xl}) {
    > div {
      grid-column: 1/7;
    }
  }
`;

const StyledFormFieldMultiSelect = styled(
  FormFieldMultiSelect<AnimalFormSchema>
)`
  .p-multiselect-items-label {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 0.45rem;

    .p-chip-text {
      line-height: 1rem;
    }
  }
`;

export default AnimalForm;
