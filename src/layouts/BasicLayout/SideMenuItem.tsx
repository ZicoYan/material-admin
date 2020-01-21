import React, { useCallback, useState } from 'react';
import clsx from 'clsx';
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

import { IMenuChildItem, IMenuItem, IMenuParentItem } from '../../types/menu';

const ITEM_HEIGHT = 48;

const useStyles = makeStyles((theme: Theme) => ({
  item: {
    height: ITEM_HEIGHT,
    whiteSpace: 'nowrap',
    transition: 'padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function SideMenuChildItem({
  item,
  isNested,
}: {
  item: IMenuChildItem;
  isNested?: boolean;
}) {
  const Icon = item.icon;
  const classes = useStyles();
  return (
    <ListItem
      button
      className={clsx(classes.item, { [classes.nested]: isNested })}
    >
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={item.name} />
    </ListItem>
  );
}

function SideMenuParentItem({
  item,
  isSideMenuExpended,
}: {
  item: IMenuParentItem;
  isSideMenuExpended: boolean;
}) {
  const classes = useStyles();
  const [isExpended, setIsExpended] = useState<boolean>(false);
  const Icon = item.icon;
  const onIsExpendedToggle = useCallback(
    () => setIsExpended(current => !current),
    [],
  );
  return (
    <>
      <ListItem className={classes.item} button onClick={onIsExpendedToggle}>
        <ListItemIcon>{isExpended ? <ExpandMore /> : <Icon />}</ListItemIcon>
        <ListItemText primary={item.name} />
      </ListItem>
      <Collapse in={isExpended} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.children.map(child => (
            <SideMenuChildItem
              key={child.name}
              item={child}
              isNested={isSideMenuExpended}
            />
          ))}
        </List>
      </Collapse>
    </>
  );
}

interface ISideMenuItemProps {
  item: IMenuItem;
  isSideMenuExpended: boolean;
}

const SideMenuItem: React.FC<ISideMenuItemProps> = ({
  item,
  isSideMenuExpended,
}) => {
  if ('children' in item) {
    return (
      <SideMenuParentItem isSideMenuExpended={isSideMenuExpended} item={item} />
    );
  } else {
    return <SideMenuChildItem item={item} />;
  }
};

export default SideMenuItem;
