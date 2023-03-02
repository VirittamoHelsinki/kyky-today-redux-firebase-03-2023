import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

export const contactUs = createAsyncThunk('adminContacts/contactUs', async (payload) => {
  try {
    const contactRef = doc(collection(db, `contacts`));
    await setDoc(contactRef, payload);
  } catch (error) {
    return error;
  }
});

export const adminContactSlice = createSlice({
  name: 'adminContacts',
  initialState: [],
  reducers: {}
});

export default adminContactSlice.reducer;
