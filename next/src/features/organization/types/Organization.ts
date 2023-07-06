import { MediaObject } from '@/cdn/types/Api';

type Organization = {
  id: number;
  name: string;
  public: boolean;
  avatar?: OrganizationAvatar;
};

type OrganizationAvatar = {
  organization: Organization;
} & MediaObject;

export default Organization;
