import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { confirmDialog } from 'primereact/confirmdialog';
import { useAppContext } from '@/cdn/AppContext';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import Medias from '@/cdn/enums/Medias';
import { UseGetResult } from '@/cdn/types/Query';
import useDelete from '@/cdn/hooks/useDelete';
import usePost from '@/cdn/hooks/usePost';
import { useAuthContext } from '@/features/authentication/AuthContext';
import { Animal } from '@/features/animals/types/Animal';
import FileList from '@/ui/molecules/FileList';
import FileUploadDialog from '@/ui/molecules/FileUploadDialog';
import Button from '@/ui/atoms/Button';
import Card from '@/ui/atoms/Card';

type AnimalDocumentsCard = {
  animalQuery: UseGetResult<Animal>;
};

const AnimalDocumentsCard = (props: AnimalDocumentsCard) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const { token } = useAuthContext();
  const { toast } = useAppContext();

  const fileCreateMutation = usePost<FormData>({
    url: ApiRoutes.ANIMAL_DOCUMENTS,
    token: token?.token,
    mediaObject: true,
    onSuccess: () => {
      props.animalQuery.refetch();
      toast.current.show({
        severity: 'success',
        summary: 'Animal',
        detail: 'Document enregistré avec succès',
      });
    },
    onError: () => errorToast,
  });

  const onFileCreateSubmit = (
    event: ChangeEvent<HTMLInputElement>,
    fileName: string
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileInformation = JSON.stringify({
        related_entity_id: props.animalQuery?.data?.data.id,
        file_entity_type: Medias.ANIMAL_DOCUMENT,
        file_name: fileName,
      });

      const formData = new FormData();
      formData.append('file', file);
      formData.append('file_information', fileInformation);

      fileCreateMutation.mutate(formData);
    }
  };

  const fileDeleteMutation = useDelete({
    url: ApiRoutes.ANIMAL_DOCUMENTS,
    token: token?.token,
    onSuccess: () => {
      props.animalQuery.refetch();
      toast.current.show({
        severity: 'success',
        summary: 'Animal',
        detail: 'Document supprimé avec succès',
      });
    },
    onError: () => errorToast(),
  });

  const onFileDeleteSubmit = (entityId: number) => {
    confirmDialog({
      message:
        'Cette action est irréversible, êtes-vous sûr de vouloir continuer ?',
      header: 'Supprimer un document',
      icon: 'pi pi-exclamation-triangle',
      accept: () => fileDeleteMutation.mutate(entityId),
    });
  };

  const errorToast = () =>
    toast.current.show({
      severity: 'error',
      summary: 'Animal',
      detail: 'Un problème technique est survenu',
    });

  const Toolbar = (
    <Button label="Ajouter" onClick={() => setDialogOpen(true)} size="small" />
  );

  return (
    <Card title="Documents" toolbar={Toolbar}>
      <FileUploadDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        onCreate={onFileCreateSubmit}
        createQuery={fileCreateMutation}
      />
      {props.animalQuery.data &&
        props.animalQuery.data?.data.documents.length !== 0 && (
          <FileList
            documents={props.animalQuery.data.data.documents}
            onDelete={onFileDeleteSubmit}
          />
        )}
      {props.animalQuery.data?.data.documents.length === 0 && (
        <Info>Aucun document</Info>
      )}
    </Card>
  );
};

const Info = styled.p`
  font-weight: bold;
  text-align: center;
`;

export default AnimalDocumentsCard;
