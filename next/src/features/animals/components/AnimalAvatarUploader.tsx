import { useState } from 'react';
import styled from 'styled-components';
import { AvatarProps } from 'primereact/avatar';
import { Tooltip } from 'primereact/tooltip';
import { UseMutationResult } from '@/cdn/types/Query';
import { avatarConstraints } from '@/features/documents/conf/fileConstraints';
import AvatarUploadDialog from '@/features/documents/components/AvatarUploadDialog';
import { Animal } from '@/features/animals/types/Animal';
import AnimalAvatar from '@/features/animals/components/AnimalAvatar';

type AnimalAvatarUploader = {
  animal: Animal;
  onCreate: (formData: FormData) => void;
  createQuery: UseMutationResult<FormData>;
  onDelete: Function;
  deleteQuery: UseMutationResult<any>;
} & AvatarProps;

const AnimalAvatarUploader = (props: AnimalAvatarUploader) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const DialogAnimalAvatar = (
    <StyledAnimalAvatar
      shape="circle"
      className="tooltip-target"
      data-pr-tooltip="Changer la photo de profil"
      animal={props.animal}
    />
  );

  return (
    <div>
      <Tooltip target=".tooltip-target" mouseTrack mouseTrackLeft={20} />
      <AnimalAvatar
        shape="circle"
        size="xlarge"
        onClick={() => setDialogOpen(true)}
        className="tooltip-target"
        data-pr-tooltip="Changer la photo de profil"
        animal={props.animal}
      />
      <AvatarUploadDialog
        relatedEntityId={props.animal.id}
        avatar={DialogAnimalAvatar}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        fileConstraints={avatarConstraints}
        onCreate={props.onCreate}
        createQuery={props.createQuery}
        onDelete={props.onDelete}
        deleteQuery={props.deleteQuery}
      />
    </div>
  );
};

const StyledAnimalAvatar = styled(AnimalAvatar)`
  width: 150px !important;
  height: 150px !important;

  svg {
    width: 80px !important;
    height: 80px !important;
  }
`;

export default AnimalAvatarUploader;
