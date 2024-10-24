import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import faqService from "./faqService";

// Thunks
export const getFAQs = createAsyncThunk(
  "faq/get-faqs",
  async (_, thunkAPI) => {
    try {
      return await faqService.getFAQs();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getFAQ = createAsyncThunk(
  "faq/get-faq",
  async (id, thunkAPI) => {
    try {
      return await faqService.getFAQ(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createFAQ = createAsyncThunk(
  "faq/create-faq",
  async (faqData, thunkAPI) => {
    try {
      return await faqService.createFAQ(faqData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateFAQ = createAsyncThunk(
  "faq/update-faq",
  async (faqData, thunkAPI) => {
    try {
      return await faqService.updateFAQ(faqData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteFAQ = createAsyncThunk(
  "faq/delete-faq",
  async (id, thunkAPI) => {
    try {
      return await faqService.deleteFAQ(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetFAQState = createAction("Reset_FAQ_all");

const initialState = {
  faqs: [],
  faq: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  createdFAQ: null,
};

export const faqSlice = createSlice({
  name: "faqs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFAQs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFAQs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.faqs = action.payload;
      })
      .addCase(getFAQs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message || "Failed to fetch FAQs";
      })
      .addCase(createFAQ.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFAQ.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdFAQ = action.payload;
      })
      .addCase(createFAQ.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message || "Failed to create FAQ";
      })
      .addCase(updateFAQ.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFAQ.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.faqs.findIndex(faq => faq._id === action.payload._id);
        if (index !== -1) {
          state.faqs[index] = action.payload;
        }
      })
      .addCase(updateFAQ.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteFAQ.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFAQ.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.faqs = state.faqs.filter(faq => faq._id !== action.payload);
      })
      .addCase(deleteFAQ.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getFAQ.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFAQ.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.faq = action.payload;
      })
      .addCase(getFAQ.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message || "Failed to fetch FAQ";
      })
      .addCase(resetFAQState, () => initialState);
  },
});

export default faqSlice.reducer;
