import { SubmitHandler } from 'react-hook-form';
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
    url: 'http://localhost:3000/api/mockHttpRequest?status=200',
  });

  const onSubmit: SubmitHandler<ResetPassword> = (
    fieldValues: ResetPassword
  ) => {
    resetPasswordMutation.mutate(fieldValues);
  };

  return (
    <Card title="Changer mon mot de passe">
      <ResetPasswordForm
        defaultValues={resetPasswordDefaultValues}
        onSubmit={onSubmit}
        submitLoading={resetPasswordMutation.isLoading}
        submitError={resetPasswordMutation.error?.response?.data.message}
      />
    </Card>
  );
};

export default ResetPasswordCard;
