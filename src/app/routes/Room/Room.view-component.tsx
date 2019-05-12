import React, {Component} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from "react-router";
import FormGroup from '@material-ui/core/FormGroup';
import {withRouter} from "react-router";
import withStyles, {StyledComponentProps, StyleRules} from "@material-ui/core/styles/withStyles";
import {TextField, Theme} from "@material-ui/core";
import Button from "@material-ui/core/Button";

import {
  start,
  submit
} from './actions/Room.udpate-single.actions';
import {REDUCER_NAME__ROOM} from "./Room.reducer";
import Centered from '../../../components/Centered';

function mapStateToProps(state: any) {
  const { loading, item } = state[REDUCER_NAME__ROOM];
  return { loading, item };
}
const mapDispatchToProps = { start, submit };

interface RoomUpdateProps { start: Function, loading: boolean, item?: any }
export interface RoomUpdateState { name: string }

class RoomView extends Component<RoomUpdateProps & RouteComponentProps<{ id: string }> & StyledComponentProps, RoomUpdateState> {
  async componentDidMount() {
    await this.load();
  }

  load = async () => await this.props.start(this.props.match.params.id);
  goToChatPage = () => this.props.history.push(`/rooms/${this.props.match.params.id}/chat`);
  goToUpdatePage = () => this.props.history.push(`/rooms/${this.props.match.params.id}/edit`);

  render() {
    const { loading, item, classes } = this.props;

    if (loading || !item) {
      return <div>Loading</div>
    }

    return (
      <Centered>
        <form className={classes && classes.container} noValidate autoComplete="off">
          <FormGroup row={true}>
            <TextField
              required
              id="outlined-required"
              label="Name"
              defaultValue={item.name}
              disabled={true}
              className={classes && classes.textField}
              margin="normal"
              onChange={e => this.setState({ name: e.target.value })}
              variant="outlined"
            />
          </FormGroup>

          <Button variant="outlined" color="primary" className={classes && classes.button} onClick={this.goToChatPage}>
            Start chatting
          </Button>
          <Button variant="outlined" color="primary" className={classes && classes.button} onClick={this.goToUpdatePage}>
            Start editing
          </Button>
        </form>
      </Centered>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles((theme: Theme): StyleRules => ({
  container: {
    margin: theme.spacing.unit * 2
  },
  button: {
    margin: theme.spacing.unit
  },
}))(withRouter(RoomView)));
