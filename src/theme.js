import { createMuiTheme } from '@material-ui/core/styles';
import {blue,green} from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: green,
    text: {
      primary: 'rgb(1, 73, 139)'
    }
  },
  status: {
    danger: 'orange',
  },
  typography: {
    fontFamily: 'Barlow, sans-serif',
    htmlFontSize: 20
  }
});
export default theme;