import { Theme } from '@material-ui/core';
import { StyleRules } from '@material-ui/core/styles';

const styles = (theme: Theme): StyleRules => ({
  wrapper: {
  },

  main: {
    flexGrow: 1,
  },

  addButton: {
    position: "fixed",
    bottom: theme.spacing.unit * 15,
    right: theme.spacing.unit * 2,
  },
});

export default styles;