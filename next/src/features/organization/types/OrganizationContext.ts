import Organization from '@/features/organization/types/Organization';

type OrganizationContext = {
  organization: Organization | null;
  loading: boolean;
};

export default OrganizationContext;
