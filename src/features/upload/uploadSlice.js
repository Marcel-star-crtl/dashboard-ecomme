import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import uploadService from "./uploadService";

// Async thunk for uploading images
export const uploadImg = createAsyncThunk(
  "upload/images",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append("images", data[i]);
      }
      return await uploadService.uploadImg(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Async thunk for deleting images
export const delImg = createAsyncThunk(
  "delete/images",
  async (id, thunkAPI) => {
    try {
      return await uploadService.deleteImg(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Action to reset upload state
export const resetUploadState = createAction("upload/resetState");

// Initial state
const initialState = {
  images: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// Slice for managing image uploads
export const uploadSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = action.payload;
      })
      .addCase(uploadImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
      })
      .addCase(delImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(delImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = state.images.filter((img) => img.public_id !== action.payload);
      })
      .addCase(delImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(resetUploadState, (state) => {
        state.images = [];
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = "";
      });
  },
});

export default uploadSlice.reducer;













// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import uploadService from "./uploadService";

// export const uploadImg = createAsyncThunk(
//   "upload/images",
//   async (data, thunkAPI) => {
//     try {
//       return await uploadService.uploadImg(data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

// export const delImg = createAsyncThunk(
//   "delete/images",
//   async (id, thunkAPI) => {
//     try {
//       return await uploadService.deleteImg(id);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

// const initialState = {
//   images: [],
//   isError: false,
//   isLoading: false,
//   isSuccess: false,
//   message: "",
// };

// export const uploadSlice = createSlice({
//   name: "images",
//   initialState,
//   reducers: {
//     clearUploadState: (state) => {
//       state.isError = false;
//       state.isSuccess = false;
//       state.isLoading = false;
//       state.message = "";
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(uploadImg.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(uploadImg.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isError = false;
//         state.isSuccess = true;
//         state.images = action.payload;
//       })
//       .addCase(uploadImg.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.isSuccess = false;
//         state.message = action.error;
//       })
//       .addCase(delImg.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(delImg.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isError = false;
//         state.isSuccess = true;
//         state.images = state.images.filter((img) => img.public_id !== action.payload);
//       })
//       .addCase(delImg.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.isSuccess = false;
//         state.message = action.payload;
//       });
//   },
// });

// export const { clearUploadState } = uploadSlice.actions;
// export default uploadSlice.reducer;