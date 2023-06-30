import { SubmitHandler } from 'react-hook-form';
import { useAppContext } from '@/cdn/AppContext';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import QueryKeys from '@/cdn/enums/QueryKeys';
import usePut from '@/cdn/hooks/usePut';
import { useAuthContext } from '@/features/authentication/AuthContext';
import { OrganizationFormSchema } from '@/features/organization/forms/UpdateOrganizationForm';
import UpdateOrganizationForm from '@/features/organization/forms/UpdateOrganizationForm';
import Card from '@/ui/atoms/Card';

const UpdateOrganizationCard = () => {
  const { token, organization, getFreshToken } = useAuthContext();
  const { toast } = useAppContext();

  const organizationDefaultValue: OrganizationFormSchema = {
    name: organization?.name ?? '',
  };

  const organizationMutation = usePut<OrganizationFormSchema>({
    url: ApiRoutes.ORGANIZATIONS + '/' + organization?.id,
    token: token?.token ?? undefined,
    key: QueryKeys.ORGANIZATION + organization?.id,
    onSuccess: () => {
      getFreshToken(token);
      toast.current.show({
        severity: 'success',
        summary: 'Organisation',
        detail: 'Mis à jour avec succès',
      });
    },
    onError: () =>
      toast.current.show({
        severity: 'error',
        summary: 'Organisation',
        detail: 'Un problème technique est survenu',
      }),
  });

  const onSubmit: SubmitHandler<OrganizationFormSchema> = (
    fieldValues: OrganizationFormSchema
  ) =>
    organizationMutation.mutate({
      name: fieldValues.name,
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
