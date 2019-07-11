export interface LoginProps {
  classes: any; // TODO: set type
}

export interface AuthProviderProps {
  host: string;
  children: any;
}

interface AuthContextProps {
  loggedIn: boolean;
  login?: (username: string, password: string) => Promise<void>,
  logout?: () => void,
  initialized: boolean;
}