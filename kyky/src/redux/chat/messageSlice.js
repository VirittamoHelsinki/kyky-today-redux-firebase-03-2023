import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

/* add messages to the firestore with the spread operator */
export const addMessage = createAsyncThunk('message/addMessage', async (payload) => {
  try {
    await setDoc(doc(db, `chatlogs/${payload.chatId}`), {
      ...payload.data
    });
    return payload.data;
  } catch (error) {
    return error;
  }
});

/* loops message objects from the data() object to the list until data()[i] is undefined */
export const fetchMessages = createAsyncThunk('message/fetchMessages', async (payload) => {
  try {
    const messages = [];
    const docSnap = await getDoc(doc(db, `chatlogs/${payload}`));
    let i = 0;
    while (docSnap.data()[i]) {
      messages.push(docSnap.data()[i]);
      i++;
    }
    return messages;
  } catch (error) {
    return error;
  }
});

const initialState = [];

export const messageSlice = createSlice({
  name: 'message',
  initialState: initialState,
  reducers: {
    resetMessage() {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addMessage.fulfilled, (state, action) => {
        return (state = {
          ...state,
          messages: action.payload
        });
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        return (state = {
          ...state,
          messages: action.payload
        });
      });
  }
});

export const { resetMessage } = messageSlice.actions;
export default messageSlice.reducer;
