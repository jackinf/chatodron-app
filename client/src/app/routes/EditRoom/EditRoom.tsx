import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import FormGroup from '@material-ui/core/FormGroup';
import {withRouter} from "react-router";
import withStyles from "@material-ui/core/styles/withStyles";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";

import {
  start,
  submit
} from './actions/updateSingle';
import Centered from '../../components/Centered';
import { roomRoutes } from '../../constants';
import { FormValues, Props } from './types';
import styles from './styles';
import { REDUCER_NAME__EDIT_ROOM } from './reducer';

function mapStateToProps(state: any) {
  const { loading, item } = state[REDUCER_NAME__EDIT_ROOM];
  return { loading, item };
}
const mapDispatchToProps = { start, submit };

function EditRoom(props: Props) {
  const { start, loading, item, classes, history, match, submit } = props;

  const [formValues, setFormValues] = useState<FormValues>({ name: '' });
  useEffect(() => {
    start(match.params.id);
  }, []);

  const handleGoToViewPage = () => history.push(roomRoutes.view(match.params.id));
  const handleUpdate = () => formValues.name && submit(match.params.id, {...formValues}, async () => await handleGoToViewPage());

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
            className={classes && classes.textField}
            margin="normal"
            onChange={(e: any) => setFormValues({ name: e.target.value })}
            variant="outlined"
          />
        </FormGroup>

        <Button variant="outlined" color="primary" className={classes && classes.button} onClick={handleGoToViewPage}>
          Back
        </Button>
        <Button variant="outlined" color="secondary" className={classes && classes.button} onClick={handleUpdate}>
          Update
        </Button>
      </form>
    </Centered>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(EditRoom)));
