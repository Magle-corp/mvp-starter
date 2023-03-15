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
              className={props.error?.message ? 'p-invalid' : ''}
              {...field}
              {...props}
            />
          )}
        />
      </FloatLabel>
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

const InputError = styled.p`
  color: ${({ theme }) => theme.colors.error};
`;

export default FormFieldText;
