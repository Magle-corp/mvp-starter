import { dateToString } from '@/cdn/utils/dateService';
import { AnimalDocument } from '@/features/animals/types/Animal';

const CreatedColumn = (props: AnimalDocument) => {
  return <p>{dateToString(new Date(props.created))}</p>;
};

export default CreatedColumn;
