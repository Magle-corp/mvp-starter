import { TbGenderAgender, TbGenderFemale, TbGenderMale } from 'react-icons/tb';
import { AnimalDefaultSexes } from '@/cdn/enums/AppDefaultValues';
import { Animal } from '@/features/animals/types/Animal';
import WrapperItemTemplate from '@/features/animals/components/WrapperItemTemplate';

const RaceColumn = (props: Animal) => {
  const AnimalTypeIcon = () => {
    switch (props.sex.name) {
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
      <p>{props.race.name}</p>
    </WrapperItemTemplate>
  );
};

export default RaceColumn;
