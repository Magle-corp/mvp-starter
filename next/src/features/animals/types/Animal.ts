import Organization from '@/features/organization/types/Organization';

type Animal = {
  id: number;
  name: string;
  organization: Organization;
  tempers: AnimalTemper[];
  race: AnimalRace;
  sex: AnimalSex;
  registered: string;
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
};

type AnimalSex = {
  id: number;
  name: string;
};

export type { Animal, AnimalTemper, AnimalType, AnimalRace, AnimalSex };
