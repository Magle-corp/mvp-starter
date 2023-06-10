import { ChangeEvent, useState } from 'react';
import { useAppContext } from '@/cdn/AppContext';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import Medias from '@/cdn/enums/Medias';
import { UseGetResult } from '@/cdn/types/Query';
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

  const fileMutation = usePost<FormData>({
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
    onError: () =>
      toast.current.show({
        severity: 'error',
        summary: 'Animal',
        detail: 'Un problème technique est survenu',
      }),
  });

  const onFileSubmit = (
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

      fileMutation.mutate(formData);
    }
  };

  const Toolbar = (
    <Button label="Ajouter" onClick={() => setDialogOpen(true)} size="small" />
  );

  return (
    <Card title="Documents" toolbar={Toolbar}>
      <FileUploadDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        onCreate={onFileSubmit}
        createQuery={fileMutation}
      />
      {props.animalQuery.data?.data.documents && (
        <FileList documents={props.animalQuery.data.data.documents} />
      )}
    </Card>
  );
};

export default AnimalDocumentsCard;
