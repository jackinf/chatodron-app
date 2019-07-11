import React, { useState, useEffect } from "react";
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

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
  };

  return (
    <Provider value={{
      loggedIn,
      login: handleLogin,
      logout: handleLogout,
      initialized
    }}>
      {props.children}
    </Provider>
  )
}

export { AuthProvider, Consumer as AuthConsumer };
