import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

export const saveCalendarSettings = createAsyncThunk(
  'calendar-settings/saveCalendarSettings',
  async (payload) => {
    console.log(payload.uid);
    try {
      await setDoc(doc(db, `users/${payload.uid}/settings/calendar-settings/`), {
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
      const settings = await getDoc(doc(db, `users/${uid}/settings/calendar-settings/`));
      console.log(settings.data()[0]);
      return settings.data()[0];
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
        localStorage.setItem(`kyky-calendar_settings`, JSON.stringify(action.payload));
        return (state = {
          ...state,
          status: 'calendar-settings saved'
        });
      })
      .addCase(fetchCalendarSettings.fulfilled, (state, action) => {
        localStorage.setItem('kyky-calendar_settings', JSON.stringify(action.payload));
        return (state = {
          ...state,
          status: 'calendar-settings fetched'
        });
      });
  }
});

export const { resetCalendarSettings } = calendarSettingsSlice.actions;
export default calendarSettingsSlice.reducer;
