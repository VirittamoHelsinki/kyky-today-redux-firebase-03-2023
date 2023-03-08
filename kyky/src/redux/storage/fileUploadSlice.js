import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/firebase';

export const uploadImage = createAsyncThunk('fileUpload/images', async (image) => {
  try {
    const storageRef = ref(storage, `images/${image.name}`);
    await uploadBytes(storageRef, image);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    return error;
  }
});

const initialState = {
  loading: false,
  url: ''
};

export const fileUploadSlice = createSlice({
  name: 'fileUploads',
  initialState: initialState,
  reducers: {
    resetFileUpload() {
      return initialState;
    }
  },
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

export const { resetFileUpload } = fileUploadSlice.actions;
export default fileUploadSlice.reducer;
