import React, { useCallback, useMemo, useState } from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';
import clsx from 'clsx';
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  Tooltip,
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

function ChildItem({
  item,
  isNested,
  parentPath,
  isSideMenuExpended,
}: {
  item: IMenuChildItem;
  isNested?: boolean;
  parentPath?: string;
  isSideMenuExpended: boolean;
}) {
  const parentPathWithoutSlash = parentPath
    ? parentPath.replace(/\/$/, '').replace(/^\//, '')
    : '';
  const currentPath = useMemo<string>(() => {
    const childPath = Array.isArray(item.path)
      ? item.path.length
        ? item.path[0]
        : ''
      : item.path;
    const childPathWithoutSlash = childPath.replace(/^\//, '');
    return parentPathWithoutSlash
      ? `/${parentPathWithoutSlash}/${childPathWithoutSlash}`
      : `/${childPathWithoutSlash}`;
  }, [parentPathWithoutSlash, item.path]);
  const Icon = item.icon;
  const classes = useStyles();

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
        <RouterLink to={currentPath} ref={ref} {...itemProps} />
      )),
    [currentPath],
  );

  if (item.hide) {
    return null;
  }
  return (
    <Tooltip title={isSideMenuExpended ? '' : item.name} placement="right">
      <ListItem
        button
        component={renderLink}
        className={clsx(classes.item, { [classes.nested]: isNested })}
      >
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={item.name} />
      </ListItem>
    </Tooltip>
  );
}

function ParentItem({
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
  if (item.hide) {
    return null;
  }
  return (
    <>
      <Tooltip title={isSideMenuExpended ? '' : item.name} placement="right">
        <ListItem className={classes.item} button onClick={onIsExpendedToggle}>
          <ListItemIcon>{isExpended ? <ExpandMore /> : <Icon />}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItem>
      </Tooltip>
      <Collapse in={isExpended} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.children.map(child => (
            <ChildItem
              isSideMenuExpended={isSideMenuExpended}
              parentPath={
                Array.isArray(item.path)
                  ? item.path.length
                    ? item.path[0]
                    : ''
                  : item.path
              }
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
  if (item.hide) {
    return null;
  }
  if ('children' in item) {
    return <ParentItem isSideMenuExpended={isSideMenuExpended} item={item} />;
  } else {
    return <ChildItem isSideMenuExpended={isSideMenuExpended} item={item} />;
  }
};

export default SideMenuItem;
