import { useRouter } from 'next/router';
import { FileUpload, FileUploadBeforeSendEvent } from 'primereact/fileupload';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import usePost from '@/cdn/hooks/usePost';
import { useAuthContext } from '@/features/authentication/AuthContext';
import Card from '@/ui/atoms/Card';

const AnimalFileUploaderCard = () => {
  const router = useRouter();
  const { id: animalQueryId } = router.query;
  const { token } = useAuthContext();

  const animalFileMutation = usePost({
    url: ApiRoutes.ANIMAL_AVATARS,
    token: token?.token,
    key: 'osef',
    mediaObject: true,
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });

  const handleSubmit = (event: FileUploadBeforeSendEvent) => {
    const animalData = JSON.stringify({
      id: animalQueryId,
      type: 'animal',
    });

    event.formData.append('entity', animalData);

    animalFileMutation.mutate(event.formData);
  };

  return (
    <Card title="Ajouter un document">
      <FileUpload mode="basic" name="file" onBeforeUpload={handleSubmit} />
    </Card>
  );
};

export default AnimalFileUploaderCard;
