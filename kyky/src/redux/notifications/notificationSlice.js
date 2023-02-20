import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

function generate_random_string(string_length) {
  let random_string = '';
  let random_ascii;
  for (let i = 0; i < string_length; i++) {
    random_ascii = Math.floor(Math.random() * 25 + 97);
    random_string += String.fromCharCode(random_ascii);
  }
  return random_string;
}

export const addNotification = createAsyncThunk(
  'notifications/addNotification',
  async ({ uid, notification }) => {
    try {
      notification['id'] = generate_random_string(5);
      const notifications = [];
      const docSnap = await getDoc(doc(db, 'users', uid, 'data', 'notifications'));
      if (docSnap.exists()) {
        let i = 0;
        while (docSnap.data()[i]) {
          notifications.push(docSnap.data()[i]);
          i++;
        }
      }
      notifications.push(notification);
      await setDoc(doc(db, 'users', uid, 'data', 'notifications'), {
        ...notifications
      });
    } catch (error) {
      return error;
    }
  }
);

export const updateNotifications = createAsyncThunk(
  'notifications/updateNotifications',
  async ({ uid, notifications }) => {
    try {
      console.log(notifications);
      await setDoc(doc(db, 'users', uid, 'data', 'notifications'), {
        ...notifications
      });
      return notifications;
    } catch (error) {
      return error;
    }
  }
);

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (uid) => {
    try {
      const notifications = [];
      const docSnap = await getDoc(doc(db, 'users', uid, 'data', 'notifications'));
      let i = 0;
      while (docSnap.data()[i]) {
        notifications.push(docSnap.data()[i]);
        i++;
      }
      return notifications;
    } catch (error) {
      return error;
    }
  }
);

const initialState = [];

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState: initialState,
  reducers: {
    resetNotifications() {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateNotifications.fulfilled, (state, action) => {
        console.log(action.payload);
        return (state = {
          ...state,
          notifications: action.payload
        });
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        return (state = {
          ...state,
          notifications: action.payload
        });
      });
  }
});

export const { resetNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
