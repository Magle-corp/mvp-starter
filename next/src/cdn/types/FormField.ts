import { Control, FieldError, FieldValues, Path } from 'react-hook-form';

type FormField<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  control: Control<T>;
  error: FieldError | undefined;
  help?: string;
};

export default FormField;
