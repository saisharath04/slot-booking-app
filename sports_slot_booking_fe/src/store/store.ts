import { configureStore } from "@reduxjs/toolkit";
import {
  centersListReducer,
  facilitiesListReducer,
  loginReducer,
  slotAvailabilityReducer,
  viewBookingsListReducer,
  createBookingReducer,
  deleteBookingReducer,
  registerReducer,
  updateBookingReducer
} from "./slice";

const store = configureStore({
  reducer: {
    centersListReducer,
    facilitiesListReducer,
    loginReducer,
    slotAvailabilityReducer,
    viewBookingsListReducer,
    createBookingReducer,
    deleteBookingReducer,
    registerReducer,
    updateBookingReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
