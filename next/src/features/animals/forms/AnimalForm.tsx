import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { array, boolean, date, object, Schema, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Tooltip } from 'primereact/tooltip';
import { TbInfoCircle } from 'react-icons/tb';
import { useBackOfficeContext } from '@/cdn/BackOfficeContext';
import { FormHandler } from '@/cdn/types/Form';
import useGetAnimalTempers from '@/cdn/queries/useGetAnimalTempers';
import useGetAnimalRaces from '@/cdn/queries/useGetAnimalRaces';
import useGetAnimalSexes from '@/cdn/queries/useGetAnimalSexes';
import { useAuthContext } from '@/features/authentication/AuthContext';
import RaceDropdownItem from '@/features/animals/components/form/RaceDropdownItem';
import SexDropdownItem from '@/features/animals/components/form/SexDropdownItem';
import TemperMultiselectValue from '@/features/animals/components/form/TemperMultiselectValue';
import FormFieldCalendar from '@/ui/atoms/formFields/FormFieldCalendar';
import FormFieldDropdown from '@/ui/atoms/formFields/FormFieldDropdown';
import FormFieldMultiSelect from '@/ui/atoms/formFields/FormFieldMultiSelect';
import FormFieldText from '@/ui/atoms/formFields/FormFieldText';
import FormFieldSwitch from '@/ui/atoms/formFields/FormFieldSwitch';
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
  public: boolean;
};

const AnimalForm = (props: FormHandler<AnimalFormSchema>) => {
  const { token, organization } = useAuthContext();
  const { organizationMenuOpen, toast } = useBackOfficeContext();

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
    public: boolean().required('Champ requis'),
  });

  const form = useForm<AnimalFormSchema>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: props.defaultValues,
  });

  const fieldPublicWatcher = form.watch('public');

  return (
    <>
      {tempersQuery.data && racesQuery.data && sexesQuery.data && (
        <Form>
          {props.submitError && <FormError>{props.submitError}</FormError>}
          <AdministrativeInputsWrapper
            organizationMenuOpen={organizationMenuOpen}
          >
            <FormFieldText<AnimalFormSchema>
              label="nom *"
              name="name"
              control={form.control}
              error={form.formState.errors.name?.message}
              help="Minimum 2 caractères, maximum 50"
              required
            />
            <PublicFieldWrapper>
              {!organization?.public && (
                <>
                  <Tooltip target=".public_field_help" />
                  <i
                    className="public_field_help"
                    data-pr-tooltip="Nécessite que votre organisation soit publique."
                    data-pr-position="left"
                    data-pr-my="right center-2"
                  >
                    <TbInfoCircle />
                  </i>
                </>
              )}
              <FormFieldSwitch<AnimalFormSchema>
                label="Fiche publique"
                name="public"
                checked={fieldPublicWatcher}
                onChange={() =>
                  form.setValue('public', !form.getValues('public'), {
                    shouldDirty: true,
                  })
                }
                control={form.control}
                error={form.formState.errors.public?.message}
                disabled={!organization?.public}
                required
              />
            </PublicFieldWrapper>
          </AdministrativeInputsWrapper>
          <IdentityInputsWrapper organizationMenuOpen={organizationMenuOpen}>
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
            <FormFieldCalendar<AnimalFormSchema>
              label="arrivé le *"
              name="registered"
              control={form.control}
              error={form.formState.errors.registered?.message}
              required
              showIcon
              iconPos="left"
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
  > div:nth-child(1) {
    order: 1;
  }

  @media screen and (${({ theme }) => theme.breakpoints.md}) {
    > div:nth-child(1) {
      grid-column: 1/6;
    }

    > div:nth-child(2) {
      grid-column: 9/12;
    }
  }

  @media screen and (${({ theme }) => theme.breakpoints.lg}) {
    > div:nth-child(1) {
      grid-column: 1/5;
      order: unset;
    }
  }

  @media screen and (${({ theme }) => theme.breakpoints.xl}) {
    > div:nth-child(1) {
      grid-column: 1/4;
    }
  }
`;

const PublicFieldWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  gap: 5px;

  > i > svg {
    margin-top: 2px;
    width: 22px;
    height: 22px;
    cursor: pointer;
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
