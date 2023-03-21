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
              className={props.error?.message ? 'p-invalid' : ''}
              checked={field.value}
              {...field}
              {...props}
            />
          )}
        />
        <label htmlFor={props.name}>{props.label}</label>
      </FieldWrapper>
      {props.error && <InputError>{props.error.message}</InputError>}
    </div>
  );
};

const FieldWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  width: 100%;
`;

const InputError = styled.p`
  color: ${({ theme }) => theme.colors.error};
  margin-top: 0.5rem;
`;

export default FormFieldCheckbox;
