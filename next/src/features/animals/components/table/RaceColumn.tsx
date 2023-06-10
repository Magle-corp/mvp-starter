import styled from 'styled-components';
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
      <Name>{props.race.name}</Name>
    </WrapperItemTemplate>
  );
};

const Name = styled.p`
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (${({ theme }) => theme.breakpoints.sm}) {
    max-width: 130px;
  }

  @media screen and (${({ theme }) => theme.breakpoints.lg}) {
    max-width: 150px;
  }

  @media screen and (${({ theme }) => theme.breakpoints.xl}) {
    max-width: 230px;
  }
`;

export default RaceColumn;
