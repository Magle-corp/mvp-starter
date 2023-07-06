import styled from 'styled-components';
import { SubmitHandler } from 'react-hook-form';
import { useBackOfficeContext } from '@/ui/layouts/BackOfficeContext';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import Medias from '@/cdn/enums/Medias';
import QueryKeys from '@/cdn/enums/QueryKeys';
import useAvatarCreateMutation from '@/features/documents/queries/useAvatarCreateMutation';
import useAvatarDeleteMutation from '@/features/documents/queries/useAvatarDeleteMutation';
import usePut from '@/cdn/hooks/usePut';
import { useAuthContext } from '@/features/authentication/AuthContext';
import { OrganizationFormSchema } from '@/features/organization/forms/UpdateOrganizationForm';
import UpdateOrganizationForm from '@/features/organization/forms/UpdateOrganizationForm';
import OrganizationAvatarUploader from '@/features/organization/components/OrganizationAvatarUploader';
import Card from '@/ui/atoms/Card';

const UpdateOrganizationCard = () => {
  const { token, organization, getFreshToken } = useAuthContext();
  const { toast } = useBackOfficeContext();

  const organizationDefaultValue: OrganizationFormSchema = {
    name: organization?.name ?? '',
  };

  const organizationUpdateMutation = usePut<OrganizationFormSchema>({
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
    onError: () => errorToast(),
  });

  const onOrganizationUpdateSubmit: SubmitHandler<OrganizationFormSchema> = (
    fieldValues: OrganizationFormSchema
  ) =>
    organizationUpdateMutation.mutate({
      name: fieldValues.name,
    });

  const avatarCreateMutation = useAvatarCreateMutation(
    ApiRoutes.ORGANIZATION_AVATARS,
    Medias.ORGANIZATION_AVATAR,
    token?.token,
    () => getFreshToken(token)
  );

  const onAvatarCreateSubmit = (formData: FormData) => {
    avatarCreateMutation.mutate(formData);
  };

  const avatarDeleteMutation = useAvatarDeleteMutation(
    ApiRoutes.ORGANIZATION_AVATARS,
    Medias.ORGANIZATION_AVATAR,
    token?.token,
    () => getFreshToken(token)
  );

  const onAvatarDeleteSubmit = () => {
    if (organization?.avatar?.id) {
      avatarDeleteMutation.mutate(organization.avatar.id);
    }
  };

  const errorToast = () =>
    toast.current.show({
      severity: 'error',
      summary: 'Animal',
      detail: 'Un problème technique est survenu',
    });

  return (
    <Card title="Mettre à jour mon organisation">
      <ContentWrapper>
        <OrganizationAvatarUploader
          organization={organization}
          onCreate={onAvatarCreateSubmit}
          createQuery={avatarCreateMutation}
          onDelete={onAvatarDeleteSubmit}
          deleteQuery={avatarDeleteMutation}
        />
        <UpdateOrganizationForm
          defaultValues={organizationDefaultValue}
          onSubmit={onOrganizationUpdateSubmit}
          submitLoading={organizationUpdateMutation.isLoading}
          submitError={organizationUpdateMutation.error?.response?.data.message}
        />
      </ContentWrapper>
    </Card>
  );
};

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 3rem;

  @media screen and (${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: max-content 1fr;
    grid-gap: 2rem;

    > :nth-child(2) {
      margin-top: 0.75rem;
    }
  }
`;

export default UpdateOrganizationCard;
