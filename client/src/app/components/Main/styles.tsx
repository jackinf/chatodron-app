import { Theme } from '@material-ui/core';
import { StyleRules } from '@material-ui/core/styles';

const styles = (theme: Theme): StyleRules => ({
  wrapper: {
    display: "flex",
    minHeight: "95vh",
    flexDirection: "column"
  },

  mainWrapper: {
    flex: 1
  },

  footerWrapper: {
    height: theme.spacing.unit * 7
  },
});

export default styles;