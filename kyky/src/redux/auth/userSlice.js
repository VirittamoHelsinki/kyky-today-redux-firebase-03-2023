import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  updateProfile,
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
import { db, auth } from '../../firebase/firebase';

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
      await updateProfile(user, {
        photoURL: 'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp',
        displayName: payload.username
      });
      // await sendEmailVerification(auth.currentUser);
      // alert('A verification link is sent to your email!');
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
      // if (res.user.uid && !res.user.emailVerified) {
      //   const confirm = window.confirm(
      //     'Please verify your email address\n\nPress OK to send a new verification link to your email'
      //   );
      //   if (confirm) {
      //     await sendEmailVerification(auth.currentUser);
      //     alert('A new verification link is sent to your email!');
      //   }
      // }
      return res.user;
    } catch (error) {
      return error;
    }
  }
);

export const recoverPasswordResetEmail = createAsyncThunk(
  'user/srecoverPasswordResetEmail',
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
      return res.user;
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

const initialState = {};

// createAsyncThunk() generates automatically pending -, fulfilled - and rejected handling cases
export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpEmailAndPassword.fulfilled, (state, action) => {
        localStorage.setItem('user', JSON.stringify(action.payload));
        return (state = {
          ...state,
          ...action.payload
        });
      })
      .addCase(signInEmailAndPassword.fulfilled, (state, action) => {
        localStorage.setItem('user', JSON.stringify(action.payload));
        return (state = {
          ...state,
          ...action.payload
        });
      })
      .addCase(signInGoogleAuthProvider.fulfilled, (state, action) => {
        localStorage.setItem('user', JSON.stringify(action.payload));
        return (state = {
          ...state,
          ...action.payload
        });
      })
      .addCase(signInFacebookAuthProvider.fulfilled, (state, action) => {
        localStorage.setItem('user', JSON.stringify(action.payload));
        return (state = {
          ...state,
          ...action.payload
        });
      })
      .addCase(signInAppleAuthProvider.fulfilled, (state, action) => {
        localStorage.setItem('user', JSON.stringify(action.payload));
        return (state = {
          ...state,
          ...action.payload
        });
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state = initialState;
        localStorage.removeItem('user');
        return (state = {
          ...state
        });
      });
  }
});

export default userSlice.reducer;
