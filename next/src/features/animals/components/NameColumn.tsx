import { Animal } from '@/features/animals/types/Animal';
import AnimalAvatar from '@/features/animals/components/AnimalAvatar';
import WrapperItemTemplate from '@/features/animals/components/WrapperItemTemplate';

const NameColumn = (props: Animal) => {
  return (
    <WrapperItemTemplate>
      <AnimalAvatar animal={props} shape="circle" />
      <p>{props.name}</p>
    </WrapperItemTemplate>
  );
};

export default NameColumn;
