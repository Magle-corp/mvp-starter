import { ChangeEventHandler, useRef } from 'react';
import styled from 'styled-components';
import { Avatar, AvatarProps } from 'primereact/avatar';
import { Tooltip } from 'primereact/tooltip';

type AnimalAvatar = {
  onSubmit: ChangeEventHandler<HTMLInputElement>;
} & AvatarProps;

const AnimalAvatar = (props: AnimalAvatar) => {
  const fileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInput.current?.click();
  };

  return (
    <div>
      <Tooltip target=".tooltip-target" mouseTrack mouseTrackLeft={20} />
      <Avatar
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

export default AnimalAvatar;
