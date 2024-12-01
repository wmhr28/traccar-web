import React from 'react';
import { useMediaQuery, Paper } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useTheme } from '@mui/material/styles';
import LogoImage from './LogoImage';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    display: 'flex',
    height: '100%',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.palette.primary.main,
    paddingBottom: 0,

    width: theme.dimensions.sidebarWidth,
    [theme.breakpoints.down('lg')]: {
      width: theme.dimensions.sidebarWidthTablet,

    },
    [theme.breakpoints.down('sm')]: {
      width: '0px',

    },
  },
  paper: {
    background: theme.palette.primary.main + ' !important',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    boxShadow: 'none !important',
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(0, 25, 0, 0),
    },
  },
  form: {
    maxWidth: theme.spacing(52),
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(6),
    width: '100%',
    background: '#ffffff',
    borderRadius: 10,
    [theme.breakpoints.down('sm')]: {
      maxWidth: theme.spacing(42),
    },
  },
}));

const LoginLayout = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <main className={classes.root}>
      <div className={classes.sidebar}>
        {!useMediaQuery(theme.breakpoints.down('lg')) && <LogoImage color={theme.palette.secondary.contrastText} />}
      </div>
      <Paper className={classes.paper}>
        {useMediaQuery(theme.breakpoints.down('lg')) && <LogoImage color={theme.palette.secondary.contrastText} />}
        <form className={classes.form}>
          <h2 style={{ color: theme.palette.primary.main, textAlign: 'center', lineHeight: '1.5rem', paddingBottom: theme.spacing(3), marginTop: 0 }}>Si&eacute;ntete seguro en toda Latinoam&eacute;rica</h2>
          {children}
        </form>
      </Paper>
    </main>
  );
};

export default LoginLayout;
