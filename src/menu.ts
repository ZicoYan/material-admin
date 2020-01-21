import { lazy } from 'react';
import { Dashboard, Event, EventNote } from '@material-ui/icons';
import { IMenuItem } from './types/menu';

const menu: IMenuItem[] = [
  {
    name: '总览',
    icon: Dashboard,
    component: lazy(() => import('./pages/Dashboard')),
    path: ['/', '/dashboard'],
  },
  {
    name: '订单',
    icon: Event,
    path: '/order',
    children: [
      {
        name: '订单列表',
        path: '/list',
        icon: Event,
        component: lazy(() => import('./pages/Order/List')),
      },
      {
        hide: true,
        name: '订单详情',
        path: '/detail',
        icon: EventNote,
        component: lazy(() => import('./pages/Order/Detail')),
      }
    ],
  },
];

export default menu;
