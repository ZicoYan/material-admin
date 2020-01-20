import { lazy } from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

export type IMenuItem = IMenuChildItem | IMenuParentItem;

export interface IMenuItemBase {
  name: string;
  /**
   * material icon
   */
  icon: typeof SvgIcon;
  hide?: boolean;
  path: string | string[];
}

export interface IMenuParentItem extends IMenuItemBase {
  children: IMenuChildItem[];
}

export interface IMenuChildItem extends IMenuItemBase {
  component: ReturnType<typeof lazy>;
}
