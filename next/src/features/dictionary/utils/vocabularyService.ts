import { MutableRefObject } from 'react';
import {
  Vocabulary,
  VocabularyFormConfiguration,
  VocabularyTypes,
} from '@/features/dictionary/types/Vocabulary';

const successToast = (toast: MutableRefObject<any>) =>
  toast.current.show({
    severity: 'success',
    summary: 'Dictionnaire',
    detail: 'Enregistré avec succès',
  });

const errorToast = (toast: MutableRefObject<any>) =>
  toast.current.show({
    severity: 'error',
    summary: 'Dictionnaire',
    detail: 'Un problème technique est survenu',
  });

const deleteToast = (toast: MutableRefObject<any>) =>
  toast.current.show({
    severity: 'success',
    summary: 'Dictionnaire',
    detail: 'Supprimé avec succès',
  });

const getCreateFormConfiguration = (
  organizationId: number,
  vocabularyType: VocabularyTypes
): VocabularyFormConfiguration => {
  switch (vocabularyType) {
    case VocabularyTypes.TEMPER:
      return {
        type: VocabularyTypes.TEMPER,
        cardTitle: 'Ajouter un caractère',
        defaultValues: {
          name: '',
          organization: organizationId.toString(),
        },
      };
    case VocabularyTypes.TYPE:
      return {
        type: VocabularyTypes.TYPE,
        cardTitle: 'Ajouter un type',
        defaultValues: {
          name: '',
          type: '',
          organization: organizationId.toString(),
        },
      };
    case VocabularyTypes.RACE:
      return {
        type: VocabularyTypes.RACE,
        cardTitle: 'Ajouter une race',
        defaultValues: {
          name: '',
          organization: organizationId.toString(),
        },
      };
  }
};

const getUpdateFormConfiguration = (
  vocabularyType: VocabularyTypes,
  defaultValues: Vocabulary
): VocabularyFormConfiguration => {
  switch (vocabularyType) {
    case VocabularyTypes.TEMPER:
      return {
        type: VocabularyTypes.TEMPER,
        cardTitle: 'Mettre un jour un caractère',
        defaultValues: {
          name: defaultValues.name,
          organization: defaultValues.organization?.id.toString() as string,
        },
      };
    case VocabularyTypes.TYPE:
      return {
        type: VocabularyTypes.TYPE,
        cardTitle: 'Mettre un jour un type',
        defaultValues: {
          name: defaultValues.name,
          organization: defaultValues.organization?.id.toString() as string,
        },
      };
    case VocabularyTypes.RACE:
      return {
        type: VocabularyTypes.RACE,
        cardTitle: 'Mettre un jour une race',
        defaultValues: {
          name: defaultValues.name,
          // @ts-ignore
          type: defaultValues.type.id,
          organization: defaultValues.organization?.id.toString() as string,
        },
      };
  }
};

export {
  successToast,
  errorToast,
  deleteToast,
  getCreateFormConfiguration,
  getUpdateFormConfiguration,
};
