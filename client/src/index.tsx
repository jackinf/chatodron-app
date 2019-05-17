import ReactDOM from 'react-dom';
import * as React from 'react';
import {Provider} from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'

import * as serviceWorker from './serviceWorker';
import configureStore, { history } from './createAppStore';
import AppComponent from './app/Root';
import {start} from './app/actions';
import './index.css';

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

// @ts-ignore
export const store = configureStore(window['__INITIAL_STATE__']);
store.dispatch<any>(start());

class IndexComponent extends React.Component<any> {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <>
            <Switch>
              <Route path="/" component={AppComponent}/>
            </Switch>
          </>
        </ConnectedRouter>
      </Provider>
    )
  }
}

ReactDOM.render(<IndexComponent />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
