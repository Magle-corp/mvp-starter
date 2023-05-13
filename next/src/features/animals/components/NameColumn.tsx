import { TbCat, TbDog } from 'react-icons/tb';
import { Animal } from '@/features/animals/types/Animal';
import WrapperItemTemplate from '@/features/animals/components/WrapperItemTemplate';

const NameColumn = (props: Animal) => {
  return (
    <WrapperItemTemplate>
      {props.race.type.name === 'Chien' && <TbDog />}
      {props.race.type.name === 'Chat' && <TbCat />}
      <p>{props.name}</p>
    </WrapperItemTemplate>
  );
};

export default NameColumn;
