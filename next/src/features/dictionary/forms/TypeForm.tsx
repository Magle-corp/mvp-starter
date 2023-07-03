import { useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { object, Schema, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useBackOfficeContext } from '@/cdn/BackOfficeContext';
import { FormHandler } from '@/cdn/types/Form';
import useGetAnimalTypes from '@/cdn/queries/useGetAnimalTypes';
import { stringStrictComparison } from '@/cdn/utils/autoComplete';
import { useAuthContext } from '@/features/authentication/AuthContext';
import FormFieldText from '@/ui/atoms/formFields/FormFieldText';
import Button from '@/ui/atoms/Button';
import Form from '@/ui/atoms/form/Form';
import FormError from '@/ui/atoms/form/FormError';
import InputsWrapper from '@/ui/atoms/form/InputsWrapper';

export type TypeFormSchema = {
  name: string;
  organization: string;
};

const TypeForm = (props: FormHandler<TypeFormSchema>) => {
  const { token, organization } = useAuthContext();
  const { organizationMenuOpen, toast } = useBackOfficeContext();

  useEffect(() => {
    typesQuery.refetch();
  }, []);

  const typesQuery = useGetAnimalTypes({
    organizationId: organization?.id,
    token: token?.token,
    enabled: false,
    onError: () =>
      toast.current.show({
        severity: 'error',
        summary: 'Dictionnaire',
        detail: 'Un problème technique est survenu',
      }),
  });

  const schema: Schema<TypeFormSchema> = object({
    name: string()
      .min(2, 'Minimum 2 caractères')
      .max(50, 'Maximum 50 caractères')
      .required('Champ requis')
      .test({
        test: (value) => nameCustomValidator(value),
        message: 'Type déjà enregistré',
      }),
    organization: string().required(),
  });

  const nameCustomValidator = (value: string) => {
    return !typesQuery.data?.data['hydra:member'].some((type) =>
      stringStrictComparison(type.name, value)
    );
  };

  const form = useForm<TypeFormSchema>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: props.defaultValues,
  });

  return (
    <>
      {typesQuery.data && (
        <Form>
          {props.submitError && <FormError>{props.submitError}</FormError>}
          <StyledInputsWrapper organizationMenuOpen={organizationMenuOpen}>
            <FormFieldText<TypeFormSchema>
              label="nom *"
              name="name"
              control={form.control}
              error={form.formState.errors.name?.message}
              help="Minimum 2 caractères, maximum 50"
              required
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

export default TypeForm;
