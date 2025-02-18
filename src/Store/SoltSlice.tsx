import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Utils/AxiosInstance";
import { AxiosError } from "axios";

interface Seat {
    id: number;
    row: string;
    seat_number: number;
    isAvailable: boolean;
}

interface SlotsState {
    seats: Seat[];
    loading: boolean;
    error: string | null;
}

const initialState: SlotsState = {
    seats: [],
    loading: false,
    error: null,
};

export const fetchAvailableSlots = createAsyncThunk<Seat[], number, { rejectValue: string }>("slots/fetchAvailableSlots", async (movieId, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get<{ data: Seat[] }>(`/aviablesolts/${movieId}`);
        return response.data.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        return rejectWithValue(axiosError.response?.data?.message || "Failed to fetch slots");
    }
});

const slotsSlice = createSlice({
    name: "slots",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAvailableSlots.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAvailableSlots.fulfilled, (state, action) => {
                state.loading = false;
                state.seats = action.payload;
            })
            .addCase(fetchAvailableSlots.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "An unknown error occurred";
            });
    },
});

export default slotsSlice.reducer;