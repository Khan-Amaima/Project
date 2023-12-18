// src/store/configureStore.js
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/index';
import { watchShowMessage } from './sagas/someSaga';
import { createLogger } from 'redux-logger'; // Import createLogger

// const sagaMiddleware = createSagaMiddleware();

const loggerMiddleware = createLogger();
const store = createStore(
  rootReducer,
  applyMiddleware(loggerMiddleware)
  // applyMiddleware(sagaMiddleware)
);

// sagaMiddleware.run(watchShowMessage);

export default store;
