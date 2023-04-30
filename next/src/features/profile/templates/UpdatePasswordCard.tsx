import { SubmitHandler } from 'react-hook-form';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import usePost from '@/cdn/hooks/usePost';
import { UpdatePassword } from '@/features/profile/types/Profile';
import UpdatePasswordForm from '@/features/profile/forms/UpdatePasswordForm';
import Card from '@/ui/atoms/Card';

const UpdatePasswordCard = () => {
  const resetPasswordDefaultValues: UpdatePassword = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const resetPasswordMutation = usePost<UpdatePassword>({
    url: ApiRoutes.PROFILE_UPDATE_PASSWORD,
  });

  const onSubmit: SubmitHandler<UpdatePassword> = (
    fieldValues: UpdatePassword
  ) => {
    resetPasswordMutation.mutate(fieldValues);
  };

  return (
    <Card title="Changer mon mot de passe">
      {!resetPasswordMutation.isSuccess && (
        <UpdatePasswordForm
          defaultValues={resetPasswordDefaultValues}
          onSubmit={onSubmit}
          submitLoading={resetPasswordMutation.isLoading}
          submitError={resetPasswordMutation.error?.response?.data.message}
        />
      )}
      {resetPasswordMutation.isSuccess && <p>Mot de passe enregistré 🔒</p>}
    </Card>
  );
};

export default UpdatePasswordCard;
