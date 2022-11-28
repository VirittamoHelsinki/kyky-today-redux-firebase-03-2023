import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebase/firebase';

export const signUp = createAsyncThunk('users/signUp', async (payload) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, payload.email, payload.password);
    const user = res.user;
    await addDoc(collection(db, `users/${user.uid}/userdata`), {
      uid: user.uid,
      username: payload.username,
      email: payload.email,
      company: payload.company,
      subscribe: payload.subscribe,
      authProvider: 'local'
    });
    return user;
  } catch (error) {
    console.log(error);
  }
});

export const signIn = createAsyncThunk('users/signIn', async (payload) => {
  try {
    const res = await signInWithEmailAndPassword(auth, payload.email, payload.password);
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const logOut = createAsyncThunk('users/logOut', async () => {
  try {
    const res = signOut(auth);
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state, action) => {
        console.log(state, action);
      })
      .addCase(signUp.fulfilled, (state, action) => {
        console.log(state, action);
      })
      .addCase(signUp.rejected, (state, action) => {
        console.log(state, action);
      })

      .addCase(signIn.pending, (state, action) => {
        console.log(state, action);
      })
      .addCase(signIn.fulfilled, (state, action) => {
        console.log(state, action);
      })
      .addCase(signIn.rejected, (state, action) => {
        console.log(state, action);
      })

      .addCase(logOut.pending, (state, action) => {
        console.log(state, action);
      })
      .addCase(logOut.fulfilled, (state, action) => {
        console.log(state, action);
      })
      .addCase(logOut.rejected, (state, action) => {
        console.log(state, action);
      });
  }
});

export default userSlice.reducer;
