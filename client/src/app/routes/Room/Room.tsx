import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from "react-router";
import FormGroup from '@material-ui/core/FormGroup';
import {withRouter} from "react-router";
import withStyles, { StyleRules, WithStyles } from '@material-ui/core/styles/withStyles';
import {TextField, Theme} from "@material-ui/core";
import Button from "@material-ui/core/Button";

import {
  start,
  submit
} from './actions/updateSingle';
import {REDUCER_NAME__ROOM} from "./reducer";
import Centered from '../../../components/Centered';
import { roomRoutes } from '../constants';

function mapStateToProps(state: any) {
  const { loading, item } = state[REDUCER_NAME__ROOM];
  return { loading, item };
}
const mapDispatchToProps = { start, submit };

const styles = (theme: Theme): StyleRules => ({
  container: {
    margin: theme.spacing.unit * 2
  },
  button: {
    margin: theme.spacing.unit
  },
});

interface RoomUpdateProps {
  start: (id: string, onSuccess: () => void) => void,
  loading: boolean,
  item?: any,
}
type Props = RoomUpdateProps & RouteComponentProps<{ id: string }> & WithStyles<typeof styles>;
function Room(props: Props) {
  const { start, match, history, loading, item, classes } = props;

  useEffect(() => {
    start(match.params.id, () => {});
  }, []);

  const handleGoToChatPage = () => history.push(roomRoutes.chat(match.params.id));
  const handleGoToUpdatePage = () => history.push(roomRoutes.edit(match.params.id));

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
              value={item.name}
              disabled={true}
              className={classes && classes.textField}
              margin="normal"
              variant="outlined"
            />
          </FormGroup>

          <Button variant="outlined" color="primary" className={classes && classes.button} onClick={handleGoToChatPage}>
            Start chatting
          </Button>
          <Button variant="outlined" color="primary" className={classes && classes.button} onClick={handleGoToUpdatePage}>
            Start editing
          </Button>
        </form>
      </Centered>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(Room)));
