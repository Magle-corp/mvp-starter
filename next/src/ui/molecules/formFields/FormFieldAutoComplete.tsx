import styled from 'styled-components';
import { Controller, FieldValues } from 'react-hook-form';
import {
  AutoComplete as PAutoComplete,
  AutoCompleteProps,
} from 'primereact/autocomplete';
import { FormField } from '@/cdn/types/Form';
import InputWrapper from '@/ui/atoms/form/InputWrapper';
import InputError from '@/ui/atoms/form/InputError';
import InputHelp from '@/ui/atoms/form/InputHelp';
import FloatLabel from '@/ui/atoms/form/FloatLabel';

type FormFieldAutoComplete<T extends FieldValues> = FormField<T> &
  AutoCompleteProps;

const FormFieldAutoComplete = <T extends FieldValues>(
  props: FormFieldAutoComplete<T>
) => {
  return (
    <InputWrapper direction="column">
      <FloatLabel htmlFor={props.name} label={props.label}>
        <Controller
          name={props.name}
          control={props.control}
          render={({ field }) => (
            <StyledAutoComplete
              id={props.name}
              className={props.error ? 'p-invalid' : ''}
              showEmptyMessage
              emptyMessage="Pas de résultats"
              {...field}
              {...props}
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

const StyledAutoComplete = styled(PAutoComplete)`
  width: 100%;

  > ul {
    display: flex;
    gap: 0.5rem;
    width: 100%;
    padding: 0.5rem !important;

    li {
      margin-right: 0 !important;
    }
  }
`;

export default FormFieldAutoComplete;
