import { Theme } from '@material-ui/core';
import { StyleRules } from '@material-ui/core/styles';

export default (theme: Theme): StyleRules => ({
  container: {
    margin: theme.spacing.unit * 2
  },
  button: {
    margin: theme.spacing.unit
  },
});