import {
  VocabularyTypes,
  VocabularyFormConfigurations,
} from '@/features/dictionary/types/Vocabulary';

const formConfigurations: VocabularyFormConfigurations = {
  race: {
    type: VocabularyTypes.RACE,
    cardTitle: 'Ajouter une race',
    formDefaultValues: { name: '', organization: '', type: '' },
  },
  temper: {
    type: VocabularyTypes.TEMPER,
    cardTitle: 'Ajouter un caractère',
    formDefaultValues: { name: '', organization: '' },
  },
  type: {
    type: VocabularyTypes.TYPE,
    cardTitle: 'Ajouter un type',
    formDefaultValues: { name: '', organization: '' },
  },
};

const getVocabularyFormConfiguration = (
  vocabularyType: VocabularyTypes,
  organizationId: string
) => {
  const formConfiguration = formConfigurations[vocabularyType];
  formConfiguration.formDefaultValues.organization = organizationId;

  return formConfiguration;
};

export default getVocabularyFormConfiguration;
