import { TbGenderAgender, TbGenderFemale, TbGenderMale } from 'react-icons/tb';
import { Animal } from '@/features/animals/types/Animal';
import WrapperItemTemplate from '@/features/animals/components/WrapperItemTemplate';

const RaceColumn = (props: Animal) => {
  return (
    <WrapperItemTemplate>
      {props.sex.name === 'Male' && <TbGenderMale />}
      {props.sex.name === 'Femelle' && <TbGenderFemale />}
      {props.sex.name === 'Inconnu' && <TbGenderAgender />}
      <p>{props.race.name}</p>
    </WrapperItemTemplate>
  );
};

export default RaceColumn;
