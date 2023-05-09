import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export enum DateFormatVariant {
  DEFAULT = 'dd/MM/yy',
  FULL_DATE_STRING = 'd MMMM yyyy',
}

const dateToString = (date: Date, variant?: DateFormatVariant): string => {
  return format(date, variant ?? DateFormatVariant.DEFAULT, {
    locale: fr,
  });
};

export { dateToString };
