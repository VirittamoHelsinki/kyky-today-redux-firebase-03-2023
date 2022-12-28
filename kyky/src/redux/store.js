import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import userReducer from './auth/userSlice';
import calendarScheduleReducer from './sellers/calendarScheduleSlice';
import fileUploadReducer from './storage/fileUploadSlice';

const reducers = combineReducers({
  user: userReducer,
  schedule: calendarScheduleReducer,
  upload: fileUploadReducer
});

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
});

export default store;
