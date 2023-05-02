import { SubmitHandler } from 'react-hook-form';
import { useBackOfficeContext } from '@/cdn/BackOfficeContext';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import QueryKeys from '@/cdn/enums/QueryKeys';
import usePut from '@/cdn/hooks/usePut';
import useGet from '@/cdn/hooks/useGet';
import { useAuthContext } from '@/features/authentication/AuthContext';
import { useOrganizationContext } from '@/features/organization/OrganizationContext';
import Organization from '@/features/organization/types/Organization';
import UpdateOrganizationForm from '@/features/organization/forms/UpdateOrganizationForm';
import Card from '@/ui/atoms/Card';

const UpdateOrganizationCard = () => {
  const { token } = useAuthContext();
  const { organization } = useOrganizationContext();
  const { toast } = useBackOfficeContext();

  const organizationDefaultValue: Partial<Organization> = {
    name: organization?.name ?? '',
  };

  const organizationMutation = usePut<Partial<Organization>>({
    url: ApiRoutes.ORGANIZATIONS + '/' + organization?.id,
    token: token?.token ?? undefined,
    key: QueryKeys.ORGANIZATIONS,
    onSuccess: () => {
      freshOrganizationMutation.refetch();
    },
    onError: () => {
      toast.current.show({
        severity: 'error',
        summary: 'Organisation',
        detail: 'Un problème technique est survenu',
      });
    },
  });

  const freshOrganizationMutation = useGet<Organization>({
    url: ApiRoutes.ORGANIZATIONS + '/' + organization?.id,
    token: token?.token ?? undefined,
    key: QueryKeys.ORGANIZATIONS,
    enabled: false,
    onSuccess: () => {
      toast.current.show({
        severity: 'success',
        summary: 'Organisation',
        detail: 'Mise à jour avec succès',
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
