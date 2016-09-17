import React, { Component } from 'react';
import { combineReducers, createStore, compose } from 'redux';
import { Provider } from 'react-redux';

import BookShelfApp from './BookShelfApp';
import * as Reducers from '../reducers/rootReducer';

const rootReducer = combineReducers(Reducers);
let store = null;
if(__DEV__) {
    store = createStore(rootReducer, compose(
        // conditionally add the redux devTools extension enhancer if its installed
        window.devToolsExtension ? window.devToolsExtension(): f => f
    ));
} else {
    store = createStore(rootReducer);
}

export default class App extends Component {
  render() {
      return (
          <div>
            <Provider store={ store }>
                <BookShelfApp />
            </Provider>
          </div>
      );
  }
}
