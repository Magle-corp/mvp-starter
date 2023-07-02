import { Chip } from 'primereact/chip';
import { AnimalTemper } from '@/features/animals/types/Animal';

const TemperMultiselectValue = (
  valueTemperId: number,
  tempers: AnimalTemper[]
) => {
  const relatedLabel = tempers.find((temper) => temper.id === valueTemperId);

  return <Chip label={relatedLabel?.name.toLowerCase()} />;
};

export default TemperMultiselectValue;
