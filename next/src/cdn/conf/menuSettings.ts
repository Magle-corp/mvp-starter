import AppPages from '@/cdn/enums/AppPages';

export default [
  { label: 'Profil', icon: 'pi pi-user', url: AppPages.ADMIN_DASHBOARD },
  {
    label: 'Organisation',
    icon: 'pi pi-globe',
    url: AppPages.ADMIN_SETTINGS_ORGANIZATION,
  },
];
