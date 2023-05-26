import { ChangeEventHandler, useRef } from 'react';
import styled from 'styled-components';
import { Avatar, AvatarProps } from 'primereact/avatar';

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
      <Avatar shape="circle" size="xlarge" onClick={handleClick} {...props} />
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
