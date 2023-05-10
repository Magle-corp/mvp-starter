import Organization from '@/features/organization/types/Organization';

type OrganizationContext = {
  unguardedPage: boolean;
  organization: Organization | null;
  setOrganization: Function;
  loading: boolean;
  error: boolean;
};

export default OrganizationContext;
