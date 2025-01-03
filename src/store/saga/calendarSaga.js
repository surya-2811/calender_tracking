import { call, put, takeEvery } from 'redux-saga/effects';
import {
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILURE,
} from '../constants/calendarConstants';

// Mock API call
const fetchEventsApi = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'Email with Company A',
          date: '2024-12-01',
          status: 'completed',
          details: {
            name: 'Company A',
            location: 'New York',
            linkedIn: 'https://linkedin.com/company-a',
            emails: 'contact@companya.com',
            phoneNumbers: '1234567890',
            comments: 'Discuss contract terms.',
            periodicity: 'Monthly',
          },
        },
      ]);
    }, 1000)
  );

function* fetchEvents() {
  try {
    const events = yield call(fetchEventsApi);
    // yield put({ type: FETCH_EVENTS_SUCCESS, payload: events });
  } catch (error) {
    yield put({ type: FETCH_EVENTS_FAILURE, payload: error.message });
  }
}

export default function* calendarSaga() {
  yield takeEvery(FETCH_EVENTS_REQUEST, fetchEvents);
}
