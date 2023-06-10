import { MenuItem } from 'primereact/menuitem';
import AppPages from '@/cdn/enums/AppPages';

const menuOrganization: MenuItem[] = [
  { label: 'Accueil', icon: 'pi pi-home', url: AppPages.BO_DASHBOARD },
  {
    label: 'Animaux',
    icon: 'pi pi-table',
    url: AppPages.BO_ANIMALS,
  },
  {
    label: 'Documents',
    icon: 'pi pi-file',
    url: AppPages.BO_DOCUMENTS,
  },
  {
    label: 'Dictionnaire',
    icon: 'pi pi-book',
    url: AppPages.BO_DICTIONARY,
  },
];

export default menuOrganization;
