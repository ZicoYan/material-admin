import React from 'react';
import { IMenuItem } from '../../types/menu';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { List } from '@material-ui/core';
import SideMenuItem from './SideMenuItem';

interface ISideMenuProps {
  menu: IMenuItem[];
  isExpended: boolean;
}

const useStyles = makeStyles(() => ({
  root: ({ isExpended }: { isExpended: boolean }) => ({
    width: '100%',
    maxWidth: isExpended ? 240 : 56,
    overflowX: 'hidden',
    transition: 'max-width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
  }),
}));

const SideMenu: React.FC<ISideMenuProps> = ({ menu, isExpended }) => {
  const classes = useStyles({ isExpended });
  return (
    <aside className={classes.root}>
      <List aria-label="side menu" component="nav">
        {menu.map(menuItem => (
          <SideMenuItem
            isSideMenuExpended={isExpended}
            item={menuItem}
            key={menuItem.name}
          />
        ))}
      </List>
    </aside>
  );
};

export default SideMenu;
