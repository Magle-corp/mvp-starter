import User from '@/features/profile/types/User';

type Organization = {
  id: number;
  name: string;
  owner: User;
};

export default Organization;
