import { createAsyncThunk } from "@reduxjs/toolkit";
import { message as Toast } from "antd";
import {
  FACILITIES_LIST_THUNK,
  CENTERS_LIST_SLICE,
  AUTH_LOGIN_THUNK,
  AUTH_REGISTER_THUNK,
  CREATE_BOOKING_THUNK,
  UPDATE_BOOKING_THUNK,
  DELETE_BOOKING_THUNK,
  VIEW_BOOKINGS_LIST_THUNK,
  SLOT_AVAILABILITY_THUNK,
} from "./actions";
import {
  FacilitiesListPayloadType,
  FacilitiesListResponseType,
  CentersListPayloadType,
  CentersListResponseType,
  LoginApiPayloadType,
  LoginApiResponseType,
  ErrorMessageType,
  RegisterApiPayloadType,
  RegisterApiResponseType,
  CreateBookingPayloadType,
  PostApiResponseType,
  UpdateBookingPayloadType,
  DeleteBookingPayloadType,
  ViewBookingsListPayloadType,
  SlotAvailabilityPayloadType,
  SlotAvailabilityResponseType,
} from "./types";
import axiosInstance from "../axiosInstance";
import axios from "axios";
import {
  CreateBookingApiRoute,
  DeleteBookingApiRoute,
  SlotAvailabilityApiRoute,
  UpdateBookingApiRoute,
  ViewBookingsListApiRoute,
  centersListApiRoute,
  facilitiesListApiRoute,
  loginApiRoute,
  registerApiRoute,
} from "./apiRoutes";
import { JWT_TOKEN, USER_DETAILS } from "../constants";

export const LoginAsyncThunk = createAsyncThunk(
  AUTH_LOGIN_THUNK,
  async (payload: LoginApiPayloadType) => {
    if (!payload.email || !payload.password) {
      Toast.error("Please enter valid credentials");
      return;
    }
    try {
      const response = await axios.post(loginApiRoute, payload);

      const typedResponse = response.data as LoginApiResponseType;
      const { success, message, token, user_details } = typedResponse;
      if (success) {
        Toast.success(message);
        localStorage.setItem(JWT_TOKEN, token);
        localStorage.setItem(USER_DETAILS, JSON.stringify(user_details));
      }
      return typedResponse;
    } catch (e) {
      const error = e as ErrorMessageType;
      Toast.error(error.response.data.message);
    }
  }
);

export const RegisterAsyncThunk = createAsyncThunk(
  AUTH_REGISTER_THUNK,
  async (payload: RegisterApiPayloadType) => {
    if (!payload.email || !payload.password || !payload.name) {
      Toast.error("Please enter valid credentials");
      return;
    }
    try {
      const response = await axios.post(registerApiRoute, payload);
      const typedResponse = response.data as RegisterApiResponseType;
      const { success, message } = typedResponse;
      if (success) {
        Toast.success(message);
      }
      return typedResponse;
    } catch (e) {
      const error = e as ErrorMessageType;
      Toast.error(error.response.data.message);
    }
  }
);

export const CentersListAsyncThunk = createAsyncThunk(
  CENTERS_LIST_SLICE,
  async (payload?: CentersListPayloadType) => {
    try {
      const response = await axiosInstance.get(centersListApiRoute, {
        params: payload,
      });
      console.log("entered2", response);
      const typedResponse = response.data as CentersListResponseType;
      return typedResponse;
    } catch (e) {
      console.log("entered3", e);
      const error = e as ErrorMessageType;
      Toast.error(error.response.data.message);
    }
  }
);

export const FacilitiesListAsyncThunk = createAsyncThunk(
  FACILITIES_LIST_THUNK,
  async (payload: FacilitiesListPayloadType) => {
    if (!payload.id) {
      Toast.error("please select center");
      return;
    }
    try {
      const response = await axiosInstance.get(
        facilitiesListApiRoute(payload.id)
      );
      const typedResponse = response.data as FacilitiesListResponseType;
      return typedResponse;
    } catch (e) {
      const error = e as ErrorMessageType;
      Toast.error(error.response.data.message);
    }
  }
);

