import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { array, date, object, Schema, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  TbCat,
  TbDog,
  TbGenderAgender,
  TbGenderFemale,
  TbGenderMale,
} from 'react-icons/tb';
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
import FormFieldCalendar from '@/ui/molecules/formFields/FormFieldCalendar';
import FormFieldDropdown from '@/ui/molecules/formFields/FormFieldDropdown';
import FormFieldMultiSelect from '@/ui/molecules/formFields/FormFieldMultiSelect';
import FormFieldText from '@/ui/molecules/formFields/FormFieldText';
import Button from '@/ui/atoms/Button';
import Chip from '@/ui/atoms/Chip';
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
  const { token } = useAuthContext();
  const { organization } = useOrganizationContext();
  const { organizationMenuOpen, toast } = useBackOfficeContext();

  const tempersQuery = useGet<AnimalTemper[]>({
    url: ApiRoutes.ANIMAL_TEMPERS_ORG + '/' + organization?.id,
    token: token?.token ?? undefined,
    key: QueryKeys.ANIMAL_TEMPERS,
    onError: () => errorToast(),
  });

  const racesQuery = useGet<AnimalRace[]>({
    url: ApiRoutes.ANIMAL_RACES_ORG + '/' + organization?.id,
    token: token?.token ?? undefined,
    key: QueryKeys.ANIMAL_RACES,
    onError: () => errorToast(),
  });

  const sexesQuery = useGet<AnimalSex[]>({
    url: ApiRoutes.ANIMAL_SEXES,
    token: token?.token ?? undefined,
    key: QueryKeys.ANIMAL_SEXES,
    onError: () => errorToast(),
  });

  const errorToast = () =>
    toast.current.show({
      severity: 'error',
      summary: 'Dictionnaire',
      detail: 'Un problème technique est survenu',
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
    registered: date().required('Champ requis'),
  });

  const form = useForm<AnimalFormSchema>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: props.defaultValues,
  });

  const RaceDropdownItemTemplate = (props: AnimalRace) => {
    return (
      <DropdownItemWrapper>
        {props.type.name === 'Chien' && <TbDog />}
        {props.type.name === 'Chat' && <TbCat />}
        <p>{props.name}</p>
      </DropdownItemWrapper>
    );
  };

  const SexDropdownItemTemplate = (props: AnimalSex) => {
    return (
      <DropdownItemWrapper>
        {props.name === 'Male' && <TbGenderMale />}
        {props.name === 'Femelle' && <TbGenderFemale />}
        {props.name === 'Inconnu' && <TbGenderAgender />}
        <p>{props.name}</p>
      </DropdownItemWrapper>
    );
  };

  const TemperMultiselectValueTemplate = (value: number) => {
    const relatedLabel = tempersQuery.data?.data['hydra:member'].find(
      (temper) => temper.id === value
    );

    return <Chip label={relatedLabel?.name.toLowerCase()} />;
  };

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
              help="Minimum 2 caractères, maximum 30"
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
              itemTemplate={RaceDropdownItemTemplate}
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
              itemTemplate={SexDropdownItemTemplate}
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
              selectedItemTemplate={TemperMultiselectValueTemplate}
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
      )}
    </>
  );
};

const DropdownItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

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
