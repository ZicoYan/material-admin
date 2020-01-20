import React, { useCallback, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Theme, makeStyles } from '@material-ui/core/styles';

import { Menu as MenuIcon, AccountCircle as AccountCircleIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

interface ITopBarProps {
  onMenuToggle(): void;
}

const TopBar: React.FC<ITopBarProps> = props => {
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(null);
  const classes = useStyles();
  const onMenuToggle = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setUserMenuAnchorEl(current => {
      if (current) {
        return null;
      }
      return event.currentTarget;
    });
  }, []);
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="toggle menu"
            onClick={props.onMenuToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            TODO: 面包屑
          </Typography>
          <IconButton aria-label="user" color="inherit" onClick={onMenuToggle}>
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={userMenuAnchorEl}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            getContentAnchorEl={null}
            open={!!userMenuAnchorEl}
            onClose={onMenuToggle}
            keepMounted
          >
            <MenuItem>注销</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopBar;
