import * as React from 'react';
import {StyledComponentProps, StyleRules, Theme, withStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/List';
import LocationOnIcon from '@material-ui/icons/Settings';
import {RouteComponentProps, withRouter} from "react-router-dom";

class Footer extends React.Component<StyledComponentProps & RouteComponentProps<any>> {
  state = {
    value: 0,
  };

  handleChange = (event: React.ChangeEvent<{}>, value: any) => this.setState({ value });

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <footer className={classes && classes.footer}>
        <BottomNavigation
          value={value}
          onChange={this.handleChange}
          showLabels
        >
          <BottomNavigationAction label="Home" icon={<RestoreIcon />} onClick={() => this.props.history.push("/")} />
          <BottomNavigationAction label="Rooms" icon={<FavoriteIcon />} onClick={() => this.props.history.push("/rooms")} />
          <BottomNavigationAction label="Settings" icon={<LocationOnIcon />} onClick={() => this.props.history.push("/settings")} />
        </BottomNavigation>
      </footer>
    )
  }
};

export default withStyles((theme: Theme): StyleRules => ({
  footer: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    height: theme.spacing.unit * 7
  }
}))(withRouter(Footer));
