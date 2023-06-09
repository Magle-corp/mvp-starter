import { ChangeEvent, useRef, useState } from 'react';
import styled from 'styled-components';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { MdOutlineCancel, MdUploadFile, MdCheck } from 'react-icons/md';
import { UseMutationResult } from '@/cdn/types/Query';
import Button from '@/ui/atoms/Button';
import FormError from '@/ui/atoms/form/FormError';
import FloatLabel from '@/ui/atoms/form/FloatLabel';
import InputHelp from '@/ui/atoms/form/InputHelp';

type FileUploadDialog = {
  dialogOpen: boolean;
  setDialogOpen: Function;
  onCreate: (event: ChangeEvent<HTMLInputElement>, fileName: string) => void;
  createQuery: UseMutationResult<FormData>;
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
    handleFileCancel();
    fileInput.current?.click();
  };

  const handleFileCancel = () => {
    setErrorMessage(undefined);
    setInputEvent(undefined);
    setFileName('');
    if (fileInput.current) {
      fileInput.current.value = '';
    }
    props.createQuery.reset();
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

      setFileName(file.name);
      setInputEvent(event);
    }
  };

  const handleFileSubmission = () => {
    if (inputEvent) {
      props.onCreate(inputEvent, fileName);
    } else {
      setErrorMessage('Veuillez sélectionner un fichier');
    }
  };

  const UploadIconButton = () => (
    <>
      {!inputEvent?.target.files && !props.createQuery.isSuccess && (
        <IconButton variant="idle" size="small" onClick={handleOpenFileBrowser}>
          <FileIcon />
        </IconButton>
      )}
      {inputEvent?.target.files && !props.createQuery.isSuccess && (
        <IconButton
          variant="danger"
          size="small"
          onClick={handleFileCancel}
          disabled={props.createQuery.isLoading}
        >
          <CancelIcon />
        </IconButton>
      )}
      {props.createQuery.isSuccess && (
        <IconButton
          variant="success"
          size="small"
          disabled={props.createQuery.isSuccess}
        >
          <CheckIcon />
        </IconButton>
      )}
    </>
  );

  const UploadButton = () => (
    <>
      {!inputEvent?.target.files && !props.createQuery.isSuccess && (
        <StyledButton
          label="Télécharger un document"
          size="small"
          onClick={handleOpenFileBrowser}
        />
      )}
      {inputEvent?.target.files && !props.createQuery.isSuccess && (
        <StyledButton
          label="Sauvegarder le document"
          size="small"
          onClick={handleFileSubmission}
          loading={props.createQuery.isLoading}
        />
      )}
      {props.createQuery.isSuccess && (
        <StyledButton
          label="Télécharger un nouveau document"
          size="small"
          onClick={handleOpenFileBrowser}
        />
      )}
    </>
  );

  return (
    <DocumentDialog
      visible={props.dialogOpen}
      onHide={handleDialogClose}
      header={<p>Ajouter un document</p>}
      blockScroll
      draggable={false}
    >
      <DialogContent>
        {props.createQuery.error && props.createQuery.error.response && (
          <SubmissionError>
            {props.createQuery.error.response.data.message}
          </SubmissionError>
        )}
        <DocumentFieldWrapper>
          <DocumentInputWrapper>
            <UploadIconButton />
            <StyledFloatLabel htmlFor="file_name" label="Nom du document">
              <InputText
                name="file_name"
                value={fileName}
                disabled={
                  !inputEvent?.target.files ||
                  props.createQuery.isLoading ||
                  props.createQuery.isSuccess
                }
                onChange={(event) => setFileName(event.target.value)}
              />
            </StyledFloatLabel>
          </DocumentInputWrapper>
          <UploadButton />
          <FileInput
            ref={fileInput}
            type="file"
            name="file"
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
  align-items: center;
  gap: 30px;
  padding-top: 10px;
`;

const SubmissionError = styled(FormError)`
  text-align: center;
  max-width: 282px;

  @media screen and (${({ theme }) => theme.breakpoints.sm}) {
    text-align: unset;
    max-width: unset;
  }
`;

const DocumentFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding-top: 30px;
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

const IconButton = styled(Button)`
  padding: 0.47rem !important;
`;

const FileIcon = styled(MdUploadFile)`
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

const CheckIcon = styled(MdCheck)`
  width: 25px !important;
  height: 25px !important;
  color: white !important;
`;

const StyledButton = styled(Button)`
  width: 100%;
  max-width: 282px;

  @media screen and (${({ theme }) => theme.breakpoints.sm}) {
    width: max-content;
    max-width: max-content;
  }
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
