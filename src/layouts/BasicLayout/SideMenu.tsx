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
  root: {
    width: '100%',
    maxWidth: 240,
  },
}));

const SideMenu: React.FC<ISideMenuProps> = ({ menu }) => {
  const classes = useStyles();
  return (
    <aside className={classes.root}>
      <List aria-label="side menu" component="nav">
        {menu.map(menuItem => (
          <SideMenuItem item={menuItem} key={menuItem.name} />
        ))}
      </List>
    </aside>
  );
};

export default SideMenu;
