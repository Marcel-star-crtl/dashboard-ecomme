import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authServices"; 

// Retrieve user from localStorage once when the slice initializes
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

// Login Thunk
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get All Orders Thunk
export const getOrders = createAsyncThunk(
  "orders/get-orders",
  async (_, thunkAPI) => {
    try {
      return await authService.getOrders();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getOrderById = createAsyncThunk(
  "auth/get-order-by-id",
  async (orderId, thunkAPI) => {
    try {
      return await authService.getOrder(orderId); 
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update Order Status Thunk
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
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Confirm Delivery Thunk
export const confirmDelivery = createAsyncThunk(
  "auth/confirmDelivery",
  async ({ orderId, confirmationCode }, thunkAPI) => {
    try {
      return await authService.confirmDelivery(orderId, confirmationCode);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Total Income Thunk
export const getTotalIncome = createAsyncThunk(
  "order/getTotalIncome",
  async (_, thunkAPI) => {
    try {
      const totalIncome = await authService.getTotalIncome();
      console.log("Total income in action:", totalIncome);
      return totalIncome;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
    logout: (state) => {
      state.user = null;
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
      localStorage.removeItem("user"); 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false; 
        state.isSuccess = false; 
        state.message = ""; 
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload; 
        state.message = "Login successful!"; 
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || "Login failed due to an unknown error."; // Use payload for specific error
        state.isLoading = false;
        state.user = null; 
      })

      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload; 
        state.message = "Orders fetched successfully!";
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || "Failed to fetch orders.";
        state.isLoading = false;
      })

      .addCase(getOrderById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.orderbyuser = [action.payload]; 
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Order details fetched successfully!";
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || "Failed to fetch order details.";
        state.isLoading = false;
      })

      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Order status updated successfully!";
        state.orders = state.orders.map(order => 
          order._id === action.payload.orderId ? 
          { 
            ...order, 
            orderStatus: action.payload.status, 
            dispatchedAt: action.payload.dispatchedAt,
            expectedDeliveryAt: action.payload.expectedDeliveryAt
          } : order
        );
        const userOrderIndex = state.orderbyuser.findIndex(order => order._id === action.payload.orderId);
        if (userOrderIndex !== -1) {
          state.orderbyuser[userOrderIndex] = {
            ...state.orderbyuser[userOrderIndex],
            orderStatus: action.payload.status,
            dispatchedAt: action.payload.dispatchedAt,
            expectedDeliveryAt: action.payload.expectedDeliveryAt
          };
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to update order status.";
      })

      .addCase(confirmDelivery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(confirmDelivery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Delivery confirmed successfully!";
        state.orders = state.orders.map(order => 
          order._id === action.payload.orderId ? 
          { 
            ...order, 
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
        state.message = action.payload || "Failed to confirm delivery.";
      })

      .addCase(getTotalIncome.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTotalIncome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.totalIncome = Number(action.payload) || 0;
        state.message = "Total income fetched successfully!";
      })
      .addCase(getTotalIncome.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch total income.";
      });
  },
});

export const { reset, logout } = authSlice.actions; 
export default authSlice.reducer;