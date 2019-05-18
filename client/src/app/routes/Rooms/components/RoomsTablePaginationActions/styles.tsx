import { Theme } from '@material-ui/core';
import { StyleRules } from '@material-ui/core/styles';

const styles = (theme: Theme): StyleRules => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

export default styles;