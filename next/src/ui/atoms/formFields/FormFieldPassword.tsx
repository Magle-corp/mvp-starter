import styled from 'styled-components';
import { Controller, FieldValues } from 'react-hook-form';
import { Password, PasswordProps } from 'primereact/password';
import { FormField } from '@/cdn/types/Form';
import FloatLabel from '@/ui/atoms/form/FloatLabel';
import InputWrapper from '@/ui/atoms/form/InputWrapper';
import InputHelp from '@/ui/atoms/form/InputHelp';
import InputError from '@/ui/atoms/form/InputError';

type FormFieldPassword<T extends FieldValues> = FormField<T> & PasswordProps;

const FormFieldPassword = <T extends FieldValues>(
  props: FormFieldPassword<T>
) => {
  return (
    <InputWrapper direction="column">
      <FloatLabel htmlFor={props.name} label={props.label}>
        <Controller
          name={props.name}
          control={props.control}
          render={({ field }) => (
            <StyledInputPassword
              id={props.name}
              className={props.error ? 'p-invalid' : ''}
              {...field}
              {...props}
              aria-required={props.required}
              aria-invalid={!!props.error}
              aria-describedby={
                (props.error ? `${props.name}-error` : '') +
                (props.error && props.help ? ' ' : '') +
                (props.help ? `${props.name}-format` : '')
              }
            />
          )}
        />
      </FloatLabel>
      {props.error && (
        <InputError id={`${props.name}-error`}>{props.error}</InputError>
      )}
      {props.help && (
        <InputHelp id={`${props.name}-format`}>{props.help}</InputHelp>
      )}
    </InputWrapper>
  );
};

const StyledInputPassword = styled(Password)`
  width: 100%;

  .p-password-input {
    width: 100%;
  }
`;

export default FormFieldPassword;
