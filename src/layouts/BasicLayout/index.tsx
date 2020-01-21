import React from 'react';
import TopBar from './TopBar';
import { CssBaseline, makeStyles, Theme } from '@material-ui/core';
import { IMenuItem } from '../../types/menu';
import SideMenu from './SideMenu';
import useBoolean from '../../hooks/useBoolean';

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
  } = useBoolean(false);
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <TopBar onMenuToggle={onSideMenuExpendToggle} />
      <main className={classes.mainContent}>
        <SideMenu isExpended={isSideMenuExpended} menu={props.menu} />
        Hello
      </main>
    </>
  );
};

export default BasicLayout;
