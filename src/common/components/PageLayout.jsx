import React, { useState } from 'react';
import {
  AppBar,
  Breadcrumbs,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from './LocalizationProvider';

const useStyles = makeStyles((theme) => ({
  desktopRoot: {
    height: '100%',
    display: 'flex',
  },
  mobileRoot: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  desktopDrawer: {
    width: (props) => (props.miniVariant ? `calc(${theme.spacing(8)} + 1px)` : theme.dimensions.drawerWidthDesktop),
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  mobileDrawer: {
    width: theme.dimensions.drawerWidthTablet,
  },
  mobileToolbar: {
    zIndex: 1,
  },
  content: {
    flexGrow: 1,
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },
}));

const PageTitle = ({ breadcrumbs }) => {
  const theme = useTheme();
  const t = useTranslation();

  const desktop = useMediaQuery(theme.breakpoints.up('md'));

  if (desktop) {
    return (
      <Typography variant="h6" noWrap>{t(breadcrumbs[0])}</Typography>
    );
  }
  return (
    <Breadcrumbs>
      {breadcrumbs.slice(0, -1).map((breadcrumb) => (
        <Typography variant="h6" color="inherit" key={breadcrumb}>{t(breadcrumb)}</Typography>
      ))}
      <Typography variant="h6" color="textPrimary">{t(breadcrumbs[breadcrumbs.length - 1])}</Typography>
    </Breadcrumbs>
  );
};

const PageLayout = ({ menu, breadcrumbs, children }) => {
  const [miniVariant, setMiniVariant] = useState(false);
  const classes = useStyles({ miniVariant });
  const theme = useTheme();
  const navigate = useNavigate();

  const desktop = useMediaQuery(theme.breakpoints.up('md'));

  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => setMiniVariant(!miniVariant);

  return desktop ? (
    <div className={classes.desktopRoot}>
      <Drawer
        variant="permanent"
        className={classes.desktopDrawer}
        classes={{ paper: classes.desktopDrawer }}
      >
        <Toolbar>
          {!miniVariant && (
            <>
              <IconButton color="inherit" edge="start" sx={{ mr: 2 }} onClick={() => navigate('/')}>
                <ArrowBackIcon />
              </IconButton>
              <PageTitle breadcrumbs={breadcrumbs} />
            </>
          )}
          <IconButton color="inherit" edge="start" sx={{ ml: miniVariant ? -2 : 'auto' }} onClick={toggleDrawer}>
            {miniVariant ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Toolbar>
        <Divider />
        {menu}
      </Drawer>
      <div className={classes.content}>{children}</div>
    </div>
  ) : (
    <div className={classes.mobileRoot}>
      <Drawer
        variant="temporary"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        classes={{ paper: classes.mobileDrawer }}
      >
        {menu}
      </Drawer>
      <AppBar className={classes.mobileToolbar} position="static" color="inherit">
        <Toolbar>
          <IconButton color="inherit" edge="start" sx={{ mr: 2 }} onClick={() => setOpenDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <PageTitle breadcrumbs={breadcrumbs} />
        </Toolbar>
      </AppBar>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default PageLayout;
