import { createTheme} from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#e2e8f0',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#6366f1',
    },
  },
});

export default theme;