import styled from 'styled-components';
import { SubmitHandler } from 'react-hook-form';
import ApiIris from '@/cdn/enums/ApiIris';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import QueryKeys from '@/cdn/enums/QueryKeys';
import usePost from '@/cdn/hooks/usePost';
import { useAuthContext } from '@/features/authentication/AuthContext';
import Organization from '@/features/organization/types/Organization';
import CreateOrganizationForm from '@/features/organization/forms/CreateOrganizationForm';
import Card from '@/ui/atoms/Card';

const CreateOrganizationCard = () => {
  const { token, tokenPayload, getFreshToken } = useAuthContext();

  const organizationDefaultValues: Organization = {
    name: '',
    owner: ApiIris.USER + tokenPayload?.user_id ?? 0,
  };

  const organizationMutation = usePost<Organization>({
    url: ApiRoutes.ORGANIZATIONS,
    token: token?.token ?? undefined,
    key: QueryKeys.ORGANIZATIONS,
    onSuccess: () => {
      getFreshToken(token);
    },
  });

  const onSubmit: SubmitHandler<Organization> = (fieldValues: Organization) => {
    organizationMutation.mutate(fieldValues);
  };

  return (
    <StyledCard
      title="Créons votre organisation"
      titleSize="large"
      titlePosition="center"
    >
      <CreateOrganizationForm
        defaultValues={organizationDefaultValues}
        onSubmit={onSubmit}
        submitLoading={organizationMutation.isLoading}
        submitError={organizationMutation.error?.response?.data.message}
      />
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  @media screen and (${({ theme }) => theme.breakpoints.md}) {
    max-width: 600px;
    margin: 0 auto;
  }
`;

export default CreateOrganizationCard;
