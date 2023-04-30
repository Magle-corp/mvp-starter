import { SubmitHandler } from 'react-hook-form';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import usePost from '@/cdn/hooks/usePost';
import { ResetPassword } from '@/features/profile/types/Profile';
import ResetPasswordForm from '@/features/profile/forms/ResetPasswordForm';
import Card from '@/ui/atoms/Card';

const ResetPasswordCard = () => {
  const resetPasswordDefaultValues: ResetPassword = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const resetPasswordMutation = usePost<ResetPassword>({
    url: ApiRoutes.PROFILE_UPDATE_PASSWORD,
  });

  const onSubmit: SubmitHandler<ResetPassword> = (
    fieldValues: ResetPassword
  ) => {
    resetPasswordMutation.mutate(fieldValues);
  };

  return (
    <Card title="Changer mon mot de passe">
      {!resetPasswordMutation.isSuccess && (
        <ResetPasswordForm
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

export default ResetPasswordCard;
