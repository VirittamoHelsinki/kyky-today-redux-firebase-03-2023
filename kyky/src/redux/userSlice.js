import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebase/firebase';

export const signUpEmailAndPassword = createAsyncThunk(
  'user/signUpEmailAndPassword',
  async (payload) => {
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
      await sendEmailVerification(auth.currentUser);
      alert('A verification link is sent to your email!');
      return user;
    } catch (error) {
      return error;
    }
  }
);

export const signInEmailAndPassword = createAsyncThunk(
  'user/signInEmailAndPassword',
  async (payload) => {
    try {
      const res = await signInWithEmailAndPassword(auth, payload.email, payload.password);
      if (res.uid && !res.emailVerified) {
        const confirm = window.confirm(
          'Please verify your email address\n\nPress OK to send a new verification link to your email'
        );
        if (confirm) {
          await sendEmailVerification(auth.currentUser);
          alert('A new verification link is sent to your email!');
        }
      }
      return res;
    } catch (error) {
      return error;
    }
  }
);

export const recoverPasswordResetEmail = createAsyncThunk(
  'user/sendPasswordResetEmail',
  async (payload) => {
    try {
      const res = await sendPasswordResetEmail(auth, payload);
      return res;
    } catch (error) {
      return error;
    }
  }
);

export const signInGoogleAuthProvider = createAsyncThunk(
  'user/signInGoogleAuthProvider',
  async () => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      return res;
    } catch (error) {
      return error;
    }
  }
);

export const signInFacebookAuthProvider = createAsyncThunk(
  'user/signInFacebookAuthProvider',
  async () => {
    try {
      const provider = new FacebookAuthProvider();
      const res = await signInWithPopup(auth, provider);
      return res;
    } catch (error) {
      return error;
    }
  }
);

export const signInAppleAuthProvider = createAsyncThunk(
  'user/signInAppleAuthProvider',
  async () => {
    try {
      const provider = new OAuthProvider('apple.com');
      const res = await signInWithPopup(auth, provider);
      return res;
    } catch (error) {
      return error;
    }
  }
);

export const logOut = createAsyncThunk('user/logOut', async () => {
  try {
    const res = signOut(auth);
    return res;
  } catch (error) {
    return error;
  }
});

// createAsyncThunk() generates automatically pending -, fulfilled - and rejected handling cases
export const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpEmailAndPassword.fulfilled, (state, action) => {
        localStorage.setItem('user', JSON.stringify(action.payload));
        return (state = {
          ...state,
          user: action.payload
        });
      })
      .addCase(signInEmailAndPassword.fulfilled, (state, action) => {
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        return (state = {
          ...state,
          user: action.payload.user
        });
      })
      .addCase(signInGoogleAuthProvider.fulfilled, (state, action) => {
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        return (state = {
          ...state,
          user: action.payload.user
        });
      })
      .addCase(signInFacebookAuthProvider.fulfilled, (state, action) => {
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        return (state = {
          ...state,
          user: action.payload.user
        });
      })
      .addCase(signInAppleAuthProvider.fulfilled, (state, action) => {
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        return (state = {
          ...state,
          user: action.payload.user
        });
      })
      .addCase(logOut.fulfilled, (state, action) => {
        console.log(state, action);
        localStorage.removeItem('user');
        return (state = {
          ...state,
          user: null
        });
      });
  }
});

export default userSlice.reducer;
