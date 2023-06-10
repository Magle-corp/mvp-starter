import styled from 'styled-components';
import { TbCat, TbDog } from 'react-icons/tb';
import { AnimalDocument } from '@/features/animals/types/Animal';
import WrapperItemTemplate from '@/features/documents/components/WrapperItemTemplate';

const AnimalColumn = (props: AnimalDocument) => {
  return (
    <WrapperItemTemplate>
      {props.animal.race.type.name === 'Chien' && <TbDog />}
      {props.animal.race.type.name === 'Chat' && <TbCat />}
      <Name>{props.animal.name}</Name>
    </WrapperItemTemplate>
  );
};

const Name = styled.p`
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (${({ theme }) => theme.breakpoints.sm}) {
    max-width: 90px;
  }

  @media screen and (${({ theme }) => theme.breakpoints.lg}) {
    max-width: 130px;
  }

  @media screen and (${({ theme }) => theme.breakpoints.xl}) {
    max-width: 230px;
  }
`;

export default AnimalColumn;
