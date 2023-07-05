import { ChangeEvent } from 'react';
import { confirmDialog } from 'primereact/confirmdialog';
import Medias from '@/cdn/enums/Medias';
import { FileConstraints } from '@/features/documents/conf/fileConstraints';

const getFileFromEvent = (
  event: ChangeEvent<HTMLInputElement>
): File | null => {
  if (event.target.files && event.target.files[0]) {
    return event.target.files[0];
  } else {
    return null;
  }
};

const fileConstraintsValidator = (
  fileConstraints: FileConstraints,
  file: File
): {
  error: boolean;
  errorMessage?: string;
} => {
  if (file.size > fileConstraints.fileMaxLength) {
    return {
      error: true,
      errorMessage: 'Le fichier est trop lourd',
    };
  }

  if (file.size < fileConstraints.fileMinLength) {
    return {
      error: true,
      errorMessage: 'Le fichier est trop léger',
    };
  }

  if (!fileConstraints.fileTypes.includes(file.type)) {
    return {
      error: true,
      errorMessage: 'Type de fichier incorrect',
    };
  }

  return {
    error: false,
    errorMessage: undefined,
  };
};

const avatarCreateFormData = (
  avatarType: Medias.ANIMAL_AVATAR | Medias.USER_AVATAR,
  file: File,
  relatedEntityId: number
): FormData => {
  const fileInformationJson = {
    related_entity_id: relatedEntityId,
    file_entity_type: avatarType,
  };
  const fileInformation = JSON.stringify(fileInformationJson);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('file_information', fileInformation);

  return formData;
};

const documentCreateFormData = (
  file: File,
  fileName: string,
  relatedEntityId: number
): FormData => {
  const fileInformationJson = {
    related_entity_id: relatedEntityId,
    file_entity_type: Medias.ANIMAL_DOCUMENT,
    file_name: fileName,
  };
  const fileInformation = JSON.stringify(fileInformationJson);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('file_information', fileInformation);

  return formData;
};

const documentDeleteConfirmDialog = (onAccept: Function, entityId: number) => {
  confirmDialog({
    message:
      'Cette action est irréversible, êtes-vous sûr de vouloir continuer ?',
    header: 'Supprimer un document',
    icon: 'pi pi-exclamation-triangle',
    accept: () => onAccept(entityId),
  });
};

const documentService = {
  getFileFromEvent,
  fileConstraintsValidator,
  avatarCreateFormData,
  documentCreateFormData,
  documentDeleteConfirmDialog,
};

export default documentService;
