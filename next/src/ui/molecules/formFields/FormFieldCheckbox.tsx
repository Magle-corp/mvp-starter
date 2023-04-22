import { Controller, FieldValues } from 'react-hook-form';
import { Checkbox, CheckboxProps } from 'primereact/checkbox';
import { FormField } from '@/cdn/types/Form';
import InputWrapper from '@/ui/atoms/form/InputWrapper';
import InputHelp from '@/ui/atoms/form/InputHelp';
import InputError from '@/ui/atoms/form/InputError';

type FormFieldCheckbox<T extends FieldValues> = FormField<T> &
  Partial<CheckboxProps>;

const FormFieldCheckbox = <T extends FieldValues>(
  props: FormFieldCheckbox<T>
) => {
  return (
    <InputWrapper direction="column">
      <InputWrapper direction="row">
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
      </InputWrapper>
      {props.error && (
        <InputError id={`${props.name}-error`}>{props.error}</InputError>
      )}
      {props.help && (
        <InputHelp id={`${props.name}-format`}>{props.help}</InputHelp>
      )}
    </InputWrapper>
  );
};

export default FormFieldCheckbox;
