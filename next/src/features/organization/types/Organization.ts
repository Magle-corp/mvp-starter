import { MediaObject } from '@/cdn/types/Api';

type Organization = {
  id: number;
  name: string;
  public: boolean;
  avatar?: OrganizationAvatar;
  address?: string;
  city?: string;
  zipCode?: string;
  phone?: string;
  email?: string;
};

type OrganizationAvatar = {
  organization: Organization;
} & MediaObject;

export default Organization;
