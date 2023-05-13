import AppPages from '@/cdn/enums/AppPages';
import { Animal } from '@/features/animals/types/Animal';
import LinkButton from '@/ui/atoms/LinkButton';

const ActionColumn = (props: Animal) => {
  return (
    <LinkButton
      href={AppPages.BO_ANIMAL_UPDATE + '/' + props.id}
      icon="pi pi-pencil"
    />
  );
};

export default ActionColumn;
