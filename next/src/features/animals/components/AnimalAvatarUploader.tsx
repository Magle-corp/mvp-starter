import { ChangeEvent, MouseEventHandler, useRef, useState } from 'react';
import styled from 'styled-components';
import { AvatarProps } from 'primereact/avatar';
import { Dialog } from 'primereact/dialog';
import { Tooltip } from 'primereact/tooltip';
import { UseMutationResult } from '@/cdn/types/Query';
import { Animal } from '@/features/animals/types/Animal';
import { AnimalFormSchema } from '@/features/animals/forms/AnimalForm';
import AnimalAvatar from '@/features/animals/components/AnimalAvatar';
import Button from '@/ui/atoms/Button';
import FormError from '@/ui/atoms/form/FormError';
import InputHelp from '@/ui/atoms/form/InputHelp';

type AnimalAvatarUploader = {
  animal: Animal;
  onUpdate: Function;
  updateQuery: UseMutationResult<AnimalFormSchema>;
  onDelete: MouseEventHandler<HTMLButtonElement>;
  deleteQuery: UseMutationResult<AnimalFormSchema>;
} & AvatarProps;

const AnimalAvatarUploader = (props: AnimalAvatarUploader) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const fileInput = useRef<HTMLInputElement>(null);
  const fileMaxLength = 500000;
  const fileMinLength = 10000;
  const fileTypes = ['image/jpeg', 'image/png', 'image/jpeg'];
  const fileExtensions = '.jpg, .png, .jpeg';

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleOpenFileBrowser = () => {
    fileInput.current?.click();
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

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

      props.onUpdate(event);
    }
  };

  return (
    <div>
      <Tooltip target=".tooltip-target" mouseTrack mouseTrackLeft={20} />
      <AnimalAvatar
        shape="circle"
        size="xlarge"
        onClick={handleOpenDialog}
        className="tooltip-target"
        data-pr-tooltip="Changer la photo de profil"
        animal={props.animal}
      />
      <AvatarDialog
        visible={dialogOpen}
        onHide={() => setDialogOpen(false)}
        blockScroll
      >
        <DialogContent>
          <StyledAnimalAvatar
            shape="circle"
            size="xlarge"
            onClick={handleOpenFileBrowser}
            className="tooltip-target"
            data-pr-tooltip="Changer la photo de profil"
            animal={props.animal}
          />
          {errorMessage && <FormError>{errorMessage}</FormError>}
          {props.updateQuery.error?.response?.data.message && (
            <FormError>
              {props.updateQuery.error?.response?.data.message}
            </FormError>
          )}
          {props.deleteQuery.error?.response?.data.message && (
            <FormError>
              {props.deleteQuery.error?.response?.data.message}
            </FormError>
          )}
          <ButtonWrapper>
            <Button
              label="Changer la photo de profil"
              onClick={handleOpenFileBrowser}
              size="small"
              loading={props.updateQuery.isLoading}
              disabled={props.deleteQuery.isLoading}
            />
            {props.animal.avatar && (
              <Button
                variant="danger"
                icon="pi pi-trash"
                size="small"
                onClick={props.onDelete}
                loading={props.deleteQuery.isLoading}
                disabled={props.updateQuery.isLoading}
              />
            )}
          </ButtonWrapper>
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
      </AvatarDialog>
    </div>
  );
};

const AvatarDialog = styled(Dialog)`
  min-width: 100%;
  padding: 0 20px;
  box-shadow: none;
  text-align: center;

  @media screen and (${({ theme }) => theme.breakpoints.sm}) {
    min-width: unset;
    width: 400px;
    padding: unset;
  }
`;

const DialogContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const StyledAnimalAvatar = styled(AnimalAvatar)`
  width: 150px !important;
  height: 150px !important;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 15px;
`;

const FileInput = styled.input`
  display: none;
`;

export default AnimalAvatarUploader;
