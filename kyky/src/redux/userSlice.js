import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebase/firebase';

export const signUpEmailAndPassword = createAsyncThunk('user/signUp', async (payload) => {
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

export const signInEmailAndPassword = createAsyncThunk('user/signIn', async (payload) => {
  try {
    console.log(payload);
    const res = await signInWithEmailAndPassword(auth, payload.email, payload.password);
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const logOut = createAsyncThunk('user/logOut', async () => {
  try {
    const res = signOut(auth);
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpEmailAndPassword.pending, (state, action) => {
        console.log(state, action);
      })
      .addCase(signUpEmailAndPassword.fulfilled, (state, action) => {
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        return (state = {
          ...state,
          user: action.payload.user
        });
      })
      .addCase(signUpEmailAndPassword.rejected, (state, action) => {
        console.log(state, action);
      })

      .addCase(signInEmailAndPassword.pending, (state, action) => {
        console.log(state, action);
      })
      .addCase(signInEmailAndPassword.fulfilled, (state, action) => {
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        return (state = {
          ...state,
          user: action.payload.user
        });
      })
      .addCase(signInEmailAndPassword.rejected, (state, action) => {
        console.log(state, action);
      })

      .addCase(logOut.pending, (state, action) => {
        console.log(state, action);
      })
      .addCase(logOut.fulfilled, (state, action) => {
        console.log(state, action);
        localStorage.removeItem('user');
        return (state = {
          ...state,
          user: null
        });
      })
      .addCase(logOut.rejected, (state, action) => {
        console.log(state, action);
      });
  }
});

export default userSlice.reducer;
