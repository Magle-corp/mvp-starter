import styled from 'styled-components';
import { SubmitHandler } from 'react-hook-form';
import { confirmDialog } from 'primereact/confirmdialog';
import { useAppContext } from '@/cdn/AppContext';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import QueryKeys from '@/cdn/enums/QueryKeys';
import useDelete from '@/cdn/hooks/useDelete';
import { useAuthContext } from '@/features/authentication/AuthContext';
import { OrganizationFormSchema } from '@/features/organization/forms/DeleteOrganizationForm';
import DeleteOrganizationForm from '@/features/organization/forms/DeleteOrganizationForm';
import Card from '@/ui/atoms/Card';

const DeleteOrganizationCard = () => {
  const { token, getFreshToken, organization } = useAuthContext();
  const { toast } = useAppContext();

  const formDefaultValues: OrganizationFormSchema = {
    name: '',
  };

  const organizationMutation = useDelete<OrganizationFormSchema>({
    url: ApiRoutes.ORGANIZATIONS + '/' + organization?.id,
    token: token?.token ?? undefined,
    key: QueryKeys.ORGANIZATION + organization?.id,
    onSuccess: () => getFreshToken(token),
    onError: () =>
      toast.current.show({
        severity: 'error',
        summary: 'Organisation',
        detail: 'Un problème technique est survenu',
      }),
  });

  const onSubmit: SubmitHandler<OrganizationFormSchema> = () =>
    confirmDialog({
      message:
        'Cette action est irréversible, êtes-vous sûr de vouloir continuer ?',
      header: 'Supprimer mon organisation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => organizationMutation.mutate(),
    });

  const cardDescription = (
    <DescriptionWrapper>
      <p>
        action irréversible, toutes les données liées à cette organisation
        seront définitivement effacées.
      </p>
      <WarningWrapper>
        <p>
          Assurez-vous de sauvegarder toutes les informations importantes avant
          de procéder à la suppression.
        </p>
        <p>
          <BoldInfo>
            Pour confirmer la suppression veuillez saisir le nom de votre
            organisation
          </BoldInfo>
          {' : '}
          <OrganisationName>{organization?.name}</OrganisationName>
        </p>
      </WarningWrapper>
    </DescriptionWrapper>
  );

  return (
    <StyledCard
      title="Supprimer mon organisation"
      description={cardDescription}
    >
      <DeleteOrganizationForm
        defaultValues={formDefaultValues}
        onSubmit={onSubmit}
        submitLoading={organizationMutation.isLoading}
        submitError={organizationMutation.error?.response?.data.message}
      />
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  border-left: 3px solid ${({ theme }) => theme.colors.error};
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const WarningWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const BoldInfo = styled.span`
  font-weight: 700;
  padding-bottom: 2px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
`;

const OrganisationName = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.error};
`;

export default DeleteOrganizationCard;
