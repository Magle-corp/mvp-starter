import styled from 'styled-components';
import { Controller, FieldValues } from 'react-hook-form';
import { PasswordProps } from 'primereact/password';
import FormField from '@/cdn/types/FormField';
import FloatLabel from '@/ui/atoms/FloatLabel';
import InputPassword from '@/ui/atoms/inputs/InputPassword';

type FormFieldPassword<T extends FieldValues> = FormField<T> & PasswordProps;

const FormFieldPassword = <T extends FieldValues>(
  props: FormFieldPassword<T>
) => {
  return (
    <FieldWrapper>
      <FloatLabel htmlFor={props.name} label={props.label}>
        <Controller
          name={props.name}
          control={props.control}
          render={({ field }) => (
            <InputPassword
              id={props.name}
              className={props.error?.message ? 'p-invalid' : ''}
              {...field}
              {...props}
            />
          )}
        />
      </FloatLabel>
      {!props.error && props.help && <InputHelp>{props.help}</InputHelp>}
      {props.error && <InputError>{props.error.message}</InputError>}
    </FieldWrapper>
  );
};

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const InputHelp = styled.p`
  padding-left: 0.25rem;
  font-size: 0.75rem;
`;

const InputError = styled.p`
  padding-left: 0.25rem;
  color: ${({ theme }) => theme.colors.error};
`;

export default FormFieldPassword;
