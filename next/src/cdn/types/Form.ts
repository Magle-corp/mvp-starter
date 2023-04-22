import {
  Control,
  FieldError,
  FieldValues,
  Path,
  SubmitHandler,
} from 'react-hook-form';

type FormHandler<T extends FieldValues> = {
  onSubmit: SubmitHandler<T>;
  submitLoading: boolean;
  submitError: string | undefined;
};

type FormField<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  control: Control<T>;
  error: FieldError['message'] | undefined;
  help?: string;
};

export type { FormHandler, FormField };
