import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Utils/AxiosInstance";

interface BookingState {
  loading: boolean;
  success: boolean | null;
  error: string | null;
}

const initialState: BookingState = {
  loading: false,
  success: null,
  error: null,
};

export const bookSeats = createAsyncThunk(
  "booking/bookSeats",
  async ({ selectedSeats, showId, paymentId }: { selectedSeats: number[]; showId: number; paymentId: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("booking-slot", {
        selectedSeats,
        showId,
        paymentId,
      }, { withCredentials: true });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to book seats");
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bookSeats.pending, (state) => {
        state.loading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(bookSeats.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(bookSeats.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export default bookingSlice.reducer;
