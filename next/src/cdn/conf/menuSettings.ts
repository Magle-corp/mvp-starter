import { MenuItem } from 'primereact/menuitem';
import AppPages from '@/cdn/enums/AppPages';

const menuSettings: MenuItem[] = [
  { label: 'Profil', icon: 'pi pi-user', url: AppPages.BO_SETTINGS_PROFILE },
  {
    label: 'Organisation',
    icon: 'pi pi-globe',
    url: AppPages.BO_SETTINGS_ORGANIZATION,
  },
];

export default menuSettings;
