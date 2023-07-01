import styled from 'styled-components';
import { Controller, FieldValues } from 'react-hook-form';
import { InputSwitch, InputSwitchProps } from 'primereact/inputswitch';
import { FormField } from '@/cdn/types/Form';
import InputWrapper from '@/ui/atoms/form/InputWrapper';
import InputHelp from '@/ui/atoms/form/InputHelp';
import InputError from '@/ui/atoms/form/InputError';

type FormFieldSwitch<T extends FieldValues> = FormField<T> & InputSwitchProps;

const FormFieldSwitch = <T extends FieldValues>(props: FormFieldSwitch<T>) => {
  return (
    <StyledInputWrapper direction="column">
      <StyledInputWrapper direction="row">
        <label htmlFor={props.name}>{props.label}</label>
        <Controller
          name={props.name}
          control={props.control}
          render={({ field }) => (
            <InputSwitch
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
      </StyledInputWrapper>
      {props.error && (
        <InputError id={`${props.name}-error`}>{props.error}</InputError>
      )}
      {props.help && (
        <InputHelp id={`${props.name}-format`}>{props.help}</InputHelp>
      )}
    </StyledInputWrapper>
  );
};

const StyledInputWrapper = styled(InputWrapper)`
  align-items: center;
  width: max-content;
`;

export default FormFieldSwitch;
