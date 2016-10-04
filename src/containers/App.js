import React, { Component } from 'react';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { Provider } from 'react-redux';

import BookShelfApp from './BookShelfApp';
import * as Reducers from '../reducers/rootReducer';
import { populateInitialStateAsync } from '../actions/actionCreators';

import { initialState } from '../data';

const rootReducer = combineReducers(Reducers);
// construct the acceptable structure for the 2nd argument of the createStore function.
// This is necessary because we are using the combineReducers function.
let createStore2ndArg = { default : initialState };
let store = null;
let middlewares = [thunk, promiseMiddleware()];
if(__DEV__) {
    store = createStore(rootReducer, createStore2ndArg, compose(
        applyMiddleware(...middlewares),
        // conditionally add the redux devTools extension enhancer if its installed
        window.devToolsExtension ? window.devToolsExtension(): f => f
    ));
} else {
    store = createStore(rootReducer, createStore2ndArg,
                        applyMiddleware(...middlewares));
}

export default class App extends Component {
  constructor(props, context) {
      super(props, context);
  }
  componentWillMount() {
      // Hint: Performing API call to populate initialState from the backend server should start
      // from the action creator. The fetched data will then be passed to the reducer.
      // https://github.com/gaearon/redux-thunk
      store.dispatch( populateInitialStateAsync() );
  }
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
