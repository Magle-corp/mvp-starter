import Card from '@/ui/atoms/Card';
import { FileUpload, FileUploadBeforeSendEvent } from 'primereact/fileupload';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import usePost from '@/cdn/hooks/usePost';
import { useAuthContext } from '@/features/authentication/AuthContext';
import { useRouter } from 'next/router';

const AnimalFileUploaderCard = () => {
  const router = useRouter();
  const { id: animalQueryId } = router.query;
  const { token } = useAuthContext();

  const animalFileMutation = usePost({
    url: ApiRoutes.ANIMAL_PICTURES,
    token: token?.token,
    key: 'osef',
    mediaObject: true,
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });

  const handleSubmit = (event: FileUploadBeforeSendEvent) => {
    const animalJsonData = JSON.stringify({ id: animalQueryId });
    const blob = new Blob([animalJsonData], {
      type: 'application/json',
    });
    event.formData.append('animal', blob);

    animalFileMutation.mutate(event.formData);
  };

  return (
    <Card title="Ajouter un document">
      <FileUpload name="file" onBeforeUpload={handleSubmit} />
    </Card>
  );
};

export default AnimalFileUploaderCard;
