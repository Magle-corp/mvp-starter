import Organization from '@/features/organization/types/Organization';

type OrganizationContext = {
  unguardedPage: boolean;
  organization: Organization | null;
  loading: boolean;
  error: boolean;
};

export default OrganizationContext;
