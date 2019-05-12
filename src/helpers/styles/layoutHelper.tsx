import { Theme } from '@material-ui/core';

export function defaultMargin(theme: Theme) {
  return {
    [theme.breakpoints.down('sm')]: {
      margin: '1rem',
    }
  };
}