import { Icon } from '@iconify/react';

import { SideNavItem } from './types';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Inicio',
    path: '/dashboard',
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: 'Medicamentos',
    path: '/mis-medicamentos',
    icon: <Icon icon="lucide:folder" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Todos', path: '/mis-medicamentos' },
      { title: 'Importantes', path: '/mis-medicamentos/importantes' },
    ],
  },
  {
    title: 'Registros',
    path: '/registros',
    icon: <Icon icon="lucide:mail" width="24" height="24" />,
  },
  {
    title: 'Configuración',
    path: '/settings',
    icon: <Icon icon="lucide:settings" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Account', path: '/settings/account' },
      { title: 'Privacy', path: '/settings/privacy' },
    ],
  },
  {
    title: 'Ayuda',
    path: '/server',
    icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
  },
];
