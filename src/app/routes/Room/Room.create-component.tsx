import React, {Component} from 'react';
import {connect} from 'react-redux';
import FormGroup from '@material-ui/core/FormGroup';

import createSingle from './actions/Room.create-single.actions';
import {StyledComponentProps, TextField, Theme} from "@material-ui/core";
import withStyles, {StyleRules} from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import {RouteComponentProps, withRouter} from "react-router-dom";

export const roomFormName = "room-create-form";
export interface RoomCreateState { name: string }

const style = (theme: Theme): StyleRules => ({
  container: {
    margin: theme.spacing.unit * 2
  },
  button: {
    margin: theme.spacing.unit
  },
});

function mapStateToProps(state: any) {
  return {};
}
// noinspection JSUnusedGlobalSymbols
const mapDispatchToProps = { createSingle };

interface RoomCreateProps { createSingle: Function }
class RoomCreate extends Component<RoomCreateProps & StyledComponentProps & RouteComponentProps<any>, RoomCreateState> {
  handleAdd = () => this.props.createSingle({ ...this.state }, () => this.props.history.push("/rooms"));

  render() {
    const { classes } = this.props;

    return (
      <form className={classes && classes.container} noValidate autoComplete="off">
        <FormGroup row={true}>
          <TextField
            required
            id="outlined-required"
            label="Name"
            className={classes && classes.textField}
            margin="normal"
            onChange={e => this.setState({ name: e.target.value })}
            variant="outlined"
          />
        </FormGroup>

        <Button variant="outlined" color="secondary" className={classes && classes.button} onClick={this.handleAdd}>
          Add
        </Button>
      </form>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(withRouter(RoomCreate)));
