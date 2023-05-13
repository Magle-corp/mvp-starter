import { VocabularyTypes } from '@/features/dictionary/enums/Vocabulary';
import { RaceFormSchema } from '@/features/dictionary/forms/RaceForm';
import { TemperFormSchema } from '@/features/dictionary/forms/TemperForm';
import { TypeFormSchema } from '@/features/dictionary/forms/TypeForm';

export type VocabularyFormSchemas =
  | RaceFormSchema
  | TemperFormSchema
  | TypeFormSchema;

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
