import { useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { object, Schema, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useBackOfficeContext } from '@/ui/layouts/BackOfficeContext';
import { FormHandler } from '@/cdn/types/Form';
import useGetCollectionAnimalTemper from '@/cdn/queries/useGetCollectionAnimalTemper';
import { stringStrictComparison } from '@/cdn/utils/autoComplete';
import { useAuthContext } from '@/features/authentication/AuthContext';
import FormFieldText from '@/ui/atoms/formFields/FormFieldText';
import Button from '@/ui/atoms/Button';
import Form from '@/ui/atoms/form/Form';
import FormError from '@/ui/atoms/form/FormError';
import InputsWrapper from '@/ui/atoms/form/InputsWrapper';

export type TemperFormSchema = {
  name: string;
  organization: string;
};

const TemperForm = (props: FormHandler<TemperFormSchema>) => {
  const { token, organization } = useAuthContext();
  const { organizationMenuOpen, toast } = useBackOfficeContext();

  useEffect(() => {
    tempersQuery.refetch();
  }, []);

  const tempersQuery = useGetCollectionAnimalTemper({
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

  const schema: Schema<TemperFormSchema> = object({
    name: string()
      .min(2, 'Minimum 2 caractères')
      .max(50, 'Maximum 50 caractères')
      .required('Champ requis')
      .test({
        test: (value) => nameCustomValidator(value),
        message: 'Caractère déjà enregistré',
      }),
    organization: string().required(),
  });

  const nameCustomValidator = (value: string) => {
    return !tempersQuery.data?.data['hydra:member'].some((temper) =>
      stringStrictComparison(temper.name, value)
    );
  };

  const form = useForm<TemperFormSchema>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: props.defaultValues,
  });

  return (
    <>
      {tempersQuery.data && (
        <Form>
          {props.submitError && <FormError>{props.submitError}</FormError>}
          <StyledInputsWrapper organizationMenuOpen={organizationMenuOpen}>
            <FormFieldText<TemperFormSchema>
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

export default TemperForm;
