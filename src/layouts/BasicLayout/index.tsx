import React from 'react';
import TopBar from './TopBar';
import { CssBaseline } from "@material-ui/core";
import { IMenuItem } from "../../types/menu";
import SideMenu from "./SideMenu";

interface IBasicLayoutProps {
  menu: IMenuItem[];
}

const BasicLayout: React.FC<IBasicLayoutProps> = props => {
  return (
    <div>
      <CssBaseline />
      <TopBar onMenuToggle={() => console.log('menu toggle')} />
      <SideMenu isExpended={true} menu={props.menu} />
    </div>
  );
};

export default BasicLayout;
