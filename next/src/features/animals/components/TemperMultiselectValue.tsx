import { AnimalTemper } from '@/features/animals/types/Animal';
import Chip from '@/ui/atoms/Chip';

const TemperMultiselectValue = (
  valueTemperId: number,
  tempers: AnimalTemper[]
) => {
  const relatedLabel = tempers.find((temper) => temper.id === valueTemperId);

  return <Chip label={relatedLabel?.name.toLowerCase()} />;
};

export default TemperMultiselectValue;
