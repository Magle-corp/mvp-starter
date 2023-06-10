import { useState } from 'react';
import styled from 'styled-components';
import { useBackOfficeContext } from '@/cdn/BackOfficeContext';
import Medias from '@/cdn/enums/Medias';
import { UseGetResult } from '@/cdn/types/Query';
import { dateToString } from '@/cdn/utils/dateService';
import { useAuthContext } from '@/features/authentication/AuthContext';
import { AnimalDocument } from '@/features/animals/types/Animal';
import { documentConstraints } from '@/features/documents/conf/fileConstraints';
import useAnimalDocumentDeleteMutation from '@/features/documents/queries/useAnimalDocumentDeleteMutation';
import useAnimalDocumentCreateMutation from '@/features/documents/queries/useAnimalDocumentCreateMutation';
import documentService from '@/features/documents/utils/documentService';
import DocumentIcon from '@/features/documents/components/DocumentIcon';
import DocumentActions from '@/features/documents/components/DocumentActions';
import DocumentUploadDialog from '@/features/documents/components/DocumentUploadDialog';
import Button from '@/ui/atoms/Button';
import Card from '@/ui/atoms/Card';

type DocumentsListCard<T> = {
  mediaType: Medias;
  documents: AnimalDocument[];
  documentsQuery: UseGetResult<T>;
  relatedEntityId?: number;
};

const DocumentsListCard = <T,>(props: DocumentsListCard<T>) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const { token } = useAuthContext();
  const { organizationMenuOpen } = useBackOfficeContext();

  const animalDocumentCreateMutation = useAnimalDocumentCreateMutation(
    props.documentsQuery.refetch,
    token?.token
  );
  const animalDocumentDeleteMutation = useAnimalDocumentDeleteMutation(
    props.documentsQuery.refetch,
    token?.token
  );

  const onDocumentCreateSubmit = (formData: FormData) => {
    animalDocumentCreateMutation.mutate(formData);
  };

  const onDocumentDeleteSubmit = (entityId: number) => {
    documentService.documentDeleteConfirmDialog(
      animalDocumentDeleteMutation.mutate,
      entityId
    );
  };

  const Toolbar = (
    <>
      {props.relatedEntityId && (
        <Button
          label="Ajouter"
          onClick={() => setDialogOpen(true)}
          size="small"
        />
      )}
    </>
  );

  return (
    <Card title="Documents" toolbar={Toolbar}>
      {props.relatedEntityId && (
        <DocumentUploadDialog
          relatedEntityId={props.relatedEntityId}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          fileConstraints={documentConstraints}
          onCreate={onDocumentCreateSubmit}
          createQuery={animalDocumentCreateMutation}
        />
      )}
      <List>
        {props.documents.map((document, index) => (
          <DocumentItem key={index}>
            <ItemLeft>
              <DocumentIcon fileExtension={document.fileExtension} />
              <ItemName organizationMenuOpen={organizationMenuOpen}>
                {document.fileName}
              </ItemName>
            </ItemLeft>
            <ItemRight>
              <CreatedDate>
                {dateToString(new Date(document.created))}
              </CreatedDate>
              <DocumentActions
                document={document}
                onDelete={onDocumentDeleteSubmit}
              />
            </ItemRight>
          </DocumentItem>
        ))}
      </List>
    </Card>
  );
};

const List = styled.ul`
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
      organizationMenuOpen ? '150px' : '360px'};
  }

  @media screen and (${({ theme }) => theme.breakpoints.lg}) {
    max-width: ${({ organizationMenuOpen }) =>
      organizationMenuOpen ? '380px' : '550px'};
  }
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

export default DocumentsListCard;
