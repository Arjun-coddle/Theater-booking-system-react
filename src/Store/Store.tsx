import { configureStore } from "@reduxjs/toolkit";
import slotsReducer from "./SoltSlice";
import bookingReducer from './BookingSlice'

const store = configureStore({
  reducer: {
    slots: slotsReducer,
    booking: bookingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
