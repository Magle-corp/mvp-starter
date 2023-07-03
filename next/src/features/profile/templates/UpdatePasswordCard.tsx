import { SubmitHandler } from 'react-hook-form';
import { useBackOfficeContext } from '@/ui/layouts/BackOfficeContext';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import usePost from '@/cdn/hooks/usePost';
import { useAuthContext } from '@/features/authentication/AuthContext';
import { PasswordFormSchema } from '@/features/profile/forms/UpdatePasswordForm';
import UpdatePasswordForm from '@/features/profile/forms/UpdatePasswordForm';
import Card from '@/ui/atoms/Card';

const UpdatePasswordCard = () => {
  const { token } = useAuthContext();
  const { toast } = useBackOfficeContext();

  const resetPasswordDefaultValues: PasswordFormSchema = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const resetPasswordMutation = usePost<PasswordFormSchema>({
    url: ApiRoutes.PROFILE_UPDATE_PASSWORD,
    token: token?.token ?? undefined,
    onSuccess: () =>
      toast.current.show({
        severity: 'success',
        summary: 'Profil',
        detail: 'Mis à jour avec succès',
      }),
    onError: () =>
      toast.current.show({
        severity: 'error',
        summary: 'Profil',
        detail: 'Un problème technique est survenu',
      }),
  });

  const onSubmit: SubmitHandler<PasswordFormSchema> = (
    fieldValues: PasswordFormSchema
  ) => resetPasswordMutation.mutate(fieldValues);

  return (
    <Card title="Changer mon mot de passe">
      <UpdatePasswordForm
        defaultValues={resetPasswordDefaultValues}
        onSubmit={onSubmit}
        submitLoading={resetPasswordMutation.isLoading}
        submitError={resetPasswordMutation.error?.response?.data.message}
      />
    </Card>
  );
};

export default UpdatePasswordCard;
