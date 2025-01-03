import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default: localStorage for web
import calendarReducer from './reducers/calendarReducer';
import calendarSaga from './saga/calendarSaga';

// Redux Persist configuration
const persistConfig = {
  key: 'root', // Key for localStorage
  storage, // Use localStorage for persistence
  whitelist: ['calendar'], // Persist only the calendar reducer
};

// Combine reducers
const rootReducer = combineReducers({
  calendar: calendarReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create the Redux store with persisted reducer and saga middleware
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

// Run the saga middleware
sagaMiddleware.run(calendarSaga);

// Create a persistor for persisting the store
const persistor = persistStore(store);

export { store, persistor };
