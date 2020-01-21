import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { CssBaseline, makeStyles, Theme } from '@material-ui/core';
import { IMenuItem } from '../../types/menu';
import TopBar from './TopBar';
import SideMenu from './SideMenu';
import useBoolean from '../../hooks/useBoolean';
import Loadable from '../../components/Loadable';

const getPath = (menuItem: IMenuItem) => {
  if (Array.isArray(menuItem.path)) {
    return menuItem.path.length ? menuItem.path[0] : '';
  }
  return menuItem.path;
};

const renderRoute = (
  menu: IMenuItem,
  parentPath: string = '',
): React.ReactElement => {
  const currentPath = getPath(menu);
  const completedPath = [
    '',
    parentPath.replace(/^\/*/, '').replace(/\/*$/, ''),
    currentPath.replace(/^\/*/, ''),
  ].join('/');
  if ('children' in menu) {
    return (
      <React.Fragment key={completedPath}>
        {menu.children.map(item => renderRoute(item, completedPath))}
      </React.Fragment>
    );
  }
  return (
    <Route key={completedPath} path={completedPath}>
      <Loadable lazyComponent={menu.component} />
    </Route>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  mainContent: {
    minHeight: 'calc(100vh - 64px)',
    display: 'flex',
  },
}));

interface IBasicLayoutProps {
  menu: IMenuItem[];
}

const BasicLayout: React.FC<IBasicLayoutProps> = props => {
  const {
    value: isSideMenuExpended,
    toggle: onSideMenuExpendToggle,
  } = useBoolean(true);
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <TopBar onMenuToggle={onSideMenuExpendToggle} />
      <main className={classes.mainContent}>
        <SideMenu isExpended={isSideMenuExpended} menu={props.menu} />
        <Switch>{props.menu.map(item => renderRoute(item))}</Switch>
      </main>
    </>
  );
};

export default BasicLayout;
