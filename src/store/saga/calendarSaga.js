import { call, put, takeEvery } from 'redux-saga/effects';
import {
  FETCH_EVENTS_REQUEST,
  // FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILURE,
} from '../constants/calendarConstants';



function* fetchEvents() {
  try {
    // const events = yield call(fetchEventsApi);
    // yield put({ type: FETCH_EVENTS_SUCCESS, payload: events });
  } catch (error) {
    yield put({ type: FETCH_EVENTS_FAILURE, payload: error.message });
  }
}

export default function* calendarSaga() {
  yield takeEvery(FETCH_EVENTS_REQUEST, fetchEvents);
}
