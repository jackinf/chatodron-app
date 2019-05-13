import * as React from 'react';
import Grid from "@material-ui/core/Grid";
import withStyles, {WithStyles} from "@material-ui/core/styles/withStyles";
import { Theme } from '@material-ui/core';

const styles = (theme: Theme) => ({
  main: {
  },
});
interface Props extends WithStyles<typeof styles> {
  children: JSX.Element[] | JSX.Element;
}

function Centered(props: Props)  {
  const { classes, children } = props;

  return (
    <Grid container className={classes.main} justify="center" spacing={16}>
      <Grid item xs={12} md={6}>
        {children}
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(Centered);
