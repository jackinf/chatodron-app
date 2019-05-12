import * as React from 'react';
import { StyleRules, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/List';
import LocationOnIcon from '@material-ui/icons/Settings';
import {RouteComponentProps, withRouter} from "react-router-dom";
import mapPathnameToValue from './mapPathnameToValue';
import { Labels, PathPrefixes } from './constants';

const styles = (theme: Theme): StyleRules => ({
  footer: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    height: theme.spacing.unit * 7
  }
});

function Footer(props: WithStyles<typeof styles> & RouteComponentProps<{}>) {
  const { classes, location } = props;
  const value = mapPathnameToValue(location.pathname);

  return (
    <footer className={classes && classes.footer}>
      <BottomNavigation value={value} showLabels>
        <BottomNavigationAction
          label={Labels.Home}
          icon={<RestoreIcon />}
          onClick={() => props.history.push(PathPrefixes.Home)}
        />
        <BottomNavigationAction
          label={Labels.Rooms}
          icon={<FavoriteIcon />}
          onClick={() => props.history.push(PathPrefixes.Rooms)}
        />
        <BottomNavigationAction
          label={Labels.Demos}
          icon={<LocationOnIcon />}
          onClick={() => props.history.push(PathPrefixes.Demo)}
        />
      </BottomNavigation>
    </footer>
  );
}

export default withStyles(styles)(withRouter(Footer));
