import { ChangeEvent, ReactNode, useRef, useState } from 'react';
import styled from 'styled-components';
import { Dialog } from 'primereact/dialog';
import { UseMutationResult } from '@/cdn/types/Query';
import documentService from '@/features/documents/utils/documentService';
import { FileConstraints } from '@/features/documents/conf/fileConstraints';
import Button from '@/ui/atoms/Button';
import InputHelp from '@/ui/atoms/form/InputHelp';
import FormError from '@/ui/atoms/form/FormError';

type AvatarUploadDialog = {
  relatedEntityId: number;
  avatar: ReactNode;
  dialogOpen: boolean;
  setDialogOpen: Function;
  fileConstraints: FileConstraints;
  onCreate: (formData: FormData) => void;
  createQuery: UseMutationResult<FormData>;
  onDelete: Function;
  deleteQuery: UseMutationResult<any>;
};

const AvatarUploadDialog = (props: AvatarUploadDialog) => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const fileInput = useRef<HTMLInputElement>(null);

  const handleCloseDialog = () => {
    resetUploader();
    props.setDialogOpen(false);
  };

  const handleOpenFileBrowser = () => {
    resetUploader();
    fileInput.current?.click();
  };

  const resetUploader = () => {
    if (!props.createQuery.isIdle) {
      props.createQuery.reset();
    }
    if (!props.deleteQuery.isIdle) {
      props.deleteQuery.reset();
    }
    if (errorMessage) {
      setErrorMessage(undefined);
    }
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

        const formData = documentService.avatarCreateFormData(
          file,
          props.relatedEntityId
        );

        props.onCreate(formData);
      } else {
        setErrorMessage(fileValidation.errorMessage);
      }
    } else {
      setErrorMessage('Veuillez séléctionner un fichier');
    }
  };

  return (
    <AvatarDialog
      visible={props.dialogOpen}
      onHide={handleCloseDialog}
      draggable={false}
    >
      <DialogContent>
        <div onClick={handleOpenFileBrowser}>{props.avatar}</div>
        {props.createQuery.error?.response && (
          <SubmissionError>
            {props.createQuery.error?.response?.data.message}
          </SubmissionError>
        )}
        {props.deleteQuery.error?.response?.data.message && (
          <SubmissionError>
            {props.deleteQuery.error?.response?.data.message}
          </SubmissionError>
        )}
        {errorMessage && <FormError>{errorMessage}</FormError>}
        <ButtonWrapper>
          <Button
            label="Changer la photo de profil"
            onClick={handleOpenFileBrowser}
            size="small"
            loading={props.createQuery.isLoading}
            disabled={props.deleteQuery.isLoading}
          />
          <Button
            variant="danger"
            icon="pi pi-trash"
            size="small"
            onClick={() => props.onDelete()}
            loading={props.deleteQuery.isLoading}
            disabled={props.createQuery.isLoading}
          />
        </ButtonWrapper>
        <HelpWrapper>
          <InputHelp>
            Formats de fichier acceptés : {props.fileConstraints.fileExtensions}
          </InputHelp>
          <InputHelp>
            Taille du fichier : min {props.fileConstraints.fileMinLength / 1000}
            ko, max {props.fileConstraints.fileMaxLength / 1000}ko
          </InputHelp>
        </HelpWrapper>
      </DialogContent>
      <FileInput
        ref={fileInput}
        type="file"
        name="avatar"
        onChange={(event) => {
          handleFileSelect(event);
        }}
        accept={props.fileConstraints.fileExtensions}
        maxLength={props.fileConstraints.fileMaxLength}
        minLength={props.fileConstraints.fileMinLength}
      />
    </AvatarDialog>
  );
};

const AvatarDialog = styled(Dialog)`
  width: 100%;
  padding: 0 20px;
  box-shadow: none;

  @media screen and (${({ theme }) => theme.breakpoints.sm}) {
    width: 330px;
    padding: unset;
  }
`;

const DialogContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const SubmissionError = styled(FormError)`
  text-align: center;
  max-width: 282px;

  @media screen and (${({ theme }) => theme.breakpoints.sm}) {
    max-width: unset;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 15px;
`;

const HelpWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

const FileInput = styled.input`
  display: none;
`;

export default AvatarUploadDialog;
