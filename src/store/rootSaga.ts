import { all } from 'redux-saga/effects';
// import your sagas here

export default function* rootSaga() {
  yield all([
    // fork(exampleSaga),
  ]);
}
