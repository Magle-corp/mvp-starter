import { ReactNode } from 'react';
import { AuthContextWrapper } from '@/features/authentication/AuthContext';
import AuthGuard from '@/features/authentication/AuthGuard';
import { OrganizationContextWrapper } from '@/features/organization/OrganizationContext';
import OrganizationGuard from '@/features/organization/OrganizationGuard';

type AdminLayout = {
  children: ReactNode;
};

const AdminLayout = (props: AdminLayout) => {
  return (
    <AuthContextWrapper>
      <AuthGuard>
        <OrganizationContextWrapper>
          <OrganizationGuard>{props.children}</OrganizationGuard>
        </OrganizationContextWrapper>
      </AuthGuard>
    </AuthContextWrapper>
  );
};

export default AdminLayout;
