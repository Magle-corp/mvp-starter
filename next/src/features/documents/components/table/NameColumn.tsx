import styled from 'styled-components';
import { AnimalDocument } from '@/features/animals/types/Animal';
import DocumentIcon from '@/features/documents/components/DocumentIcon';
import WrapperItemTemplate from '@/features/documents/components/WrapperItemTemplate';

const NameColumn = (props: AnimalDocument) => {
  return (
    <WrapperItemTemplate>
      <DocumentIcon fileExtension={props.fileExtension} />
      <Name>{props.fileName}</Name>
    </WrapperItemTemplate>
  );
};

const Name = styled.p`
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (${({ theme }) => theme.breakpoints.sm}) {
    max-width: 100px;
  }

  @media screen and (${({ theme }) => theme.breakpoints.lg}) {
    max-width: 150px;
  }

  @media screen and (${({ theme }) => theme.breakpoints.xl}) {
    max-width: 230px;
  }
`;

export default NameColumn;
