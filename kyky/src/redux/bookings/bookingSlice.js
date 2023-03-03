import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../../firebase/firebase';

export const createBooking = createAsyncThunk('bookings/createBooking', async (payload) => {
  try {
    const bookingRef = doc(collection(db, `bookings`));
    await setDoc(bookingRef, { ...payload, bookingId: bookingRef.id, created: serverTimestamp() });
  } catch (error) {
    return error;
  }
});

export const fetchBookingsByQuery = createAsyncThunk(
  'bookings/fetchBookingsByQuery',
  async (payload) => {
    try {
      const bookings = [];
      const ref = collection(db, 'bookings');
      const q = query(ref, where('sellerUid', '==', payload));
      const snap = await getDocs(q);
      snap.forEach((doc) => {
        bookings.push({ ...doc.data() });
      });
      return bookings;
    } catch (error) {
      return error;
    }
  }
);

export const fetchPurchasesByQuery = createAsyncThunk(
  'bookings/fetchPurchasesByQuery',
  async (payload) => {
    try {
      const purchases = [];
      const ref = collection(db, 'bookings');
      const q = query(ref, where('buyerUid', '==', payload));
      const snap = await getDocs(q);
      snap.forEach((doc) => {
        purchases.push({ ...doc.data() });
      });
      return purchases;
    } catch (error) {
      return error;
    }
  }
);

export const changeConfirmedStatus = createAsyncThunk(
  'bookings/changeConfirmedStatus',
  async ({ bookingId, status }) => {
    try {
      const bookingRef = doc(db, 'bookings', bookingId);
      setDoc(bookingRef, { confirmed: status }, { merge: true });
      return { status: status, bookingId: bookingId };
    } catch (error) {
      return error;
    }
  }
);

export const changeBookingStatus = createAsyncThunk(
  'bookings/changeBookingStatus',
  async ({ bookingId, status }) => {
    try {
      let timestamp = serverTimestamp();
      const bookingRef = doc(db, 'bookings', bookingId);
      setDoc(bookingRef, { status: status, operationTime: timestamp }, { merge: true });
      return { status: status, operationTime: timestamp, bookingId: bookingId };
    } catch (error) {
      return error;
    }
  }
);

const initialState = [];

export const bookingSlice = createSlice({
  name: 'bookings',
  initialState: initialState,
  reducers: {
    resetbooking() {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      /* return a state with the booking array*/
      .addCase(fetchBookingsByQuery.fulfilled, (state, action) => {
        return (state = {
          ...state,
          bookings: action.payload
        });
      })
      .addCase(fetchPurchasesByQuery.fulfilled, (state, action) => {
        return (state = {
          ...state,
          purchases: action.payload
        });
      })
      /* make a deep copy of booking state, find the right index using the booking id, change 
      the confirmed value to the status value, return the state with the modified list */
      .addCase(changeConfirmedStatus.fulfilled, (state, action) => {
        let new_bookings = JSON.parse(JSON.stringify(state.bookings));
        let index = new_bookings.findIndex((f) => f.bookingId === action.payload.bookingId);
        new_bookings[index].confirmed = action.payload.status;
        return (state = {
          ...state,
          bookings: new_bookings
        });
      })
      .addCase(changeBookingStatus.fulfilled, (state, action) => {
        let new_bookings = JSON.parse(JSON.stringify(state.bookings));
        let index = new_bookings.findIndex((f) => f.bookingId === action.payload.bookingId);
        new_bookings[index].status = action.payload.status;
        new_bookings[index].operationTime = action.payload.operationTime;
        return (state = {
          ...state,
          bookings: new_bookings
        });
      });
  }
});

export const { resetBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
