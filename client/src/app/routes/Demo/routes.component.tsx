import * as React from 'react';
import AsyncComponent from "../../../helpers/AsyncComponent";
import {Route} from "react-router-dom";

export default () => (
  <Route path={'/demo'} component={AsyncComponent(async () => await import('./Demo.component'))}/>
);
