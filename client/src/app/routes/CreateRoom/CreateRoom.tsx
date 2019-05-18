import React, { ChangeEvent, useState } from 'react';
import { connect } from 'react-redux';
import FormGroup from '@material-ui/core/FormGroup';
import { TextField } from '@material-ui/core';
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";

import createSingle from './actions/createSingle';
import Centered from '../../components/Centered';
import { CreateRoomProps, FormValues } from './types';
import style from './style';

function CreateRoom(props: CreateRoomProps) {
  const [formValues, setFormValues] = useState<FormValues>({ name: '' });

  const handleAdd = () => props.createSingle({ ...formValues }, () => props.history.push("/rooms"));

  const { classes } = props;

  return (
    <Centered>
      <form className={classes && classes.container} noValidate autoComplete="off">
        <FormGroup row={true}>
          <TextField
            required
            id="outlined-required"
            label="Name"
            className={classes && classes.textField}
            margin="normal"
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setFormValues({ ...formValues, name: e.target.value })}
            variant="outlined"
          />
        </FormGroup>

        <Button variant="outlined" color="secondary" className={classes && classes.button} onClick={handleAdd}>
          Add
        </Button>
      </form>
    </Centered>
  );
}

export default connect(
  () => {},
  { createSingle }
)(withStyles(style)(withRouter(CreateRoom)));
