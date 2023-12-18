// store/sagas/index.js
import { all } from 'redux-saga/effects';
import { watchShowMessage } from './someSaga';

export default function* rootSaga() {
  yield all([
    watchShowMessage(),
  ]);
}
