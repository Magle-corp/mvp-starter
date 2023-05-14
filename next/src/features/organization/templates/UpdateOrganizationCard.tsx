import { SubmitHandler } from 'react-hook-form';
import { useBackOfficeContext } from '@/cdn/BackOfficeContext';
import ApiIris from '@/cdn/enums/ApiIris';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import QueryKeys from '@/cdn/enums/QueryKeys';
import usePut from '@/cdn/hooks/usePut';
import useGetOrganization from '@/cdn/queries/useGetOrganization';
import { useAuthContext } from '@/features/authentication/AuthContext';
import { useOrganizationContext } from '@/features/organization/OrganizationContext';
import { OrganizationFormSchema } from '@/features/organization/forms/UpdateOrganizationForm';
import UpdateOrganizationForm from '@/features/organization/forms/UpdateOrganizationForm';
import Card from '@/ui/atoms/Card';

const UpdateOrganizationCard = () => {
  const { token } = useAuthContext();
  const { organization, setOrganization } = useOrganizationContext();
  const { toast } = useBackOfficeContext();

  const organizationDefaultValue: OrganizationFormSchema = {
    name: organization?.name ?? '',
    owner: organization?.owner.id.toString() ?? '',
  };

  const organizationMutation = usePut<OrganizationFormSchema>({
    url: ApiRoutes.ORGANIZATIONS + '/' + organization?.id,
    token: token?.token ?? undefined,
    key: QueryKeys.ORGANIZATION + organization?.id,
    onSuccess: () => organizationQuery.refetch(),
    onError: () =>
      toast.current.show({
        severity: 'error',
        summary: 'Organisation',
        detail: 'Un problème technique est survenu',
      }),
  });

  const organizationQuery = useGetOrganization({
    entityId: organization?.id,
    token: token?.token,
    enabled: false,
    onSuccess: (data) => {
      setOrganization(data);
      toast.current.show({
        severity: 'success',
        summary: 'Organisation',
        detail: 'Mise à jour avec succès',
      });
    },
  });

  const onSubmit: SubmitHandler<OrganizationFormSchema> = (
    fieldValues: OrganizationFormSchema
  ) =>
    organizationMutation.mutate({
      name: fieldValues.name,
      owner: ApiIris.USER + fieldValues.owner,
    });

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
