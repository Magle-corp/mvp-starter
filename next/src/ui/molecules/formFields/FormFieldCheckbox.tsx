import styled from 'styled-components';
import { Controller, FieldValues } from 'react-hook-form';
import { Checkbox, CheckboxProps } from 'primereact/checkbox';
import FormField from '@/cdn/types/FormField';

type FormFieldCheckbox<T extends FieldValues> = FormField<T> &
  Partial<CheckboxProps>;

const FormFieldCheckbox = <T extends FieldValues>(
  props: FormFieldCheckbox<T>
) => {
  return (
    <div>
      <FieldWrapper>
        <Controller
          name={props.name}
          control={props.control}
          render={({ field }) => (
            <Checkbox
              id={props.name}
              className={props.error ? 'p-invalid' : ''}
              checked={field.value}
              {...field}
              aria-required={props.required}
              aria-invalid={!!props.error}
              aria-describedby={
                (props.error ? `${props.name}-error` : '') +
                ' ' +
                (props.help ? `${props.name}-format` : '')
              }
            />
          )}
        />
        <label htmlFor={props.name}>{props.label}</label>
      </FieldWrapper>
      {props.error && (
        <InputError id={`${props.name}-error`}>{props.error}</InputError>
      )}
      {props.help && (
        <InputHelp id={`${props.name}-format`}>{props.help}</InputHelp>
      )}
    </div>
  );
};

const FieldWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  width: 100%;
`;

const InputHelp = styled.p`
  padding-left: 0.25rem;
  font-size: 0.75rem;
`;

const InputError = styled.p`
  color: ${({ theme }) => theme.colors.error};
  margin-top: 0.5rem;
`;

export default FormFieldCheckbox;
