import styled from 'styled-components';
import {
  MdOutlineImage,
  MdOutlineInsertDriveFile,
  MdMoreVert,
} from 'react-icons/md';
import { useBackOfficeContext } from '@/cdn/BackOfficeContext';
import useBreakpoints from '@/cdn/hooks/useBreakpoints';
import { dateToString } from '@/cdn/utils/dateService';
import { Animal } from '@/features/animals/types/Animal';
import Button from '@/ui/atoms/Button';
import LinkButton from '@/ui/atoms/LinkButton';

type FileList = {
  documents: Animal['documents'];
  onDelete: (entityId: number) => void;
};

const FileList = (props: FileList) => {
  const { breakpointSM } = useBreakpoints();
  const { organizationMenuOpen } = useBackOfficeContext();

  const DocumentIcon = (fileExtension: string) => {
    if (fileExtension === 'pdf') {
      return <PdfIcon />;
    } else {
      return <ImageIcon />;
    }
  };

  return (
    <DocumentList>
      {props.documents.map((document, index) => (
        <DocumentItem key={index}>
          <ItemLeft>
            {DocumentIcon(document.fileExtension)}
            <ItemName organizationMenuOpen={organizationMenuOpen}>
              {document.fileName}
            </ItemName>
          </ItemLeft>
          <ItemRight>
            <CreatedDate>
              {dateToString(new Date(document.created))}
            </CreatedDate>
            {breakpointSM && (
              <ActionWrapper>
                <LinkButton
                  href={'http://localhost:8080' + document.contentUrl}
                  icon="pi pi-search"
                  target="_blank"
                />
                <Button
                  icon="pi pi-trash"
                  variant="danger"
                  onClick={() => props.onDelete(document.id)}
                  size="small"
                />
              </ActionWrapper>
            )}
            {!breakpointSM && (
              <Button size="small">
                <MoreIcon />
              </Button>
            )}
          </ItemRight>
        </DocumentItem>
      ))}
    </DocumentList>
  );
};

const DocumentList = styled.ul`
  list-style-type: none;
`;

const DocumentItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 10px;
  border-radius: 3px;
  transition: 250ms;

  &:hover {
    padding: 20px 10px 20px 20px;
    background-color: ${({ theme }) => theme.colors.gray_light_ultra};
  }
`;

const ItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ItemName = styled.p<{ organizationMenuOpen: boolean }>`
  max-width: 170px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (${({ theme }) => theme.breakpoints.sm}) {
    max-width: 200px;
  }

  @media screen and (${({ theme }) => theme.breakpoints.md}) {
    max-width: ${({ organizationMenuOpen }) =>
      organizationMenuOpen ? '190px' : '360px'};
  }

  @media screen and (${({ theme }) => theme.breakpoints.lg}) {
    max-width: ${({ organizationMenuOpen }) =>
      organizationMenuOpen ? '380px' : '550px'};
  }
`;

const ImageIcon = styled(MdOutlineImage)`
  width: 25px !important;
  height: 25px !important;
`;

const PdfIcon = styled(MdOutlineInsertDriveFile)`
  width: 25px !important;
  height: 25px !important;
`;

const ItemRight = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  @media screen and (${({ theme }) => theme.breakpoints.sm}) {
    gap: 30px;
  }

  @media screen and (${({ theme }) => theme.breakpoints.md}) {
    gap: 50px;
  }
`;

const CreatedDate = styled.p`
  display: none;

  @media screen and (${({ theme }) => theme.breakpoints.sm}) {
    display: flex;
  }
`;

const ActionWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const MoreIcon = styled(MdMoreVert)`
  width: 16px !important;
  height: 16px !important;
  color: white !important;
  cursor: pointer;
`;

export default FileList;
