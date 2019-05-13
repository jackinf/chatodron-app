import { PathPrefixes, TabValues } from './constants';

export default function mapPathnameToValue(pathname: string) {
  if (pathname.startsWith(PathPrefixes.Rooms)) {
    return TabValues.Rooms;
  }

  if (pathname.startsWith(PathPrefixes.Demo)) {
    return TabValues.Demo;
  }

  return TabValues.Home;
}