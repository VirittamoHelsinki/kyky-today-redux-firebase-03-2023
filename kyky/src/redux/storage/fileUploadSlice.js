import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/firebase';

export const uploadImage = createAsyncThunk('fileUpload/images', async (payload) => {
  try {
    const storageRef = ref(storage, `/images/${payload.name}`);
    await uploadBytes(storageRef, payload);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    return error;
  }
});

export const fileUploadSlice = createSlice({
  name: 'fileUploads',
  initialState: {
    loading: false,
    url: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state, action) => {
        return (state = {
          ...state,
          loading: true
        });
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        return (state = {
          ...state,
          loading: false,
          url: action.payload
        });
      });
  }
});

export default fileUploadSlice.reducer;
