import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { boolean, object, ref, Schema, string } from 'yup';
import { FormHandler } from '@/cdn/types/Form';
import { SignUp } from '@/features/authentication/types/AuthFormSchema';
import Form from '@/ui/atoms/form/Form';
import FormError from '@/ui/atoms/form/FormError';
import InputsWrapper from '@/ui/atoms/form/InputsWrapper';
import FormFieldCheckbox from '@/ui/molecules/formFields/FormFieldCheckbox';
import FormFieldText from '@/ui/molecules/formFields/FormFieldText';
import FormFieldPassword from '@/ui/molecules/formFields/FormFieldPassword';
import Button from '@/ui/atoms/Button';

const SignUpForm = (props: FormHandler<SignUp>) => {
  const schema: Schema<SignUp> = object({
    email: string()
      .min(5, 'Minimum 5 caractères')
      .max(80, 'Maximum 80 caractères')
      .email('Format invalide')
      .required('Champ requis'),
    password: string()
      .min(8, 'Minimum 8 caractères')
      .max(25, 'Maximum 25 caractères')
      .required('Champ requis'),
    confirmPassword: string()
      .oneOf([ref('password')], 'Les mots de passes ne correspondent pas')
      .required('Champ requis'),
    acceptCGU: boolean().oneOf([true], 'Accord nécessaire').required(),
  });

  const form = useForm<SignUp>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: props.defaultValues,
  });

  return (
    <Form>
      {props.submitError && <FormError>{props.submitError}</FormError>}
      <InputsWrapper>
        <FormFieldText<SignUp>
          label="adresse email *"
          name="email"
          control={form.control}
          error={form.formState.errors.email?.message}
          required
        />
        <FormFieldPassword<SignUp>
          label="mot de passe *"
          name="password"
          control={form.control}
          error={form.formState.errors.password?.message}
          help="Minimum 8 caractères, maximum 25"
          required
        />
        <FormFieldPassword<SignUp>
          label="confirmer mot de passe *"
          name="confirmPassword"
          control={form.control}
          error={form.formState.errors.confirmPassword?.message}
          feedback={false}
          required
        />
        <FormFieldCheckbox<SignUp>
          label="J'accepte les conditions générales d'utilisation *"
          name="acceptCGU"
          control={form.control}
          error={form.formState.errors.acceptCGU?.message}
          required
        />
      </InputsWrapper>
      <Button
        label="S'inscrire"
        onClick={form.handleSubmit(props.onSubmit)}
        loading={props.submitLoading}
        type="submit"
      />
    </Form>
  );
};

export default SignUpForm;
