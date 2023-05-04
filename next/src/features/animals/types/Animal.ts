type Animal = {
  id?: number;
  name: string;
  organization: string;
  tempers: AnimalTemper[];
};

type AnimalTemper = {
  id?: number;
  name: string;
};

export type { Animal, AnimalTemper };
