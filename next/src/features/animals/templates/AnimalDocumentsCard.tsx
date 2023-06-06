import { ChangeEvent, useRef, useState } from 'react';
import styled from 'styled-components';
import { Dialog } from 'primereact/dialog';
import { Avatar } from 'primereact/avatar';
import { InputText } from 'primereact/inputtext';
import { MdUploadFile, MdOutlineCancel } from 'react-icons/md';
import { UseGetResult } from '@/cdn/types/Query';
import { Animal } from '@/features/animals/types/Animal';
import Button from '@/ui/atoms/Button';
import Card from '@/ui/atoms/Card';
import FloatLabel from '@/ui/atoms/form/FloatLabel';
import FormError from '@/ui/atoms/form/FormError';
import InputHelp from '@/ui/atoms/form/InputHelp';

type AnimalDocumentsCard = {
  animalQuery: UseGetResult<Animal>;
};

const AnimalDocumentsCard = (props: AnimalDocumentsCard) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [inputEvent, setInputEvent] = useState<ChangeEvent<HTMLInputElement>>();
  const fileInput = useRef<HTMLInputElement>(null);
  const fileMaxLength = 500000;
  const fileMinLength = 10000;
  const fileTypes = [
    'image/jpeg',
    'image/png',
    'image/jpeg',
    'application/pdf',
  ];
  const fileExtensions = '.jpg, .png, .jpeg, .pdf';

  const handleOpenFileBrowser = () => {
    fileInput.current?.click();
  };

  const handleFileCancel = () => {
    setErrorMessage(undefined);
    setInputEvent(undefined);
    if (fileInput.current) {
      fileInput.current.value = '';
    }
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setInputEvent(undefined);

      if (file.size > fileMaxLength) {
        setErrorMessage('Le fichier est trop lourd');
        return;
      }

      if (file.size < fileMinLength) {
        setErrorMessage('Le fichier est trop léger');
        return;
      }

      if (!fileTypes.includes(file.type)) {
        setErrorMessage('Type de fichier incorrect');
        return;
      }

      if (errorMessage) {
        setErrorMessage(undefined);
      }

      console.log('set inputEvent');
      setInputEvent(event);
    }
  };

  const handleFileSubmission = () => {
    if (inputEvent?.target.files) {
      console.log(inputEvent.target.files[0]);
    }
  };

  const Toolbar = (
    <Button label="Ajouter" onClick={() => setDialogOpen(true)} size="small" />
  );

  return (
    <Card title="Documents" toolbar={Toolbar}>
      <Dialog
        visible={dialogOpen}
        onHide={() => setDialogOpen(false)}
        blockScroll
      >
        <DialogContent>
          <DocumentInputWrapper>
            {!inputEvent?.target.files && (
              <AvatarIdle
                template={<FileIconIdle onClick={handleOpenFileBrowser} />}
              />
            )}
            {inputEvent?.target.files && (
              <AvatarSuccess
                template={<CancelIcon onClick={handleFileCancel} />}
              />
            )}
            <StyledFloatLabel htmlFor="file_name" label="Nom du document">
              <InputText
                name="file_name"
                value={
                  inputEvent?.target.files
                    ? inputEvent?.target.files[0].name
                    : 'Sélectionner un document'
                }
                disabled={!inputEvent?.target.files}
              />
            </StyledFloatLabel>
            {!inputEvent?.target.files && (
              <Button
                label="Télécharger un document"
                size="small"
                onClick={handleOpenFileBrowser}
              />
            )}
            {inputEvent?.target.files && (
              <Button
                label="Sauvegarder le document"
                size="small"
                onClick={handleFileSubmission}
              />
            )}
            <FileInput
              ref={fileInput}
              type="file"
              name="animal_file"
              onChange={(event) => {
                handleFileSelect(event);
              }}
              accept={fileExtensions}
              maxLength={fileMaxLength}
              minLength={fileMinLength}
            />
          </DocumentInputWrapper>
          {errorMessage && <FormError>{errorMessage}</FormError>}
          <div>
            <InputHelp>
              Formats de fichier acceptés : {fileExtensions}
            </InputHelp>
            <InputHelp>
              Taille du fichier : min {fileMinLength / 1000}ko, max{' '}
              {fileMaxLength / 1000}ko
            </InputHelp>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

const DialogContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  gap: 30px;
`;

const DocumentInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AvatarIdle = styled(Avatar)`
  width: 39px !important;
  height: 39px !important;
`;

const AvatarSuccess = styled(AvatarIdle)`
  background-color: ${({ theme }) => theme.colors.error};
`;

const FileIconIdle = styled(MdUploadFile)`
  width: 25px !important;
  height: 25px !important;
  cursor: pointer;
`;

const FileIconSuccess = styled(FileIconIdle)`
  color: white !important;
`;

const CancelIcon = styled(MdOutlineCancel)`
  width: 25px !important;
  height: 25px !important;
  color: white !important;
`;

const StyledFloatLabel = styled(FloatLabel)`
  width: max-content;
`;

const FileInput = styled.input`
  display: none;
`;

export default AnimalDocumentsCard;
