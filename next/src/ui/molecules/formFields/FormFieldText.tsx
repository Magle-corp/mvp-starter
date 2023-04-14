import styled from 'styled-components';
import { Controller, FieldValues } from 'react-hook-form';
import { InputTextProps } from 'primereact/inputtext';
import FormField from '@/cdn/types/FormField';
import FloatLabel from '@/ui/atoms/FloatLabel';
import InputText from '@/ui/atoms/inputs/InputText';

type FormFieldText<T extends FieldValues> = FormField<T> & InputTextProps;

const FormFieldText = <T extends FieldValues>(props: FormFieldText<T>) => {
  return (
    <FieldWrapper>
      <FloatLabel htmlFor={props.name} label={props.label}>
        <Controller
          name={props.name}
          control={props.control}
          render={({ field }) => (
            <InputText
              id={props.name}
              className={props.error ? 'p-invalid' : ''}
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
      </FloatLabel>
      {props.error && (
        <InputError id={`${props.name}-error`}>{props.error}</InputError>
      )}
      {props.help && (
        <InputHelp id={`${props.name}-format`}>{props.help}</InputHelp>
      )}
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

export default FormFieldText;
