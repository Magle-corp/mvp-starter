import { dateToString } from '@/cdn/utils/dateService';
import { Animal } from '@/features/animals/types/Animal';
import WrapperItemTemplate from '@/features/animals/components/WrapperItemTemplate';

const RegisteredColumn = (props: Animal) => {
  return (
    <WrapperItemTemplate>
      <p>{dateToString(new Date(props.registered))}</p>
    </WrapperItemTemplate>
  );
};

export default RegisteredColumn;
