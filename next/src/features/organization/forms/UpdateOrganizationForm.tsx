import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { object, Schema, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useBackOfficeContext } from '@/ui/layouts/BackOfficeContext';
import { FormHandler } from '@/cdn/types/Form';
import FormFieldText from '@/ui/atoms/formFields/FormFieldText';
import Button from '@/ui/atoms/Button';
import Form from '@/ui/atoms/form/Form';
import FormError from '@/ui/atoms/form/FormError';
import InputsWrapper from '@/ui/atoms/form/InputsWrapper';

export type OrganizationFormSchema = {
  name: string;
  address?: string;
  city?: string;
  zipCode?: string;
  phone?: string;
  email?: string;
};

const UpdateOrganizationForm = (props: FormHandler<OrganizationFormSchema>) => {
  const { organizationMenuOpen } = useBackOfficeContext();

  const schema: Schema<OrganizationFormSchema> = object({
    name: string()
      .min(3, 'Minimum 3 caractères')
      .max(100, 'Maximum 100 caractères')
      .required('Champ requis'),
    address: string()
      .max(150, 'Maximum 150 caractères')
      .test({
        test: (value) => nullableFieldLengthValidator(value, 3),
        message: 'Minimum 3 caractères',
      }),
    city: string()
      .max(50, 'Maximum 50 caractères')
      .test({
        test: (value) => nullableFieldLengthValidator(value, 3),
        message: 'Minimum 3 caractères',
      }),
    zipCode: string()
      .max(5, 'Maximum 5 caractères')
      .test({
        test: (value) => nullableFieldLengthValidator(value, 2),
        message: 'Minimum 3 caractères',
      }),
    phone: string()
      .max(10, 'Maximum 10 chiffres')
      .test({
        test: (value) => nullableFieldLengthValidator(value, 10),
        message: 'Minimum 10 chiffres',
      }),
    email: string()
      .email("L'email n'est pas valide")
      .max(100, 'Maximum 100 caractères')
      .test({
        test: (value) => nullableFieldLengthValidator(value, 5),
        message: 'Minimum 5 caractères',
      }),
  });

  const nullableFieldLengthValidator = (
    value: string | undefined,
    min: number
  ) => {
    if (value && value.length > 0) {
      return value.length > min - 1;
    }

    return true;
  };

  const form = useForm<OrganizationFormSchema>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: props.defaultValues,
  });

  return (
    <Form>
      {props.submitError && <FormError>{props.submitError}</FormError>}
      <IdentityInputsWrapper organizationMenuOpen={organizationMenuOpen}>
        <FormFieldText<OrganizationFormSchema>
          label="nom de l'organisation *"
          name="name"
          control={form.control}
          error={form.formState.errors.name?.message}
          help="Minimum 3 caractères, maximum 100"
          required
        />
      </IdentityInputsWrapper>
      <ContactInputsWrapper organizationMenuOpen={organizationMenuOpen}>
        <FormFieldText<OrganizationFormSchema>
          label="email"
          name="email"
          control={form.control}
          error={form.formState.errors.email?.message}
          help="Minimum 5 caractères, maximum 100"
        />
        <FormFieldText<OrganizationFormSchema>
          label="téléphone"
          name="phone"
          control={form.control}
          error={form.formState.errors.phone?.message}
          help="Exemple : 0701234567"
        />
      </ContactInputsWrapper>
      <AddressInputsWrapper organizationMenuOpen={organizationMenuOpen}>
        <FormFieldText<OrganizationFormSchema>
          label="adresse"
          name="address"
          control={form.control}
          error={form.formState.errors.address?.message}
        />
        <CityInputsWrapper organizationMenuOpen={organizationMenuOpen}>
          <FormFieldText<OrganizationFormSchema>
            label="ville"
            name="city"
            control={form.control}
            error={form.formState.errors.city?.message}
          />
          <FormFieldText<OrganizationFormSchema>
            label="code postal"
            name="zipCode"
            control={form.control}
            error={form.formState.errors.zipCode?.message}
          />
        </CityInputsWrapper>
      </AddressInputsWrapper>
      <Button
        label="Enregistrer"
        onClick={form.handleSubmit(props.onSubmit)}
        loading={props.submitLoading}
        type="submit"
        size="small"
        disabled={!form.formState.isDirty}
      />
    </Form>
  );
};

const IdentityInputsWrapper = styled(InputsWrapper)`
  width: 100%;

  @media screen and (${({ theme }) => theme.breakpoints.md}) {
    > div:nth-child(1) {
      grid-column: 1/8;
    }
  }

  @media screen and (${({ theme }) => theme.breakpoints.lg}) {
    > div:nth-child(1) {
      grid-column: 1/7;
    }
  }

  @media screen and (${({ theme }) => theme.breakpoints.xl}) {
    > div:nth-child(1) {
      grid-column: 1/6;
    }
  }
`;

const ContactInputsWrapper = styled(InputsWrapper)`
  width: 100%;

  @media screen and (${({ theme }) => theme.breakpoints.md}) {
    > div:nth-child(1) {
      grid-column: 1/5;
    }

    > div:nth-child(2) {
      grid-column: 5/8;
    }
  }

  @media screen and (${({ theme }) => theme.breakpoints.lg}) {
    > div:nth-child(1) {
      grid-column: 1/7;
    }

    > div:nth-child(2) {
      grid-column: 7/11;
    }
  }

  @media screen and (${({ theme }) => theme.breakpoints.xl}) {
    > div:nth-child(1) {
      grid-column: 1/6;
    }

    > div:nth-child(2) {
      grid-column: 6/9;
    }
  }
`;

const AddressInputsWrapper = styled(InputsWrapper)`
  width: 100%;

  @media screen and (${({ theme }) => theme.breakpoints.md}) {
    > div:nth-child(1) {
      grid-column: 1/8;
    }

    > fieldset:nth-child(2) {
      grid-column: 1/12;
    }
  }

  @media screen and (${({ theme }) => theme.breakpoints.lg}) {
    > div:nth-child(1) {
      grid-column: 1/7;
    }

    > fieldset:nth-child(2) {
      grid-column: 1/12;
    }
  }

  @media screen and (${({ theme }) => theme.breakpoints.xl}) {
    > div:nth-child(1) {
      grid-column: 1/6;
    }

    > fieldset:nth-child(2) {
      grid-column: 6/12;
    }
  }
`;

const CityInputsWrapper = styled(InputsWrapper)`
  @media screen and (${({ theme }) => theme.breakpoints.md}) {
    > div:nth-child(1) {
      grid-column: 1/5;
    }

    > div:nth-child(2) {
      grid-column: 5/8;
    }
  }

  @media screen and (${({ theme }) => theme.breakpoints.lg}) {
    > div:nth-child(1) {
      grid-column: 1/7;
    }

    > div:nth-child(2) {
      grid-column: 7/11;
    }
  }

  @media screen and (${({ theme }) => theme.breakpoints.xl}) {
    > div:nth-child(1) {
      grid-column: 1/7;
    }

    > div:nth-child(2) {
      grid-column: 7/12;
    }
  }
`;

export default UpdateOrganizationForm;
