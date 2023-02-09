import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

/* save calendar settings to db, overwrite existing */
export const saveCalendarSettings = createAsyncThunk(
  'calendar-settings/saveCalendarSettings',
  async (payload) => {
    try {
      await setDoc(doc(db, 'users', payload.uid, 'data', 'calendar-settings'), {
        ...payload.data
      });
      return payload.data;
    } catch (error) {
      return error;
    }
  }
);

export const fetchCalendarSettings = createAsyncThunk(
  'calendar-settings/fetchCalendarSettings',
  async (uid) => {
    try {
      const settings = await getDoc(doc(db, 'users', uid, 'data', 'calendar-settings'));
      return settings.data();
    } catch (error) {
      return error;
    }
  }
);

const initialState = [];

export const calendarSettingsSlice = createSlice({
  name: 'calendar-settings',
  initialState: initialState,
  reducers: {
    resetCalendarSettings() {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveCalendarSettings.fulfilled, (state, action) => {
        return (state = {
          ...state,
          ...action.payload
        });
      })
      .addCase(fetchCalendarSettings.fulfilled, (state, action) => {
        return (state = {
          ...state,
          ...action.payload
        });
      });
  }
});

export const { resetCalendarSettings } = calendarSettingsSlice.actions;
export default calendarSettingsSlice.reducer;
