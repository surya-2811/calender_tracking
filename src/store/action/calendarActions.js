import {
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILURE,
  ADD_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  TOGGLE_FLAG,
} from '../constants/calendarConstants';

export const fetchEventsRequest = () => ({ type: FETCH_EVENTS_REQUEST });
export const fetchEventsSuccess = (events) => ({ type: FETCH_EVENTS_SUCCESS, payload: events });
export const fetchEventsFailure = (error) => ({ type: FETCH_EVENTS_FAILURE, payload: error });

export const addEvent = (event) => ({ type: ADD_EVENT, payload: event });
export const updateEvent = (event) => ({ type: UPDATE_EVENT, payload: event });
export const deleteEvent = (id) => ({ type: DELETE_EVENT, payload: id });
export const toggleFlag = (id, flag) => ({ type: TOGGLE_FLAG, payload: { id, flag } });
