import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authServices";

const getUserfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

  const initialState = {
    user: getUserfromLocalStorage,
    orders: [],
    orderbyuser: [],
    totalIncome: 0,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  };

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrders = createAsyncThunk(
  "orders/get-orders",
  async (_, thunkAPI) => {
    try {
      return await authService.getOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// export const getOrderByUser = createAsyncThunk(
//   "auth/get-orders",
//   async (id, thunkAPI) => {
//     try {
//       return await authService.getOrder(id);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

export const getOrderById = createAsyncThunk(
  "auth/get-order-by-id",
  async (orderId, thunkAPI) => {
    try {
      return await authService.getOrderById(orderId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "order/update-status",
  async ({ orderId, status }, thunkAPI) => {
    try {
      const dispatchedAt = status === 'Dispatched' ? new Date().toISOString() : undefined;
      const expectedDeliveryAt = status === 'Dispatched' ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() : undefined;

      const response = await authService.updateOrderStatus({ orderId, status, dispatchedAt, expectedDeliveryAt });
      console.log("API response in updateOrderStatus action:", response);
      return response;
    } catch (error) {
      console.error("API error in updateOrderStatus action:", error.response ? error.response.data : error.message);
      return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);




export const confirmDelivery = createAsyncThunk(
  "auth/confirmDelivery",
  async ({ orderId, confirmationCode }, thunkAPI) => {
    try {
      return await authService.confirmDelivery(orderId, confirmationCode);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTotalIncome = createAsyncThunk(
  "order/getTotalIncome",
  async (_, thunkAPI) => {
    try {
      const totalIncome = await authService.getTotalIncome();
      console.log("Total income in action:", totalIncome);
      return totalIncome;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
        state.message = "success";
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      // .addCase(getOrderByUser.pending, (state) => {
      //   state.isLoading = true;
      // })
      // // .addCase(getOrderByUser.fulfilled, (state, action) => {
      // //   state.isError = false;
      // //   state.isLoading = false;
      // //   state.isSuccess = true;
      // //   state.orderbyuser = action.payload;
      // //   state.message = "success";
      // // })
      // .addCase(getOrderByUser.fulfilled, (state, action) => {
      //   state.orderbyuser = action.payload;
      //   state.isError = false;
      //   state.isLoading = false;
      //   state.isSuccess = true;
      // })
      // .addCase(getOrderByUser.rejected, (state, action) => {
      //   state.isError = true;
      //   state.isSuccess = false;
      //   state.message = action.error;
      //   state.isLoading = false;
      // })
      .addCase(getOrderById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.orderbyuser = [action.payload];
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log("Updating order in reducer:", action.payload);
        state.orders = state.orders.map(order => 
          order._id === action.payload.orderId ? 
          { 
            ...order, 
            orderStatus: action.payload.status, 
            dispatchedAt: action.payload.dispatchedAt,
            expectedDeliveryAt: action.payload.expectedDeliveryAt
          } : order
        );
      })
      
      .addCase(confirmDelivery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = state.orders.map(order => 
          order._id === action.payload.orderId ? 
          { ...order, 
            deliveryConfirmed: true, 
            deliveredAt: action.payload.deliveredAt,
            orderStatus: "Delivered"
          } : order
        );
        const userOrderIndex = state.orderbyuser.findIndex(order => order._id === action.payload.orderId);
        if (userOrderIndex !== -1) {
          state.orderbyuser[userOrderIndex] = {
            ...state.orderbyuser[userOrderIndex],
            deliveryConfirmed: true,
            deliveredAt: action.payload.deliveredAt,
            orderStatus: "Delivered"
          };
        }
      })
      .addCase(confirmDelivery.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.error;
      })

      .addCase(getTotalIncome.pending, (state) => {
        state.isLoading = true;
      })
      // .addCase(getTotalIncome.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isSuccess = true;
      //   state.totalIncome = action.payload;
      // })
      .addCase(getTotalIncome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.totalIncome = Number(action.payload) || 0;
        console.log("Total income in reducer:", state.totalIncome);
      })
      .addCase(getTotalIncome.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default authSlice.reducer;