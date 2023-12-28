// src/store/configureStore.js
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/index';
import { watchShowMessage } from './sagas/someSaga';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage,
};
const loggerMiddleware = createLogger();
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  applyMiddleware(loggerMiddleware)
  // applyMiddleware(sagaMiddleware)
);

// sagaMiddleware.run(watchShowMessage);

export const persistor = persistStore(store);
export default store;
