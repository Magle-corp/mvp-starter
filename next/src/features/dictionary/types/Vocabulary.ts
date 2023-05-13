import {
  AnimalRace,
  AnimalTemper,
  AnimalType,
} from '@/features/animals/types/Animal';
import { RaceFormSchema } from '@/features/dictionary/forms/RaceForm';
import { TemperFormSchema } from '@/features/dictionary/forms/TemperForm';
import { TypeFormSchema } from '@/features/dictionary/forms/TypeForm';

type Vocabulary = AnimalType | AnimalTemper | AnimalRace;

enum VocabularyTypes {
  TYPE = 'type',
  RACE = 'race',
  TEMPER = 'temper',
}

type VocabularyFormSchemas = RaceFormSchema | TemperFormSchema | TypeFormSchema;

type VocabularyFormConfiguration = {
  type: VocabularyTypes;
  cardTitle: string;
  formDefaultValues: VocabularyFormSchemas;
};

type VocabularyFormConfigurations = Record<
  VocabularyTypes,
  VocabularyFormConfiguration
>;

export type {
  Vocabulary,
  VocabularyFormSchemas,
  VocabularyFormConfiguration,
  VocabularyFormConfigurations,
};
export { VocabularyTypes };