export const CreateBookingAsyncThunk = createAsyncThunk(
  CREATE_BOOKING_THUNK,
  async (payload: CreateBookingPayloadType) => {
    const {
      booking_date,
      customer_name,
      customer_phone_number,
      facility_id,
      slots,
      user_id,
    } = payload;
    if (
      !booking_date ||
      !customer_name ||
      !customer_phone_number ||
      !facility_id ||
      !slots ||
      !user_id
    ) {
      Toast.error(`Incorrect payload`);
      return
    }
    try {
      const response = await axiosInstance.post(CreateBookingApiRoute, payload);
      const typedResponse = response.data as PostApiResponseType;
      if (typedResponse.success) {
        Toast.success(typedResponse.message);
      }
      return typedResponse;
    } catch (e) {
      const error = e as ErrorMessageType;
      Toast.error(error.response.data.message);
    }
  }
);

export const UpdateBookingAsyncThunk = createAsyncThunk(
  UPDATE_BOOKING_THUNK,
  async (payload: UpdateBookingPayloadType) => {
    const {
      booking_date,
      customer_name,
      customer_phone_number,
      facility_id,
      start_time,
      end_time,
      user_id,
      id
    } = payload;
    if(!id){
      Toast.error("please select booking")
      return
    }
    if (
      !booking_date ||
      !customer_name ||
      !customer_phone_number ||
      !facility_id ||
      !start_time ||
      !end_time ||
      !user_id
    ) {
      Toast.error(`Incorrect payload`);
      return;
    }
    try {
      const response = await axiosInstance.post(UpdateBookingApiRoute, payload);
      const typedResponse = response.data as PostApiResponseType;
      if (typedResponse.success) {
        Toast.success(typedResponse.message);
      }
      return typedResponse;
    } catch (e) {
      const error = e as ErrorMessageType;
      Toast.error(error.response.data.message);
    }
  }
);

export const DeleteBookingAsyncThunk = createAsyncThunk(
  DELETE_BOOKING_THUNK,
  async (payload: DeleteBookingPayloadType) => {
    const { id } = payload;
    if (!id) {
      Toast.error(`Booking ID is missing`);
      return
    }
    try {
      const response = await axiosInstance.post(DeleteBookingApiRoute, payload);
      const typedResponse = response.data as PostApiResponseType;
      if (typedResponse.success) {
        Toast.success(typedResponse.message);
      }
      return typedResponse;
    } catch (e) {
      const error = e as ErrorMessageType;
      Toast.error(error.response.data.message);
    }
  }
);

export const ViewBookingsListAsyncThunk = createAsyncThunk(
  VIEW_BOOKINGS_LIST_THUNK,
  async (payload?: ViewBookingsListPayloadType) => {
    try {
      const response = await axiosInstance.get(ViewBookingsListApiRoute, {
        params: payload,
      });
      const typedResponse = response.data as ViewBookingsListPayloadType;
      return typedResponse;
    } catch (e) {
      const error = e as ErrorMessageType;
      Toast.error(error.response.data.message);
    }
  }
);

export const slotAvailabilityAsyncThunk = createAsyncThunk(
  SLOT_AVAILABILITY_THUNK,
  async (payload: SlotAvailabilityPayloadType) => {
    if (!payload.booking_date || !payload.facility_id) {
      Toast.error("Incorrect payload, please select booking date and facility");
      return
    }
    try {
      const response = await axiosInstance.get(SlotAvailabilityApiRoute, {
        params: payload,
      });
      const typedResponse = response.data as SlotAvailabilityResponseType;
      return typedResponse;
    } catch (e) {
      const error = e as ErrorMessageType;
      Toast.error(error.response.data.message);
    }
  }
);
