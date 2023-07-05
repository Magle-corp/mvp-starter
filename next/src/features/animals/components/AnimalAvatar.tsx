import { Avatar, AvatarProps } from 'primereact/avatar';
import { TbCat, TbDog } from 'react-icons/tb';
import { AnimalDefaultTypes } from '@/cdn/enums/AppDefaultValues';
import { Animal } from '@/features/animals/types/Animal';

type AnimalAvatar = {
  animal: Animal;
} & AvatarProps;

const AnimalAvatar = (props: AnimalAvatar) => {
  const defaultAvatar = () => {
    switch (props.animal.race.type.name) {
      case AnimalDefaultTypes.DOG:
        return <TbDog />;
      case AnimalDefaultTypes.CAT:
        return <TbCat />;
    }
  };

  const avatarImage =
    props.animal.avatar && props.animal.avatar.contentUrl
      ? 'http://localhost:8080' + props.animal.avatar.contentUrl
      : undefined;

  return (
    <Avatar
      image={avatarImage ? avatarImage : undefined}
      template={avatarImage ? undefined : defaultAvatar}
      {...props}
    />
  );
};

export default AnimalAvatar;
