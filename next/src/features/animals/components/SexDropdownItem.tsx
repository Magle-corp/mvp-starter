import { TbGenderAgender, TbGenderFemale, TbGenderMale } from 'react-icons/tb';
import { AnimalSex } from '@/features/animals/types/Animal';
import WrapperItemTemplate from '@/features/animals/components/WrapperItemTemplate';
import { AnimalDefaultSexes } from '@/cdn/enums/AppDefaultValues';

const SexDropdownItem = (props: AnimalSex) => {
  const AnimalTypeIcon = () => {
    switch (props.name) {
      case AnimalDefaultSexes.FEMALE:
        return <TbGenderFemale />;
      case AnimalDefaultSexes.MALE:
        return <TbGenderMale />;
      case AnimalDefaultSexes.UNKNOWN:
        return <TbGenderAgender />;
      default:
        return null;
    }
  };
  return (
    <WrapperItemTemplate>
      <AnimalTypeIcon />
      <p>{props.name}</p>
    </WrapperItemTemplate>
  );
};

export default SexDropdownItem;
