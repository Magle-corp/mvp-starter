import AppPages from '@/cdn/enums/AppPages';
import {
  Vocabulary,
  VocabularyTypes,
} from '@/features/dictionary/types/Vocabulary';
import Chip from '@/ui/atoms/Chip';
import LinkButton from '@/ui/atoms/LinkButton';

const ActionColumn = (data: Vocabulary, type: VocabularyTypes) => {
  return (
    <>
      {data.organization && (
        <LinkButton
          href={AppPages.BO_DICTIONARY_UPDATE + '/' + type + '/' + data.id}
          icon="pi pi-pencil"
        />
      )}
      {!data.organization && <Chip label="public" />}
    </>
  );
};

export default ActionColumn;
