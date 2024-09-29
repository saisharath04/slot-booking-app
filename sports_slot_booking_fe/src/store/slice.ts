import { createSlice } from "@reduxjs/toolkit";
import {
  AUTH_LOGIN_SLICE,
  AUTH_REGISTER_SLICE,
  CENTERS_LIST_SLICE,
  CREATE_BOOKING_SLICE,
  FACILITIES_LIST_SLICE,
  SLOT_AVAILABILITY_SLICE,
  VIEW_BOOKINGS_LIST_SLICE,
} from "./actions";
import {
  centersListInitialResponse,
  facilitiesListInitialResponse,
  loginInitialResponse,
  postApiInitialResponse,
  registerInitialResponse,
  slotAvailabilityInitialResponse,
  viewBookingsInitialResponse,
} from "./initialData";
import {
  CentersListAsyncThunk,
  CreateBookingAsyncThunk,
  DeleteBookingAsyncThunk,
  FacilitiesListAsyncThunk,
  LoginAsyncThunk,
  RegisterAsyncThunk,
  UpdateBookingAsyncThunk,
  ViewBookingsListAsyncThunk,
  slotAvailabilityAsyncThunk,
} from "./thunk";

// Login Slice
const loginSlice = createSlice({
  name: AUTH_LOGIN_SLICE,
  initialState: {
    isLoading: false,
    isError: false,
    data: loginInitialResponse,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(LoginAsyncThunk.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(LoginAsyncThunk.fulfilled, (state, action) => {
      state.data = state.data = {
        ...state.data,
        ...action?.payload,
      };
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(LoginAsyncThunk.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.data = loginInitialResponse;
    });
  },
});

// Register Slice
const registerSlice = createSlice({
  name: AUTH_REGISTER_SLICE,
  initialState: {
    isLoading: false,
    isError: false,
    data: registerInitialResponse,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(RegisterAsyncThunk.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(RegisterAsyncThunk.fulfilled, (state, action) => {
      state.data = state.data = {
        ...state.data,
        ...action?.payload,
      };
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(RegisterAsyncThunk.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.data = registerInitialResponse;
    });
  },
});

const centersListSlice = createSlice({
  name: CENTERS_LIST_SLICE,
  initialState: {
    isLoading: false,
    isError: false,
    data: centersListInitialResponse,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CentersListAsyncThunk.pending, (state) => {
      state.data = centersListInitialResponse;
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(CentersListAsyncThunk.fulfilled, (state, action) => {
      state.data = {
        ...state.data,
        ...action?.payload,
      };
      state.isLoading = false;
      state.isError = false;
    });

    builder.addCase(CentersListAsyncThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.data = centersListInitialResponse;
      console.error(action.payload);
    });
  },
});

const facilitiesListSlice = createSlice({
  name: FACILITIES_LIST_SLICE,
  initialState: {
    isLoading: false,
    isError: false,
    data: facilitiesListInitialResponse,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(FacilitiesListAsyncThunk.pending, (state) => {
      state.data = facilitiesListInitialResponse;
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(FacilitiesListAsyncThunk.fulfilled, (state, action) => {
      state.data = {
        ...state.data,
        ...action?.payload,
      };
      state.isLoading = false;
      state.isError = false;
    });

    builder.addCase(FacilitiesListAsyncThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.data = facilitiesListInitialResponse;
      console.error(action.payload);
    });
  },
});

const createBookingSlice = createSlice({
  name: CREATE_BOOKING_SLICE,
  initialState: {
    isLoading: false,
    isError: false,
    data: postApiInitialResponse,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateBookingAsyncThunk.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(CreateBookingAsyncThunk.fulfilled, (state, action) => {
      state.data = { ...state.data, ...action.payload };
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(CreateBookingAsyncThunk.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.data = postApiInitialResponse;
    });
  },
});

const updateBookingSlice = createSlice({
  name: "updateBookingSlice",
  initialState: {
    isLoading: false,
    isError: false,
    data: postApiInitialResponse,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(UpdateBookingAsyncThunk.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(UpdateBookingAsyncThunk.fulfilled, (state, action) => {
      state.data = state.data = {
        ...state.data,
        ...action?.payload,
      };
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(UpdateBookingAsyncThunk.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.data = postApiInitialResponse;
    });
  },
});

const deleteBookingSlice = createSlice({
  name: "deleteBookingSlice",
  initialState: {
    isLoading: false,
    isError: false,
    data: postApiInitialResponse,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(DeleteBookingAsyncThunk.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(DeleteBookingAsyncThunk.fulfilled, (state, action) => {
        state.data = state.data = {
          ...state.data,
          ...action?.payload,
        };
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(DeleteBookingAsyncThunk.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.data = postApiInitialResponse;
    });
  },
});

// View Bookings List Slice
const viewBookingsListSlice = createSlice({
  name: VIEW_BOOKINGS_LIST_SLICE,
  initialState: {
    isLoading: false,
    isError: false,
    data: viewBookingsInitialResponse,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ViewBookingsListAsyncThunk.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(ViewBookingsListAsyncThunk.fulfilled, (state, action) => {
         console.log("====entered1");
      state.data = state.data = {
        ...state.data,
        ...action?.payload,
      };
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(ViewBookingsListAsyncThunk.rejected, (state) => {
      console.log('====entered2')
      state.isLoading = false;
      state.isError = true;
      state.data = viewBookingsInitialResponse;
    });
  },
});

// Slot Availability Slice
const slotAvailabilitySlice = createSlice({
  name: SLOT_AVAILABILITY_SLICE,
  initialState: {
    isLoading: false,
    isError: false,
    data: slotAvailabilityInitialResponse,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(slotAvailabilityAsyncThunk.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(slotAvailabilityAsyncThunk.fulfilled, (state, action) => {
      state.data = state.data = {
        ...state.data,
        ...action?.payload,
      };
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(slotAvailabilityAsyncThunk.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.data = slotAvailabilityInitialResponse;
    });
  },
});

// Export Reducers
export const loginReducer = loginSlice.reducer;
export const registerReducer = registerSlice.reducer;
export const viewBookingsListReducer = viewBookingsListSlice.reducer;
export const slotAvailabilityReducer = slotAvailabilitySlice.reducer;
export const centersListReducer = centersListSlice.reducer;
export const facilitiesListReducer = facilitiesListSlice.reducer;
export const createBookingReducer = createBookingSlice.reducer;
export const updateBookingReducer = updateBookingSlice.reducer;
export const deleteBookingReducer = deleteBookingSlice.reducer;
