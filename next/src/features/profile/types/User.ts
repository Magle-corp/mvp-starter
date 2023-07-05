import { MediaObject } from '@/cdn/types/Api';

type User = {
  id: number;
  avatar?: UserAvatar;
};

type UserAvatar = {
  user: User;
} & MediaObject;

export type { User };
