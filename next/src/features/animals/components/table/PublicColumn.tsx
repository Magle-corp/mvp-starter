import { TbEyeOff, TbEye } from 'react-icons/tb';
import { Animal } from '@/features/animals/types/Animal';
import WrapperItemTemplate from '@/features/animals/components/WrapperItemTemplate';

const PublicColumn = (props: Animal) => {
  const PrivateVisibilityTemplate = () => (
    <>
      <TbEyeOff />
      <p>Privée</p>
    </>
  );

  const PublicVisibilityTemplate = () => (
    <>
      <TbEye />
      <p>Public</p>
    </>
  );

  return (
    <WrapperItemTemplate>
      {props.public ? (
        <PublicVisibilityTemplate />
      ) : (
        <PrivateVisibilityTemplate />
      )}
    </WrapperItemTemplate>
  );
};

export default PublicColumn;
