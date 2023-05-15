import AppPages from '@/cdn/enums/AppPages';

const menuOrganization = [
  { label: 'Accueil', icon: 'pi pi-home', url: AppPages.BO_DASHBOARD },
  {
    label: 'Animaux',
    icon: 'pi pi-table',
    url: AppPages.BO_ANIMALS,
  },
  {
    label: 'Dictionnaire',
    icon: 'pi pi-bookmark',
    url: AppPages.BO_DICTIONARY,
  },
];

export default menuOrganization;
