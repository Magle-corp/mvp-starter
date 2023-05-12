import { VocabularyTypes } from '@/features/dictionary/types/Dictionary';
import { TemperFormSchema } from '@/features/dictionary/forms/TemperForm';

export type VocabularyFormSchemas = TemperFormSchema;

export type VocabularyFormConfiguration = {
  type: VocabularyTypes;
  cardTitle: string;
  formDefaultValues: VocabularyFormSchemas;
};

export type VocabularyFormConfigurations = Record<
  VocabularyTypes,
  VocabularyFormConfiguration
>;

const formConfigurations: VocabularyFormConfigurations = {
  temper: {
    type: VocabularyTypes.TEMPER,
    cardTitle: 'Ajouter un caractère',
    formDefaultValues: { name: '', organization: '' },
  },
  race: {
    type: VocabularyTypes.RACE,
    cardTitle: 'Ajouter une race',
    formDefaultValues: { name: '', organization: '' },
  },
  type: {
    type: VocabularyTypes.TYPE,
    cardTitle: 'Ajouter un caractère',
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
