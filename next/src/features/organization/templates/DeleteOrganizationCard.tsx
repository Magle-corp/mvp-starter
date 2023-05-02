import styled from 'styled-components';
import { SubmitHandler } from 'react-hook-form';
import { confirmDialog } from 'primereact/confirmdialog';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import QueryKeys from '@/cdn/enums/QueryKeys';
import useDelete from '@/cdn/hooks/useDelete';
import { useAuthContext } from '@/features/authentication/AuthContext';
import { useOrganizationContext } from '@/features/organization/OrganizationContext';
import Organization from '@/features/organization/types/Organization';
import DeleteOrganizationForm from '@/features/organization/forms/DeleteOrganizationForm';
import Card from '@/ui/atoms/Card';

const DeleteOrganizationCard = () => {
  const { token, getFreshToken } = useAuthContext();
  const { organization } = useOrganizationContext();

  const formDefaultValues: Partial<Organization> = {
    name: '',
  };

  const organizationMutation = useDelete<Partial<Organization>>({
    url: ApiRoutes.ORGANIZATION + '/' + organization?.id,
    token: token?.token ?? undefined,
    key: QueryKeys.ORGANIZATIONS,
    onSuccess: () => {
      getFreshToken(token);
    },
  });

  const onSubmit: SubmitHandler<Partial<Organization>> = () => {
    confirmDialog({
      message:
        'Cette action est irréversible, êtes-vous sûr de vouloir continuer ?',
      header: 'Supprimer mon organisation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => organizationMutation.mutate(),
    });
  };

  return (
    <StyledCard title="Supprimer mon organisation">
      <InfoWrapper>
        <div>
          <p>
            <BoldInfo>Action irréversible</BoldInfo>, toutes les données liées à
            cette organisation seront{' '}
            <BoldInfo>définitivement effacées</BoldInfo>.
          </p>
          <p>
            Assurez-vous de sauvegarder toutes les informations importantes
            avant de procéder à la suppression.
          </p>
        </div>
        <p>
          <BoldInfo>
            Pour confirmer la suppression veuillez saisir le nom de votre
            organisation
          </BoldInfo>
          {' : '}
          <OrganisationName>{organization?.name}</OrganisationName>
        </p>
      </InfoWrapper>
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

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const BoldInfo = styled.span`
  font-weight: 700;
  text-decoration: underline;
`;

const OrganisationName = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.error};
`;

export default DeleteOrganizationCard;
