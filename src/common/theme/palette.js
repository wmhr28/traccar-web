import { grey, lightBlue, indigo } from '@mui/material/colors';

const validatedColor = (color) => (/^#([0-9A-Fa-f]{3}){1,2}$/.test(color) ? color : null);

export default (server, darkMode) => ({
  mode: darkMode ? 'dark' : 'light',
  background: {
    default: darkMode ? grey[900] : grey[50],
  },
  primary: {
    main: '#081d69' || (darkMode ? indigo[400] : indigo[900]),
  },
  secondary: {
    main: '#204291' || (darkMode ? indigo[400] : indigo[800]),
  },
  neutral: {
    main: '#828282',
  },
  geometry: {
    main: '#3bb2d0',
  },
});
