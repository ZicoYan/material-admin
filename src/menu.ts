import { lazy } from 'react';
import { Dashboard, People } from '@material-ui/icons';
import { IMenuItem } from './types/menu';

const menu: IMenuItem[] = [
  {
    name: '总览',
    icon: Dashboard,
    component: lazy(() => import('./pages/Dashboard')),
    path: ['/', '/dashboard'],
  },
  {
    name: '员工',
    icon: People,
    path: '/employee',
    children: [
      {
        name: '员工列表',
        path: '/list',
        icon: People,
        component: lazy(() => import('./pages/Employee/List')),
      },
    ],
  },
];

export default menu;
