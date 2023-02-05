import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import userReducer from './auth/userSlice';
import calendarScheduleReducer from './sellers/calendarScheduleSlice';
import fileUploadReducer from './storage/fileUploadSlice';
import profileFormReducer from './sellers/profileFormSlice';
import jobFormReducer from './sellers/jobFormSlice';
import serviceBookingReducer from './buyers/serviceBookingSlice';
import contactReducer from './chat/contactSlice';
import messageReducer from './chat/messageSlice';

const reducers = combineReducers({
  user: userReducer,
  schedule: calendarScheduleReducer,
  upload: fileUploadReducer,
  profile: profileFormReducer,
  jobs: jobFormReducer,
  booking: serviceBookingReducer,
  chat: contactReducer,
  message: messageReducer
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
