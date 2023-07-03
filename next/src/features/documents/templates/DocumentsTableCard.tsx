import { useState } from 'react';
import styled from 'styled-components';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTableFilterMeta } from 'primereact/datatable';
import { useBackOfficeContext } from '@/ui/layouts/BackOfficeContext';
import Medias from '@/cdn/enums/Medias';
import useBreakpoints from '@/cdn/hooks/useBreakpoints';
import { UseGetResult } from '@/cdn/types/Query';
import { useAuthContext } from '@/features/authentication/AuthContext';
import { AnimalDocument } from '@/features/animals/types/Animal';
import { documentConstraints } from '@/features/documents/conf/fileConstraints';
import useAnimalDocumentDeleteMutation from '@/features/documents/queries/useAnimalDocumentDeleteMutation';
import useAnimalDocumentCreateMutation from '@/features/documents/queries/useAnimalDocumentCreateMutation';
import documentService from '@/features/documents/utils/documentService';
import ActionColumn from '@/features/documents/components/table/ActionColumn';
import AnimalColumn from '@/features/documents/components/table/AnimalColumn';
import DocumentUploadDialog from '@/features/documents/components/DocumentUploadDialog';
import CreatedColumn from '@/features/documents/components/table/CreatedColumn';
import NameColumn from '@/features/documents/components/table/NameColumn';
import Card from '@/ui/atoms/Card';
import Button from '@/ui/atoms/Button';
import Table from '@/ui/atoms/Table';

const tableInitialFilters: DataTableFilterMeta = {
  fileName: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

type DocumentsTableCard<T> = {
  mediaType: Medias;
  documents: AnimalDocument[];
  documentsQuery: UseGetResult<T>;
  relatedEntityId?: number;
};

const DocumentsTableCard = <T,>(props: DocumentsTableCard<T>) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [tableFilters, setTableFilters] =
    useState<DataTableFilterMeta>(tableInitialFilters);

  const { breakpointSM, breakpointMD, breakpointLG } = useBreakpoints();
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

  const getTableFilterDisplayMode = (): 'menu' | 'row' => {
    if (breakpointMD && !breakpointLG && !organizationMenuOpen) {
      return 'row';
    } else if (breakpointMD && !breakpointLG && organizationMenuOpen) {
      return 'menu';
    } else if (breakpointLG) {
      return 'row';
    } else {
      return 'menu';
    }
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

  const cardDescription = (
    <p>administrez les documents de votre organisation</p>
  );

  return (
    <Card title="Mes documents" description={cardDescription} toolbar={Toolbar}>
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
      <StyledTable
        value={props.documents}
        filters={tableFilters}
        filterDisplay={getTableFilterDisplayMode()}
        onFilter={(event) => setTableFilters(event.filters)}
        stateKey="animal_documents_table"
        loading={props.documentsQuery.isLoading}
      >
        <Column
          field="fileName"
          header="Nom"
          sortable
          filter={breakpointSM}
          filterPlaceholder="Rechercher"
          body={NameColumn}
        />
        {breakpointSM && (
          <Column
            field="animal.name"
            header="Animal"
            sortable
            body={AnimalColumn}
          />
        )}
        {(breakpointLG ||
          (breakpointMD && !breakpointLG && !organizationMenuOpen)) && (
          <Column
            field="created"
            header="Enregistré"
            sortable
            body={CreatedColumn}
          />
        )}
        <Column
          className="custom-row-actions"
          body={(data) => (
            <ActionColumn document={data} onDelete={onDocumentDeleteSubmit} />
          )}
        />
      </StyledTable>
    </Card>
  );
};

const StyledTable = styled(Table)`
  .p-datatable-tbody {
    > tr {
      td:nth-child(1) {
        width: 300px;
      }

      td:nth-child(2) {
        width: 300px;
      }

      td:nth-child(3) {
        width: 150px;
      }

      td:last-child {
        width: unset;
      }
    }
  }
`;

export default DocumentsTableCard;
