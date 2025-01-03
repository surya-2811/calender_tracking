import {
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILURE,
  ADD_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  TOGGLE_FLAG,
} from '../constants/calendarConstants';

const initialState = {
  events: [],
  loading: false,
  error: null,
};

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_EVENTS_SUCCESS:
      return { ...state, loading: false, events: action.payload };
    case FETCH_EVENTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_EVENT:
      return { ...state, events: [...state.events, action.payload] };
    case UPDATE_EVENT:
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload.id ? action.payload : event
        ),
      };
    case DELETE_EVENT:
      return { ...state, events: state.events.filter((event) => event.id !== action.payload) };
    case TOGGLE_FLAG:
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload.id ? { ...event, flag: action.payload.flag } : event
        ),
      };
    default:
      return state;
  }
};

export default calendarReducer;
