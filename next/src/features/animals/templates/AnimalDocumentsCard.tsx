import { UseGetResult } from '@/cdn/types/Query';
import { Animal } from '@/features/animals/types/Animal';

type AnimalDocumentsCard = {
  animalQuery: UseGetResult<Animal>;
};

const AnimalDocumentsCard = (props: AnimalDocumentsCard) => {
  console.log(props.animalQuery.data?.data);
  return (
    <div>
      <p>documents card</p>
    </div>
  );
};

export default AnimalDocumentsCard;
