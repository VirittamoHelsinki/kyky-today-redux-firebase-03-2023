import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addDoc, doc, setDoc, collection, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

const initialChat = {
  messages: []
};

/* by calling the addDoc() method Firestore auto-generates an ID for the chat log, also generates 
references for both chatters with a chat log id, name and photo and store it to their users/chats path */
export const createContact = createAsyncThunk('contact/createContact', async (payload) => {
  try {
    const docSnap = await getDoc(doc(db, 'users', payload.myUid, 'chats', payload.contactUid));
    if (docSnap.exists()) {
      return docSnap.data();
    }
    const chatRef = await addDoc(collection(db, 'chatlogs'), initialChat);
    await setDoc(doc(db, 'users', payload.myUid, 'chats', payload.contactUid), {
      chatId: chatRef.id,
      name: payload.contactName,
      photoURL: payload.contactPhotoURL
    });

    await setDoc(doc(db, 'users', payload.contactUid, 'chats', payload.myUid), {
      chatId: chatRef.id,
      name: payload.myName,
      photoURL: payload.myPhotoURL
    });
    return {
      chatId: chatRef.id,
      name: payload.contactName,
      photoURL: payload.contactPhotoURL
    };
  } catch (error) {
    return error;
  }
});

/* fetch contacts from firestore, push to the list and return the list */
export const fetchContacts = createAsyncThunk('contact/fetchContacts', async (payload) => {
  try {
    const documents = [];
    const snap = await getDocs(collection(db, 'users', payload, 'chats'));
    snap.docs.map((doc) => {
      documents.push(doc.data());
    });
    return documents;
  } catch (error) {
    return error;
  }
});

const initialState = {
  contacts: []
};

export const contactSlice = createSlice({
  name: 'contact',
  initialState: initialState,
  reducers: {
    resetContact() {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createContact.fulfilled, (state, action) => {
        const new_contacts = [...state.contacts, action.payload];
        return (state = {
          ...state,
          contacts: new_contacts
        });
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        return (state = {
          ...state,
          contacts: action.payload
        });
      });
  }
});

export const { resetContact } = contactSlice.actions;
export default contactSlice.reducer;
