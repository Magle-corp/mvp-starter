import { ChangeEventHandler, useRef } from 'react';
import styled from 'styled-components';
import { AvatarProps } from 'primereact/avatar';
import { Tooltip } from 'primereact/tooltip';
import { Animal } from '@/features/animals/types/Animal';
import AnimalAvatar from '@/features/animals/components/AnimalAvatar';

type AnimalAvatarUploader = {
  animal: Animal;
  onSubmit: ChangeEventHandler<HTMLInputElement>;
} & AvatarProps;

const AnimalAvatarUploader = (props: AnimalAvatarUploader) => {
  const fileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInput.current?.click();
  };

  return (
    <div>
      <Tooltip target=".tooltip-target" mouseTrack mouseTrackLeft={20} />
      <AnimalAvatar
        shape="circle"
        size="xlarge"
        onClick={handleClick}
        className="tooltip-target"
        data-pr-tooltip="Changer la photo de profil"
        {...props}
      />
      <FileInput
        ref={fileInput}
        type="file"
        name="animal_file"
        onChange={props.onSubmit}
      />
    </div>
  );
};

const FileInput = styled.input`
  display: none;
`;

export default AnimalAvatarUploader;
