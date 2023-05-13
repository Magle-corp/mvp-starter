import { TbGenderAgender, TbGenderFemale, TbGenderMale } from 'react-icons/tb';
import { AnimalSex } from '@/features/animals/types/Animal';
import WrapperItemTemplate from '@/features/animals/components/WrapperItemTemplate';

const SexDropdownItem = (props: AnimalSex) => {
  return (
    <WrapperItemTemplate>
      {props.name === 'Male' && <TbGenderMale />}
      {props.name === 'Femelle' && <TbGenderFemale />}
      {props.name === 'Inconnu' && <TbGenderAgender />}
      <p>{props.name}</p>
    </WrapperItemTemplate>
  );
};

export default SexDropdownItem;
