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

const useStyles = makeStyles((theme: Theme) => ({
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
    <ListItem button className={clsx({ [classes.nested]: isNested })}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={item.name} />
    </ListItem>
  );
}

function SideMenuParentItem({ item }: { item: IMenuParentItem }) {
  const [isExpended, setIsExpended] = useState<boolean>(false);
  const Icon = item.icon;
  const onIsExpendedToggle = useCallback(
    () => setIsExpended(current => !current),
    [],
  );
  return (
    <>
      <ListItem button onClick={onIsExpendedToggle}>
        <ListItemIcon>{isExpended ? <ExpandMore /> : <Icon />}</ListItemIcon>
        <ListItemText primary={item.name} />
      </ListItem>
      <Collapse in={isExpended} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.children.map(child => (
            <SideMenuChildItem key={child.name} item={child} isNested />
          ))}
        </List>
      </Collapse>
    </>
  );
}

interface ISideMenuItemProps {
  item: IMenuItem;
}

const SideMenuItem: React.FC<ISideMenuItemProps> = ({ item }) => {
  if ('children' in item) {
    return <SideMenuParentItem item={item} />;
  } else {
    return <SideMenuChildItem item={item} />;
  }
};

export default SideMenuItem;
