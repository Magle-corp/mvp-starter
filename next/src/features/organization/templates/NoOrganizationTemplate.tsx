import { SubmitHandler } from 'react-hook-form';
import ApiIris from '@/cdn/enums/ApiIris';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import usePost from '@/cdn/hooks/usePost';
import { useAuthContext } from '@/features/authentication/AuthContext';
import Organization from '@/features/organization/types/Organization';
import CreateOrganizationForm from '@/features/organization/forms/CreateOrganizationForm';
import Card from '@/ui/atoms/Card';

const NoOrganizationTemplate = () => {
  const { token, tokenPayload, getFreshToken } = useAuthContext();

  const organizationDefaultValues: Organization = {
    name: '',
    owner: ApiIris.USER + tokenPayload?.user_id ?? 0,
  };

  const organizationMutation = usePost<Organization>({
    url: ApiRoutes.ORGANIZATION,
    token: token?.token ?? undefined,
    onSuccess: () => {
      getFreshToken(token);
    },
  });

  const onSubmit: SubmitHandler<Organization> = (fieldValues: Organization) => {
    organizationMutation.mutate(fieldValues);
  };

  return (
    <Card title="Créons votre organisation">
      <CreateOrganizationForm
        defaultValues={organizationDefaultValues}
        onSubmit={onSubmit}
        submitLoading={organizationMutation.isLoading}
        submitError={organizationMutation.error?.response?.data.message}
      />
    </Card>
  );
};

export default NoOrganizationTemplate;
