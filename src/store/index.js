import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import calendarReducer from './reducers/calendarReducer';
import calendarSaga from './saga/calendarSaga';

const rootReducer = combineReducers({
  calendar: calendarReducer,
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(calendarSaga);

export default store;
