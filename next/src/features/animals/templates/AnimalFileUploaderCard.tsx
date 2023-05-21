import Card from '@/ui/atoms/Card';
import { FileUpload, FileUploadBeforeSendEvent } from 'primereact/fileupload';
import api from '@/cdn/utils/api';
import ApiRoutes from '@/cdn/enums/ApiRoutes';
import usePost from '@/cdn/hooks/usePost';
import { useAuthContext } from '@/features/authentication/AuthContext';
import FormData from 'form-data';

const AnimalFileUploaderCard = () => {
  const { token } = useAuthContext();

  const log = (string: string, event: any) => {
    console.group(string);
    console.log(event);
    console.groupEnd();
  };

  const animalFileMutation = usePost({
    url: ApiRoutes.MEDIA_OBJECTS,
    token: token?.token,
    key: 'osef',
    mediaObject: true,
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });

  const handleSubmit = (event: FileUploadBeforeSendEvent) => {
    // console.log(event.formData);

    // const formData = new FormData();
    // formData.append('file', event.formData);

    animalFileMutation.mutate(event.formData);
  };

  return (
    <Card title="Ajouter un document">
      <FileUpload
        name="file"
        // uploadHandler={(event) => log('upload handler', event)} // Never triggered
        // onBeforeDrop={(event) => log('before drop', event)} // Trigger beforeSelect + onSelect
        // onBeforeSelect={(event) => log('before select', event)}
        // onSelect={(event) => log('select', event)}
        // onBeforeUpload={(event) => log('before upload', event)}
        // onBeforeSend={(event) => log('before send', event)}
        // onProgress={(event) => log('progress', event)}
        // onUpload={(event) => log('upload', event)}
        onBeforeUpload={handleSubmit}
      />
    </Card>
  );
};

export default AnimalFileUploaderCard;
