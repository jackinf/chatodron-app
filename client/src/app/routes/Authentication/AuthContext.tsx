import React, { useState, useEffect } from "react";
import firebase from 'firebase/app';

import {isLoggedIn, login, logout} from "./Auth.api";
import { AuthProviderProps } from './types';

const { Provider, Consumer } = React.createContext({
  loggedIn: false,
  login: (username: string, password: string) => Promise.resolve(), // this is a default fallback function, which does nothing
  logout: () => {},
  initialized: false
});

function AuthProvider(props: AuthProviderProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const {host} = props;

  firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
      const idToken = await user.getIdToken();
      localStorage.setItem("token", idToken);
      setLoggedIn(true);
      // User is signed in.
    } else {
      // No user is signed in.
    }
  });

  useEffect(() => {
    setLoggedIn(isLoggedIn());
    setInitialized(true);
  }, []);

  const handleLogin = async (username: string, password: string) => {
    const response = await login(host, username, password);
    if (response.token) {
      localStorage.setItem("token", response.token);
      setLoggedIn(true);
    } else {
      console.error(response.error_code, response.message);
      console.debug(response.developer_message);
    }
  };

  const handleFirebaseLogin = async (username: string, password: string) => {
    await firebase.auth().signInWithEmailAndPassword(username, password); // TODO: handle error gracefully

    // const currentUser = firebase.auth().currentUser;
    // if (!currentUser) {
    //   throw new Error("there is no user");
    // }
    // const idToken = await currentUser.getIdToken(/* forceRefresh */ false);
    // localStorage.setItem("token", idToken);
    // setLoggedIn(true);
  };

  const handleFirebaseLogout = async () => {
    try {
      await firebase.auth().signOut();
      handleLogout();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
  };

  return (
    <Provider value={{
      loggedIn,
      login: handleFirebaseLogin,
      logout: handleFirebaseLogout,
      initialized
    }}>
      {props.children}
    </Provider>
  )
}

export { AuthProvider, Consumer as AuthConsumer };
