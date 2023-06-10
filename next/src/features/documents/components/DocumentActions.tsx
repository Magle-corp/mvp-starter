import styled from 'styled-components';
import { MdMoreVert } from 'react-icons/md';
import useBreakpoints from '@/cdn/hooks/useBreakpoints';
import { AnimalDocument } from '@/features/animals/types/Animal';
import WrapperItemTemplate from '@/features/documents/components/WrapperItemTemplate';
import LinkButton from '@/ui/atoms/LinkButton';
import Button from '@/ui/atoms/Button';

type DocumentActions = {
  document: AnimalDocument;
  onDelete: (entityId: number) => void;
};

const DocumentActions = (props: DocumentActions) => {
  const { breakpointSM } = useBreakpoints();

  return (
    <>
      {breakpointSM && (
        <WrapperItemTemplate>
          <LinkButton
            href={'http://localhost:8080' + props.document.contentUrl}
            icon="pi pi-eye"
            target="_blank"
          />
          <Button
            icon="pi pi-trash"
            variant="danger"
            onClick={() => props.onDelete(props.document.id)}
            size="small"
          />
        </WrapperItemTemplate>
      )}
      {!breakpointSM && (
        <Button size="small">
          <MoreIcon />
        </Button>
      )}
    </>
  );
};

const MoreIcon = styled(MdMoreVert)`
  width: 16px !important;
  height: 16px !important;
  color: white !important;
  cursor: pointer;
`;

export default DocumentActions;
