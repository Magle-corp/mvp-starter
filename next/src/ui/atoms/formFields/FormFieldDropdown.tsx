import styled from 'styled-components';
import { Controller, FieldValues } from 'react-hook-form';
import { Dropdown, DropdownProps } from 'primereact/dropdown';
import { FormField } from '@/cdn/types/Form';
import FloatLabel from '@/ui/atoms/form/FloatLabel';
import InputWrapper from '@/ui/atoms/form/InputWrapper';
import InputError from '@/ui/atoms/form/InputError';
import InputHelp from '@/ui/atoms/form/InputHelp';

type FormFieldDropdown<T extends FieldValues> = FormField<T> & DropdownProps;

const FormFieldDropdown = <T extends FieldValues>(
  props: FormFieldDropdown<T>
) => {
  return (
    <InputWrapper direction="column">
      <FloatLabel htmlFor={props.name} label={props.label}>
        <Controller
          name={props.name}
          control={props.control}
          render={({ field }) => (
            <StyledDropdown
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

const StyledDropdown = styled(Dropdown)`
  width: 100%;
`;

export default FormFieldDropdown;
