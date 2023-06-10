import { ChangeEvent, useRef, useState } from 'react';
import styled from 'styled-components';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { MdOutlineClose, MdUploadFile, MdCheck } from 'react-icons/md';
import { UseMutationResult } from '@/cdn/types/Query';
import {
  documentConstraints,
  FileConstraints,
} from '@/features/documents/conf/fileConstraints';
import documentService from '@/features/documents/utils/documentService';
import Button from '@/ui/atoms/Button';
import FormError from '@/ui/atoms/form/FormError';
import FloatLabel from '@/ui/atoms/form/FloatLabel';
import InputHelp from '@/ui/atoms/form/InputHelp';

type DocumentUploadDialog = {
  relatedEntityId: number;
  dialogOpen: boolean;
  setDialogOpen: Function;
  fileConstraints: FileConstraints;
  onCreate: (formData: FormData) => void;
  createQuery: UseMutationResult<FormData>;
};

const DocumentUploadDialog = (props: DocumentUploadDialog) => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [file, setFile] = useState<File>();
  const [fileName, setFileName] = useState<string>('');
  const fileInput = useRef<HTMLInputElement>(null);

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
    setFile(undefined);
    setFileName('');
    if (fileInput.current) {
      fileInput.current.value = '';
    }
    props.createQuery.reset();
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = documentService.getFileFromEvent(event);

    if (file) {
      const fileValidation = documentService.fileConstraintsValidator(
        props.fileConstraints,
        file
      );

      if (!fileValidation.error) {
        setErrorMessage(undefined);
        setFileName(file.name);
        setFile(file);
      } else {
        setErrorMessage(fileValidation.errorMessage);
      }
    } else {
      setErrorMessage('Veuillez séléctionner un fichier');
    }
  };

  const handleFileSubmission = () => {
    if (file) {
      const formData = documentService.documentCreateFormData(
        file,
        fileName,
        props.relatedEntityId
      );
      props.onCreate(formData);
    }
  };

  const UploadIconButton = () => (
    <>
      {!file && !props.createQuery.isSuccess && (
        <IconButton variant="idle" size="small" onClick={handleOpenFileBrowser}>
          <FileIcon />
        </IconButton>
      )}
      {file && !props.createQuery.isSuccess && (
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
      {!file && !props.createQuery.isSuccess && (
        <StyledButton
          label="Télécharger un document"
          size="small"
          onClick={handleOpenFileBrowser}
        />
      )}
      {file && !props.createQuery.isSuccess && (
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
                  !file ||
                  props.createQuery.isLoading ||
                  props.createQuery.isSuccess
                }
                onChange={(event) => setFileName(event.target.value)}
                maxLength={70}
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
            accept={documentConstraints.fileExtensions}
            maxLength={documentConstraints.fileMaxLength}
            minLength={documentConstraints.fileMinLength}
          />
        </DocumentFieldWrapper>
        {errorMessage && <StyledFormError>{errorMessage}</StyledFormError>}
        <HelpWrapper>
          <InputHelp>Nom du document : maximum 70 caractères</InputHelp>
          <InputHelp>
            Formats acceptés : {documentConstraints.fileExtensions}
          </InputHelp>
          <InputHelp>
            Taille du document : min {documentConstraints.fileMinLength / 1000}
            ko, max {documentConstraints.fileMaxLength / 1000}ko
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

const CancelIcon = styled(MdOutlineClose)`
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

const StyledFormError = styled(FormError)`
  @media screen and (${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
  }
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

export default DocumentUploadDialog;
