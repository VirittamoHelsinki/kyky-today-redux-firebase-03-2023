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

export const createBooking = createAsyncThunk('orders/createBooking', async (payload) => {
  try {
    const orderRef = doc(collection(db, `orders`));
    await setDoc(orderRef, { ...payload, orderId: orderRef.id, created: serverTimestamp() });
  } catch (error) {
    return error;
  }
});

export const fetchBookingsByQuery = createAsyncThunk(
  'orders/fetchOrdersByQuery',
  async (payload) => {
    try {
      const orders = [];
      const ref = collection(db, 'orders');
      const q = query(ref, where('sellerUid', '==', payload));
      const snap = await getDocs(q);
      snap.forEach((doc) => {
        orders.push({ ...doc.data() });
      });
      return orders;
    } catch (error) {
      return error;
    }
  }
);

export const fetchPurchasesByQuery = createAsyncThunk(
  'orders/fetchPurchasesByQuery',
  async (payload) => {
    try {
      const purchases = [];
      const ref = collection(db, 'orders');
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
  'orders/changeConfirmedStatus',
  async ({ orderId, status }) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      setDoc(orderRef, { confirmed: status }, { merge: true });
      return { status: status, ordeId: orderId };
    } catch (error) {
      return error;
    }
  }
);

export const changeOrderStatus = createAsyncThunk(
  'orders/changeOrderStatus',
  async ({ orderId, status }) => {
    try {
      let timestamp = serverTimestamp();
      const orderRef = doc(db, 'orders', orderId);
      setDoc(orderRef, { status: status, activityTime: timestamp }, { merge: true });
      return { status: status, activityTime: timestamp, orderId: orderId };
    } catch (error) {
      return error;
    }
  }
);

export const rateCompletedPurchase = createAsyncThunk(
  'orders/rateCompletedPurchase',
  async ({ orderId, value }) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      setDoc(orderRef, { rating: value }, { merge: true });
      return { rating: value, orderId: orderId };
    } catch (error) {
      return error;
    }
  }
);

export const addNoteToOrder = createAsyncThunk(
  'orders/addNoteToOrder',
  async ({ orderId, note }) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      setDoc(orderRef, { note: note }, { merge: true });
      return { note: note, orderId: orderId };
    } catch (error) {
      return error;
    }
  }
);

const initialState = [];

export const orderSlice = createSlice({
  name: 'orders',
  initialState: initialState,
  reducers: {
    resetOrder() {
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
        let index = new_bookings.findIndex((f) => f.orderId === action.payload.orderId);
        new_bookings[index].confirmed = action.payload.status;
        return (state = {
          ...state,
          bookings: new_bookings
        });
      })
      .addCase(changeOrderStatus.fulfilled, (state, action) => {
        let new_bookings = JSON.parse(JSON.stringify(state.bookings));
        let index = new_bookings.findIndex((f) => f.orderId === action.payload.orderId);
        new_bookings[index].status = action.payload.status;
        new_bookings[index].activityTime = action.payload.activityTime;
        return (state = {
          ...state,
          bookings: new_bookings
        });
      })
      .addCase(rateCompletedPurchase.fulfilled, (state, action) => {
        let new_purchases = JSON.parse(JSON.stringify(state.purchases));
        let index = new_purchases.findIndex((f) => f.orderId === action.payload.orderId);
        new_purchases[index].rating = action.payload.rating;
        return (state = {
          ...state,
          purchases: new_purchases
        });
      })
      .addCase(addNoteToOrder.fulfilled, (state, action) => {
        let new_bookings = JSON.parse(JSON.stringify(state.bookings));
        let index = new_bookings.findIndex((f) => f.orderId === action.payload.orderId);
        new_bookings[index].note = action.payload.note;
        return (state = {
          ...state,
          bookings: new_bookings
        });
      });
  }
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
