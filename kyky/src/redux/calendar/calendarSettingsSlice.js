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

export const fetchOwnCalendarSettings = createAsyncThunk(
  'calendar-settings/fetchOwnCalendarSettings',
  async (uid) => {
    try {
      const settings = await getDoc(doc(db, 'users', uid, 'data', 'calendar-settings'));
      return settings.data();
    } catch (error) {
      return error;
    }
  }
);

export const fetchSellerCalendarSettings = createAsyncThunk(
  'calendar-settings/fetchSellerCalendarSettings',
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
          settings: action.payload
        });
      })
      .addCase(fetchOwnCalendarSettings.fulfilled, (state, action) => {
        return (state = {
          ...state,
          settings: action.payload
        });
      })
      .addCase(fetchSellerCalendarSettings.fulfilled, (state, action) => {
        return (state = {
          ...state,
          bookingsettings: action.payload
        });
      });
  }
});

export const { resetCalendarSettings } = calendarSettingsSlice.actions;
export default calendarSettingsSlice.reducer;
