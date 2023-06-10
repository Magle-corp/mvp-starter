import { MediaObject } from '@/cdn/types/Api';
import Organization from '@/features/organization/types/Organization';

type Animal = {
  id: number;
  name: string;
  organization: Organization;
  tempers: AnimalTemper[];
  race: AnimalRace;
  sex: AnimalSex;
  registered: string;
  avatar?: AnimalAvatar;
  documents: AnimalDocument[];
};

type AnimalTemper = {
  id: number;
  name: string;
  organization?: Organization;
};

type AnimalType = {
  id: number;
  name: string;
  organization?: Organization;
};

type AnimalRace = {
  id: number;
  name: string;
  type: AnimalType;
  organization?: Organization;
};

type AnimalSex = {
  id: number;
  name: string;
};

type AnimalAvatar = {
  animal: Animal;
} & MediaObject;

type AnimalDocument = {
  animal: Animal;
  fileName: string;
  fileExtension: string;
} & MediaObject;

export type {
  Animal,
  AnimalTemper,
  AnimalType,
  AnimalRace,
  AnimalSex,
  AnimalDocument,
};
