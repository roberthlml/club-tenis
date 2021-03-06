import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Hidden, IconButton } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import logo from '../../imagenes/Logo8.svg';

import { auth } from '../../servicios/firebase';

const useStyles = makeStyles(theme => ({
  root: {
    background: '#FFF',
    color: '#000',
  },
  title: {
    flexGrow: 1,
  },
  txt: {
    flexGrow: 1,
    textTransform: 'none',
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, tipoUsuario, nombre, ...rest } = props;
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    auth.signOut();
  };

  return (
    <AppBar
      { ...rest }
      className={ clsx(classes.root, className) }
      position="fixed"
    >
      <Toolbar>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={ onSidebarOpen }
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <img
          alt="Logo"
          src={ logo }
          height={ 54 }
        />
        <Typography variant="h6" noWrap className={ classes.title } align="center">
          { tipoUsuario }
        </Typography>
        <Hidden mdDown>
          <IconButton onClick={handleClick}>
            <AccountCircleIcon />
            &nbsp;
            <Typography variant="h6" noWrap className={ classes.txt }>
              { nombre }
            </Typography>
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;