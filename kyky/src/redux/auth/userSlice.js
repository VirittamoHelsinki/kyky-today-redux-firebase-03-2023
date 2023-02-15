import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase/firebase';

/* create an email hash for the slug, f.ex "john-smith-1547289902" */
const hashCode = (s) => s.split('').reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0);

export const signUpEmailAndPassword = createAsyncThunk(
  'user/signUpEmailAndPassword',
  async ({ username, email, password, company, subscribe }) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      const slug = username.replace(/\W+/g, '-').toLowerCase() + '-' + hashCode(email);
      await setDoc(doc(db, 'users', user.uid, 'data', 'userdata'), {
        uid: user.uid,
        username: username,
        email: email,
        company: company,
        subscribe: subscribe,
        authProvider: 'local',
        slug: slug
      });
      await updateProfile(user, {
        photoURL: 'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp',
        displayName: username
      });
      await setDoc(doc(db, 'slugs', slug), {
        uid: user.uid,
        name: username,
        photoURL: 'https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=mp'
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
      const docSnap = await getDoc(doc(db, 'users', res.user.uid, 'data', 'userdata'));
      return { ...res.user, slug: docSnap.data().slug };
    } catch (error) {
      return error;
    }
  }
);

export const recoverPasswordResetEmail = createAsyncThunk(
  'user/recoverPasswordResetEmail',
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
      const user = res.user;
      /* if user has logged in before... */
      const docSnap = await getDoc(doc(db, 'users', user.uid, 'data', 'userdata'));
      if (docSnap.exists()) {
        return { ...res.user, slug: docSnap.data().slug };
      }
      /* ...and if not has logged in */
      const slug = user.displayName.replace(/\W+/g, '-').toLowerCase() + '-' + hashCode(user.email);
      await setDoc(doc(db, 'users', user.uid, 'data', 'userdata'), {
        uid: user.uid,
        username: user.displayName,
        email: user.email,
        authProvider: 'Google',
        slug: slug
      });
      await setDoc(doc(db, 'slugs', slug), {
        uid: user.uid,
        name: user.displayName,
        photoURL: user.photoURL
      });
      return { ...res.user, slug: slug };
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
