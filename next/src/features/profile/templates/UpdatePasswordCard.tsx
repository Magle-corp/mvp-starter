import { SubmitHandler } from 'react-hook-form';
import { useBackOfficeContext } from '@/cdn/BackOfficeContext';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import usePost from '@/cdn/hooks/usePost';
import { useAuthContext } from '@/features/authentication/AuthContext';
import { UpdatePassword } from '@/features/profile/types/Profile';
import UpdatePasswordForm from '@/features/profile/forms/UpdatePasswordForm';
import Card from '@/ui/atoms/Card';

const UpdatePasswordCard = () => {
  const { token } = useAuthContext();
  const { toast } = useBackOfficeContext();

  const resetPasswordDefaultValues: UpdatePassword = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const resetPasswordMutation = usePost<UpdatePassword>({
    url: ApiRoutes.PROFILE_UPDATE_PASSWORD,
    token: token?.token ?? undefined,
    onSuccess: () => {
      toast.current.show({
        severity: 'success',
        summary: 'Profil',
        detail: 'Mis à jour avec succès',
      });
    },
    onError: () => {
      toast.current.show({
        severity: 'error',
        summary: 'Profil',
        detail: 'Un problème technique est survenu',
      });
    },
  });

  const onSubmit: SubmitHandler<UpdatePassword> = (
    fieldValues: UpdatePassword
  ) => {
    resetPasswordMutation.mutate(fieldValues);
  };

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
