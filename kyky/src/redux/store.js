import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import userReducer from './auth/userSlice';
import calendarScheduleReducer from './calendar/calendarScheduleSlice';
import calendarSettingsReducer from './calendar/calendarSettingsSlice';
import fileUploadReducer from './storage/fileUploadSlice';
import profileFormReducer from './profiles/profileSlice';
import jobReducer from './jobs/jobSlice';
import orderReducer from './orders/orderSlice';
import contactReducer from './chat/contactSlice';
import messageReducer from './chat/messageSlice';
import notificationReducer from './notifications/notificationSlice';
import adminContactReducer from './chat/adminContactSlice';
import ratingReducer from './profiles/ratingSlice';
import slugReducer from './auth/slugSlice';

const reducers = combineReducers({
  user: userReducer,
  schedule: calendarScheduleReducer,
  setting: calendarSettingsReducer,
  upload: fileUploadReducer,
  profile: profileFormReducer,
  jobs: jobReducer,
  order: orderReducer,
  chat: contactReducer,
  message: messageReducer,
  notification: notificationReducer,
  admincontact: adminContactReducer,
  rating: ratingReducer,
  slug: slugReducer
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
