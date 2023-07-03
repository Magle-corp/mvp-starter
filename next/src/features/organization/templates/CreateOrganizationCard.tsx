import { SubmitHandler } from 'react-hook-form';
import { useBackOfficeContext } from '@/ui/layouts/BackOfficeContext';
import ApiIris from '@/cdn/enums/ApiIris';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import QueryKeys from '@/cdn/enums/QueryKeys';
import usePost from '@/cdn/hooks/usePost';
import { useAuthContext } from '@/features/authentication/AuthContext';
import { OrganizationFormSchema } from '@/features/organization/forms/CreateOrganizationForm';
import CreateOrganizationForm from '@/features/organization/forms/CreateOrganizationForm';
import Card from '@/ui/atoms/Card';

const CreateOrganizationCard = () => {
  const { token, userId, getFreshToken } = useAuthContext();
  const { toast } = useBackOfficeContext();

  const organizationDefaultValues: OrganizationFormSchema = {
    name: '',
    owner: userId?.toString() ?? '',
  };

  const organizationMutation = usePost<OrganizationFormSchema>({
    url: ApiRoutes.ORGANIZATIONS,
    token: token?.token ?? undefined,
    key: QueryKeys.ORGANIZATION,
    onSuccess: () => getFreshToken(token),
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
      owner: ApiIris.USER + fieldValues.owner,
    });

  const cardDescription =
    "il est nécessaire de créer votre organisation pour profiter de l'application.";

  return (
    <Card title="Créer votre organisation" description={cardDescription}>
      <CreateOrganizationForm
        defaultValues={organizationDefaultValues}
        onSubmit={onSubmit}
        submitLoading={organizationMutation.isLoading}
        submitError={organizationMutation.error?.response?.data.message}
      />
    </Card>
  );
};

export default CreateOrganizationCard;
