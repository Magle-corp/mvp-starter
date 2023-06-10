import { AnimalDocument } from '@/features/animals/types/Animal';
import DocumentActions from '@/features/documents/components/DocumentActions';

type ActionColumn = {
  document: AnimalDocument;
  onDelete: (entityId: number) => void;
};

const ActionColumn = (props: ActionColumn) => {
  return (
    <DocumentActions document={props.document} onDelete={props.onDelete} />
  );
};

export default ActionColumn;
