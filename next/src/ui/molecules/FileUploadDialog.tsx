import { ChangeEvent, useRef, useState } from 'react';
import styled from 'styled-components';
import { Avatar } from 'primereact/avatar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { MdOutlineCancel, MdUploadFile } from 'react-icons/md';
import Button from '@/ui/atoms/Button';
import FormError from '@/ui/atoms/form/FormError';
import FloatLabel from '@/ui/atoms/form/FloatLabel';
import InputHelp from '@/ui/atoms/form/InputHelp';

type FileUploadDialog = {
  dialogOpen: boolean;
  setDialogOpen: Function;
  onCreate: (event: ChangeEvent<HTMLInputElement>, fileName: string) => void;
};

const FileUploadDialog = (props: FileUploadDialog) => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [inputEvent, setInputEvent] = useState<ChangeEvent<HTMLInputElement>>();
  const [fileName, setFileName] = useState<string>('');
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

  const handleDialogClose = () => {
    handleFileCancel();
    props.setDialogOpen(false);
  };

  const handleOpenFileBrowser = () => {
    fileInput.current?.click();
  };

  const handleFileCancel = () => {
    setErrorMessage(undefined);
    setInputEvent(undefined);
    setFileName('');
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

      console.log('set inputEvent and fileName');
      setFileName(file.name);
      setInputEvent(event);
    }
  };

  const handleFileSubmission = () => {
    if (inputEvent?.target.files) {
      props.onCreate(inputEvent, fileName);
    }
  };

  return (
    <DocumentDialog
      visible={props.dialogOpen}
      onHide={handleDialogClose}
      header={<p>Ajouter un document</p>}
      blockScroll
      draggable={false}
    >
      <DialogContent>
        <DocumentFieldWrapper>
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
                value={fileName}
                disabled={!inputEvent?.target.files}
                onChange={(event) => setFileName(event.target.value)}
              />
            </StyledFloatLabel>
          </DocumentInputWrapper>
          {!inputEvent?.target.files && (
            <StyledButton
              label="Télécharger un document"
              size="small"
              onClick={handleOpenFileBrowser}
            />
          )}
          {inputEvent?.target.files && (
            <StyledButton
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
        </DocumentFieldWrapper>
        {errorMessage && <FormError>{errorMessage}</FormError>}
        <HelpWrapper>
          <InputHelp>Formats de fichier acceptés : {fileExtensions}</InputHelp>
          <InputHelp>
            Taille du fichier : min {fileMinLength / 1000}ko, max{' '}
            {fileMaxLength / 1000}ko
          </InputHelp>
        </HelpWrapper>
      </DialogContent>
    </DocumentDialog>
  );
};

const DocumentDialog = styled(Dialog)`
  min-width: 100%;
  padding: 0 20px;
  box-shadow: none;

  @media screen and (${({ theme }) => theme.breakpoints.sm}) {
    min-width: unset;
    padding: unset;
  }
`;

const DialogContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  gap: 30px;
`;

const DocumentFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin: 0 auto;

  @media screen and (${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: row;
    width: max-content;
  }
`;

const DocumentInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  max-width: 282px;

  @media screen and (${({ theme }) => theme.breakpoints.sm}) {
    width: max-content;
    max-width: max-content;
  }
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

const CancelIcon = styled(MdOutlineCancel)`
  width: 25px !important;
  height: 25px !important;
  color: white !important;
  cursor: pointer;
`;

const StyledFloatLabel = styled(FloatLabel)`
  width: max-content;
`;

const HelpWrapper = styled.div`
  width: 100%;
  text-align: center;

  @media screen and (${({ theme }) => theme.breakpoints.sm}) {
    min-width: unset;
    text-align: unset;
    padding: unset;
  }
`;

const FileInput = styled.input`
  display: none;
`;

export default FileUploadDialog;
