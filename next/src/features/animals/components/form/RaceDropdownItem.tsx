import { TbCat, TbDog } from 'react-icons/tb';
import { AnimalRace } from '@/features/animals/types/Animal';
import WrapperItemTemplate from '@/features/animals/components/WrapperItemTemplate';

const RaceDropdownItem = (props: AnimalRace) => {
  return (
    <WrapperItemTemplate>
      {props.type.name === 'Chien' && <TbDog />}
      {props.type.name === 'Chat' && <TbCat />}
      <p>{props.name}</p>
    </WrapperItemTemplate>
  );
};

export default RaceDropdownItem;
