import { Controller, FieldValues } from 'react-hook-form';
import { Checkbox, CheckboxProps } from 'primereact/checkbox';
import FormField from '@/cdn/types/FormField';
import FieldWrapper from '@/ui/atoms/form/FieldWrapper';
import InputHelp from '@/ui/atoms/form/InputHelp';
import InputError from '@/ui/atoms/form/InputError';

type FormFieldCheckbox<T extends FieldValues> = FormField<T> &
  Partial<CheckboxProps>;

const FormFieldCheckbox = <T extends FieldValues>(
  props: FormFieldCheckbox<T>
) => {
  return (
    <FieldWrapper direction="column">
      <FieldWrapper direction="row">
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
    </FieldWrapper>
  );
};

export default FormFieldCheckbox;
