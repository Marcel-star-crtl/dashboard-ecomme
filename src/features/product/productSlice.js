// import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
// import axios from "axios";
// import productService from "./productService";

// const base_url = "http://localhost:5000/api/";

// export const getProducts = createAsyncThunk(
//   "product/get-products",
//   async (_, thunkAPI) => {
//     try {
//       return await productService.getProducts();
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

// export const createProducts = createAsyncThunk(
//   "product/create-products",
//   async (productData, thunkAPI) => {
//     try {
//       const response = await axios.post(`${base_url}product/`, productData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

// export const deleteProduct = createAsyncThunk(
//   "product/delete-product",
//   async (id, thunkAPI) => {
//     try {
//       return await productService.deleteProduct(id);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

// export const resetState = createAction("Reset_all");

// const initialState = {
//   products: [],
//   isError: false,
//   isLoading: false,
//   isSuccess: false,
//   message: "",
//   createdProduct: null,
// };

// export const productSlice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getProducts.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getProducts.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isError = false;
//         state.isSuccess = true;
//         state.products = action.payload;
//       })
//       .addCase(getProducts.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.isSuccess = false;
//         state.message = action.error.message || "Failed to fetch products";
//       })
//       .addCase(createProducts.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(createProducts.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isError = false;
//         state.isSuccess = true;
//         state.createdProduct = action.payload;
//       })
//       .addCase(createProducts.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.isSuccess = false;
//         state.message = action.payload.message || "Failed to create product";
//       })
//       .addCase(deleteProduct.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(deleteProduct.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.products = state.products.filter(product => product._id !== action.payload);
//       })
//       .addCase(deleteProduct.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//       })
      
//       .addCase(resetState, () => initialState);
//   },
// });

// export default productSlice.reducer;









import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productService from "./productService";

// Thunks
export const getProducts = createAsyncThunk(
  "product/get-products",
  async (_, thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const getProduct = createAsyncThunk(
  "product/get-product",
  async (id, thunkAPI) => {
    try {
      return await productService.getProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const createProducts = createAsyncThunk(
  "product/create-products",
  async (productData, thunkAPI) => {
    try {
      return await productService.createProduct(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/update-product",
  async (productData, thunkAPI) => {
    try {
      return await productService.updateProduct(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/delete-product",
  async (id, thunkAPI) => {
    try {
      return await productService.deleteProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  products: [],
  product: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  createdProduct: null,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message || "Failed to fetch products";
      })
      .addCase(createProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdProduct = action.payload;
      })
      .addCase(createProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message || "Failed to create product";
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.products.findIndex(product => product._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = state.products.filter(product => product._id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message || "Failed to fetch product";
      })
      .addCase(resetState, () => initialState);
  },
});

export default productSlice.reducer;
