import ReactDOM from 'react-dom';
import * as React from 'react';
import {ConnectedRouter} from 'react-router-redux';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import createStore, {history} from './store';
import AppComponent from './app/App.component';
import {start} from './app/actions';
import './index.css';

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
// import 'react-select/dist/react-select.css';
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

// @ts-ignore
export const store = createStore(window['__INITIAL_STATE__']);
store.dispatch<any>(start());

class IndexComponent extends React.Component<any> {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" component={AppComponent}/>
          </Switch>
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
