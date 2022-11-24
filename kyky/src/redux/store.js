import { configureStore } from '@reduxjs/toolkit';
import scheduleReducer from './scheduleSlice';

export default configureStore({
  reducer: {
    schedule: scheduleReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
