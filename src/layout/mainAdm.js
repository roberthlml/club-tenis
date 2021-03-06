import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import Container from '@material-ui/core/Container';

import {AuthContext} from '../contexto/auth';
import { SidebarAdm, Topbar, Footer } from './componentes';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      marginTop: 64,
    }
  },
  shiftContent: {
    paddingTop: 16,
    paddingLeft: 240
  },
  content: {
    height: '100%'
  }
}));

const MainAdm = props => {
  const { children } = props;

  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery( theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  const [openSidebar, setOpenSidebar] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}
    >
      <Topbar 
        onSidebarOpen={ handleSidebarOpen }
        tipoUsuario="Administrador"
        nombre={currentUser.email}
      />
      <SidebarAdm
        onClose={ handleSidebarClose }
        open={ shouldOpenSidebar }
        variant={ isDesktop ? 'persistent' : 'temporary' }
      />
      <Container>
      
        { children }
        <Footer />
      
      </Container>
    </div>
  );
};

MainAdm.propTypes = {
  children: PropTypes.node
};

export default MainAdm;