import styled from 'styled-components';
import { Animal } from '@/features/animals/types/Animal';
import AnimalAvatar from '@/features/animals/components/AnimalAvatar';
import WrapperItemTemplate from '@/features/animals/components/WrapperItemTemplate';

const NameColumn = (props: Animal) => {
  return (
    <WrapperItemTemplate>
      <AnimalAvatar animal={props} shape="circle" />
      <Name>{props.name}</Name>
    </WrapperItemTemplate>
  );
};

const Name = styled.p`
  max-width: 135px;
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

export default NameColumn;
