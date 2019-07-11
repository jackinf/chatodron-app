import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {AuthConsumer} from './AuthContext';
import { LoginProps } from './types';
import styles from './styles';

function SignIn(props: LoginProps) {
  const {classes} = props;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AuthConsumer>
      {({loggedIn, login, logout}) => {
        if (loggedIn) {
          return (
            <div>
              You are logged in.
              <Button variant="contained" color="primary" onClick={logout}>
                Log out
              </Button>
            </div>
          );
        }

        return (
          <main className={classes.main}>
            <CssBaseline/>
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockIcon/>
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form} onSubmit={async e => {
                e.preventDefault();
                await login(username, password);
              }}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Email Address</InputLabel>
                  <Input id="email" name="email" autoComplete="email" autoFocus
                         onChange={e => setUsername(e.target.value)}/>
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input name="password" type="password" id="password" autoComplete="current-password"
                         onChange={e => setPassword(e.target.value)}/>
                </FormControl>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary"/>}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign in
                </Button>
              </form>
            </Paper>
          </main>
        );

      }}
    </AuthConsumer>
  );
}

export default withStyles(styles)(SignIn);