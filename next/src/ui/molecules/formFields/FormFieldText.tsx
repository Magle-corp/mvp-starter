import { Controller, FieldValues } from 'react-hook-form';
import { InputTextProps } from 'primereact/inputtext';
import { FormField } from '@/cdn/types/Form';
import FloatLabel from '@/ui/atoms/form/FloatLabel';
import InputWrapper from '@/ui/atoms/form/InputWrapper';
import InputHelp from '@/ui/atoms/form/InputHelp';
import InputError from '@/ui/atoms/form/InputError';
import InputText from '@/ui/atoms/inputs/InputText';

type FormFieldText<T extends FieldValues> = FormField<T> & InputTextProps;

const FormFieldText = <T extends FieldValues>(props: FormFieldText<T>) => {
  return (
    <InputWrapper direction="column">
      <FloatLabel htmlFor={props.name} label={props.label}>
        <Controller
          name={props.name}
          control={props.control}
          render={({ field }) => (
            <InputText
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

export default FormFieldText;
