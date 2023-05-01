import { SubmitHandler } from 'react-hook-form';
import { useBackOfficeContext } from '@/cdn/BackOfficeContext';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import usePut from '@/cdn/hooks/usePut';
import { useAuthContext } from '@/features/authentication/AuthContext';
import { useOrganizationContext } from '@/features/organization/OrganizationContext';
import Organization from '@/features/organization/types/Organization';
import UpdateOrganizationForm from '@/features/organization/forms/UpdateOrganizationForm';
import Card from '@/ui/atoms/Card';

const UpdateOrganizationCard = () => {
  const { token, getFreshToken } = useAuthContext();
  const { organization } = useOrganizationContext();
  const { toast } = useBackOfficeContext();

  const organizationDefaultValue: Partial<Organization> = {
    name: organization?.name ?? '',
  };

  const organizationMutation = usePut<Partial<Organization>>({
    url: ApiRoutes.ORGANIZATION + '/' + organization?.id,
    onSuccess: () => {
      getFreshToken(token);
      toast.current.show({
        severity: 'success',
        summary: 'Organisation',
        detail: 'Mise à jour avec succès',
      });
    },
    onError: () => {
      toast.current.show({
        severity: 'error',
        summary: 'Organisation',
        detail: 'Un problème technique est survenu',
      });
    },
  });

  const onSubmit: SubmitHandler<Partial<Organization>> = (
    fieldValues: Partial<Organization>
  ) => {
    organizationMutation.mutate(fieldValues);
  };

  return (
    <Card title="Mettre à jour mon organisation">
      <UpdateOrganizationForm
        defaultValues={organizationDefaultValue}
        onSubmit={onSubmit}
        submitLoading={organizationMutation.isLoading}
        submitError={organizationMutation.error?.response?.data.message}
      />
    </Card>
  );
};

export default UpdateOrganizationCard;
