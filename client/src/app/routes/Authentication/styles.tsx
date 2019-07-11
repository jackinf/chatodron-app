import { Theme } from '@material-ui/core';
import { StyleRules } from '@material-ui/core/styles';

const styles = (theme: Theme): StyleRules => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    }
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    [theme.breakpoints.down('md')]: {
      margin: `${theme.spacing.unit * 8}px 0 0 0`,
      border: 'none'
    },
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing.unit * 8,
    },
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

export default styles;
